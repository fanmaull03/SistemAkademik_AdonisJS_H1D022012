import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mahasiswas extends BaseSchema {
  protected tableName = 'mahasiswa'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nim').notNullable().unique()
      table.string('nama').notNullable()
      table
        .integer('prodi_id')
        .unsigned()
        .references('id')
        .inTable('prodi')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
