import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Matakuliahs extends BaseSchema {
  protected tableName = 'matakuliah'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('kode').notNullable().unique()
      table.string('nama_matakuliah').notNullable()
      table.integer('sks').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

