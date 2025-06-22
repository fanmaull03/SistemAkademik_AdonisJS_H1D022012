// app/Controllers/Http/MahasiswasController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mahasiswa from 'App/Models/Mahasiswa'
import Prodi from 'App/Models/Prodi'
import Krs from 'App/Models/Krs'
import Fakultas from 'App/Models/Fakultas'
import CreateMahasiswaValidator from 'App/Validators/CreateMahasiswaValidator'
import UpdateMahasiswaValidator from 'App/Validators/UpdateMahasiswaValidator'

export default class MahasiswasController {
  // Tampilkan semua mahasiswa
  public async index({ view, session }: HttpContextContract) {
    try {
      const mahasiswa = await Mahasiswa.query()
        .preload('prodi', (query) => {
          query.preload('fakultas')
        })
        .orderBy('nama', 'asc')

      return view.render('mahasiswa/index', { mahasiswa })
    } catch (error) {
      session.flash('error', 'Gagal memuat data mahasiswa')
      return view.render('mahasiswa/index', { mahasiswa: [] })
    }
  }

  // Tampilkan form tambah mahasiswa
  public async create({ view }: HttpContextContract) {
    const prodi = await Prodi.all()
    return view.render('mahasiswa/create', { prodi })
  }

  // Simpan mahasiswa baru
  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateMahasiswaValidator)
    
    try {
      await Mahasiswa.create(payload)
      session.flash('success', 'Mahasiswa berhasil ditambahkan!')
      return response.redirect().toRoute('mahasiswa.index')
    } catch (error) {
      session.flash('errors', error.messages || 'Gagal menambahkan mahasiswa')
      return response.redirect().back()
    }
  }

  // Tampilkan form edit
  public async edit({ params, view, session }: HttpContextContract) {
    try {
      const mahasiswa = await Mahasiswa.findOrFail(params.id)
      const prodi = await Prodi.all()
      return view.render('mahasiswa/edit', { mahasiswa, prodi })
    } catch (error) {
      session.flash('error', 'Data mahasiswa tidak ditemukan')
      return response.redirect().toRoute('mahasiswa.index')
    }
  }

  // Update data mahasiswa
  public async update({ params, request, response, session }: HttpContextContract) {
    const payload = await request.validate(UpdateMahasiswaValidator)
    
    try {
      const mahasiswa = await Mahasiswa.findOrFail(params.id)
      mahasiswa.merge(payload)
      await mahasiswa.save()

      session.flash('success', 'Data mahasiswa berhasil diperbarui!')
      return response.redirect().toRoute('mahasiswa.index')
    } catch (error) {
      session.flash('errors', error.messages || 'Gagal memperbarui data')
      return response.redirect().back()
    }
  }

  // Hapus mahasiswa
  public async destroy({ params, response, session }: HttpContextContract) {
    try {
      const mahasiswa = await Mahasiswa.findOrFail(params.id)
      await mahasiswa.delete()

      session.flash('success', 'Mahasiswa berhasil dihapus!')
    } catch (error) {
      session.flash('error', 'Gagal menghapus mahasiswa')
    }
    return response.redirect().toRoute('mahasiswa.index')
  }

  // Hitung total SKS per mahasiswa
  public async totalSks({ view, session }: HttpContextContract) {
    try {
      const mahasiswa = await Mahasiswa.query().preload('prodi')

      const data = await Promise.all(
        mahasiswa.map(async (m) => {
          const krsList = await Krs.query()
            .where('mahasiswa_id', m.id)
            .preload('matakuliahs')

          const totalSks = krsList.reduce((sum, krs) => {
            return sum + krs.matakuliahs.reduce((sksSum, matkul) => sksSum + matkul.sks, 0)
          }, 0)

          const semesters = [...new Set(krsList.map(krs => krs.semester))].join(', ')

          return {
            id: m.id,
            nim: m.nim,
            nama: m.nama,
            semester: semesters || '-',
            prodi: m.prodi,
            totalSks,
          }
        })
      )

      return view.render('mahasiswa/sks', { data })
    } catch (error) {
      session.flash('error', 'Gagal memuat data SKS')
      return view.render('mahasiswa/sks', { data: [] })
    }
  }

  // Filter mahasiswa berdasarkan fakultas dan semester
  public async filterMahasiswa({ request, view, session }: HttpContextContract) {
    try {
      const fakultasId = request.input('fakultas_id')
      const semester = request.input('semester')

      // Query dasar
      const query = Mahasiswa.query()
        .preload('prodi', (prodiQuery) => {
          prodiQuery.preload('fakultas')
        })

      // Filter fakultas jika ada
      if (fakultasId) {
        query.whereHas('prodi', (q) => {
          q.where('fakultas_id', fakultasId)
        })
      }

      const mahasiswa = await query.exec()

      // Proses data
      const data = await Promise.all(
        mahasiswa.map(async (m) => {
          const krsQuery = Krs.query()
            .where('mahasiswa_id', m.id)
            .preload('matakuliahs')

          // Filter semester jika ada
          if (semester) {
            krsQuery.where('semester', semester)
          }

          const krsList = await krsQuery.exec()

          const totalSks = krsList.reduce((sum, krs) => {
            return sum + krs.matakuliahs.reduce((sksSum, matkul) => sksSum + matkul.sks, 0)
          }, 0)

          const semesters = [...new Set(krsList.map(krs => krs.semester))].join(', ')

          return {
            nim: m.nim,
            nama: m.nama,
            semester: semesters || '-',
            prodi: m.prodi,
            fakultas: m.prodi.fakultas,
            totalSks,
          }
        })
      )

      const fakultas = await Fakultas.all()

      return view.render('mahasiswa/filter', {
        data,
        fakultas,
        selectedFakultas: fakultasId,
        selectedSemester: semester,
      })

    } catch (error) {
      session.flash('error', 'Gagal memfilter data')
      return view.render('mahasiswa/filter', { 
        data: [],
        fakultas: [],
        selectedFakultas: null,
        selectedSemester: null
      })
    }
  }
}