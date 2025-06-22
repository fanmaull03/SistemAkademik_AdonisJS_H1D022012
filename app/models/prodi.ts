import { BaseModel, column, belongsTo, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Fakultas from './fakulta.js'
import Mahasiswa from './mahasiswa.js'
import { BelongsTo, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Prodi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public namaProdi: string

  @column()
  public fakultasId: number

  @belongsTo(() => Fakultas)
  public fakultas: BelongsTo<typeof Fakultas>

  @hasMany(() => Mahasiswa)
  public mahasiswas: HasMany<typeof Mahasiswa>
}
