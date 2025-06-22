import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateKrsValidator {
  public schema = schema.create({
    mahasiswa_id: schema.number([rules.exists({ table: 'mahasiswas', column: 'id' })]),
    semester: schema.string(),
    matakuliah_ids: schema.array().members(
      schema.number([rules.exists({ table: 'matakuliahs', column: 'id' })])
    )
  })
}