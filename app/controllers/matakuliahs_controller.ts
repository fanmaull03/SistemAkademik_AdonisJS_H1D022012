import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Matakuliah from 'App/Models/Matakuliah'
import CreateMatakuliahValidator from 'App/Validators/CreateMatakuliahValidator'

export default class MatakuliahsController {
  async index({ view }: HttpContextContract) {
    const matakuliah = await Matakuliah.all()
    return view.render('matakuliah/index', { matakuliah })
  }

  async create({ view }: HttpContextContract) {
    return view.render('matakuliah/create')
  }

  async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateMatakuliahValidator)
    await Matakuliah.create({
      kode: payload.kode,
      namaMatakuliah: payload.nama_matakuliah,
      sks: payload.sks
    })
    return response.redirect().toRoute('matakuliah.index')
  }

  async edit({ params, view }: HttpContextContract) {
    const matakuliah = await Matakuliah.findOrFail(params.id)
    return view.render('matakuliah/edit', { matakuliah })
  }

  async update({ params, request, response }: HttpContextContract) {
    const matakuliah = await Matakuliah.findOrFail(params.id)
    const payload = await request.validate(CreateMatakuliahValidator)
    
    matakuliah.kode = payload.kode
    matakuliah.namaMatakuliah = payload.nama_matakuliah
    matakuliah.sks = payload.sks
    await matakuliah.save()
    
    return response.redirect().toRoute('matakuliah.index')
  }

  async destroy({ params, response }: HttpContextContract) {
    const matakuliah = await Matakuliah.findOrFail(params.id)
    await matakuliah.delete()
    return response.redirect().toRoute('matakuliah.index')
  }
}