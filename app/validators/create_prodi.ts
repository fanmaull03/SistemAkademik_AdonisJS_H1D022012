import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateProdiValidator {
  public schema = schema.create({
    nama_prodi: schema.string(),
    fakultas_id: schema.number([
      rules.exists({ table: 'fakultas', column: 'id' })
    ])
  })
}
