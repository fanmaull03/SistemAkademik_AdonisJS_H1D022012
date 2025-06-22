import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Prodis extends BaseSchema {
  protected tableName = 'prodi'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_prodi').notNullable()
      table
        .integer('fakultas_id')
        .unsigned()
        .references('id')
        .inTable('fakultas')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
