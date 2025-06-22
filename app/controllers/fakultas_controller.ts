import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fakultas from 'App/Models/Fakultas'
import CreateFakultasValidator from 'App/Validators/CreateFakultasValidator'
import UpdateFakultasValidator from 'App/Validators/UpdateFakultasValidator'

export default class FakultasController {
  async index({ view }: HttpContextContract) {
    const fakultas = await Fakultas.all()
    return view.render('fakultas/index', { fakultas })
  }

  async create({ view }: HttpContextContract) {
    return view.render('fakultas/create')
  }

  async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateFakultasValidator)
    await Fakultas.create({
      namaFakultas: payload.nama_fakultas,
    })
    return response.redirect().toRoute('fakultas.index')
  }

  async edit({ params, view }: HttpContextContract) {
    const fakultas = await Fakultas.findOrFail(params.id)
    return view.render('fakultas/edit', { fakultas })
  }

  async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateFakultasValidator)
    const fakultas = await Fakultas.findOrFail(params.id)
    
    fakultas.namaFakultas = payload.nama_fakultas
    await fakultas.save()
    
    return response.redirect().toRoute('fakultas.index')
  }

  async destroy({ params, response }: HttpContextContract) {
    const fakultas = await Fakultas.findOrFail(params.id)
    await fakultas.delete()
    return response.redirect().toRoute('fakultas.index')
  }
}