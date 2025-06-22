import { BaseModel, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Prodi from './prodi.js'
import { HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Fakultas extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public namaFakultas: string

  @hasMany(() => Prodi)
  public prodis: HasMany<typeof Prodi>
}
