import { BaseModel, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Krs from './kr.js'
import { HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Matakuliah extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kode: string

  @column()
  public namaMatakuliah: string

  @column()
  public sks: number

  @hasMany(() => Krs)
  public krsList: HasMany<typeof Krs>
}
