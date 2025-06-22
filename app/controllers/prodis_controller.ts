import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prodi from 'App/Models/Prodi'
import Fakultas from 'App/Models/Fakultas'
import CreateProdiValidator from 'App/Validators/CreateProdiValidator'
import UpdateProdiValidator from 'App/Validators/UpdateProdiValidator'

export default class ProdisController {
  async index({ view }: HttpContextContract) {
    const prodis = await Prodi.query().preload('fakultas')
    return view.render('prodi/index', { prodis })
  }

  async create({ view }: HttpContextContract) {
    const fakultas = await Fakultas.all()
    return view.render('prodi/create', { fakultas })
  }

  async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProdiValidator)
    await Prodi.create({
      namaProdi: payload.nama_prodi,
      fakultasId: payload.fakultas_id
    })
    return response.redirect().toRoute('prodi.index')
  }

  async edit({ params, view }: HttpContextContract) {
    const prodi = await Prodi.findOrFail(params.id)
    const fakultas = await Fakultas.all()
    return view.render('prodi/edit', { prodi, fakultas })
  }

  async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateProdiValidator)
    const prodi = await Prodi.findOrFail(params.id)
    
    prodi.namaProdi = payload.nama_prodi
    prodi.fakultasId = payload.fakultas_id
    await prodi.save()
    
    return response.redirect().toRoute('prodi.index')
  }

  async destroy({ params, response }: HttpContextContract) {
    const prodi = await Prodi.findOrFail(params.id)
    await prodi.delete()
    return response.redirect().toRoute('prodi.index')
  }
}