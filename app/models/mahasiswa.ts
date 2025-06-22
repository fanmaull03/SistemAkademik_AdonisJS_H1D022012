import { BaseModel, column, belongsTo, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Prodi from './Prodi'
import Krs from './kr.js'
import { BelongsTo, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Mahasiswa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nim: string

  @column()
  public nama: string

  @column()
  public prodiId: number

  @belongsTo(() => Prodi)
  public prodi: BelongsTo<typeof Prodi>

  @hasMany(() => Krs)
  public krsList: HasMany<typeof Krs>
}
