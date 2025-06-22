import { BaseModel, column, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Mahasiswa from './mahasiswa.js'
import Matakuliah from './matakuliah.js'
import { BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Krs extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mahasiswaId: number

  @column()
  public matakuliahId: number

  @column()
  public semester: number

  @belongsTo(() => Mahasiswa)
  public mahasiswa: BelongsTo<typeof Mahasiswa>

  @belongsTo(() => Matakuliah)
  public matakuliah: BelongsTo<typeof Matakuliah>
}
