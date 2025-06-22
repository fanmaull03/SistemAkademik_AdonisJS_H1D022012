import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Krs extends BaseSchema {
  protected tableName = 'krs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('mahasiswa_id')
        .unsigned()
        .references('id')
        .inTable('mahasiswa')
        .onDelete('CASCADE')
      table
        .integer('matakuliah_id')
        .unsigned()
        .references('id')
        .inTable('matakuliah')
        .onDelete('CASCADE')
      table.integer('semester').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
