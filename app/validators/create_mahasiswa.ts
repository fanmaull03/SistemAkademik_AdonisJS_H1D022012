// app/Validators/CreateMahasiswaValidator.ts
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateMahasiswaValidator {
  public schema = schema.create({
    nim: schema.string({}, [
      rules.unique({ table: 'mahasiswas', column: 'nim' }),
      rules.minLength(8),
    ]),
    nama: schema.string(),
    prodi_id: schema.number([
      rules.exists({ table: 'prodis', column: 'id' })
    ])
  })
}
