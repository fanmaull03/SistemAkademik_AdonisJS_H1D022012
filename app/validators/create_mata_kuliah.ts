import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateMatakuliahValidator {
  public schema = schema.create({
    kode: schema.string({}, [
      rules.unique({ table: 'matakuliahs', column: 'kode' })
    ]),
    nama_matakuliah: schema.string(),
    sks: schema.number([
      rules.range(1, 6)
    ])
  })
}
