import vine from '@vinejs/vine'import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateFakultasValidator {
  public schema = schema.create({
    nama_fakultas: schema.string({}, [
      rules.unique({ table: 'fakultas', column: 'nama_fakultas' })
    ])
  })
}
