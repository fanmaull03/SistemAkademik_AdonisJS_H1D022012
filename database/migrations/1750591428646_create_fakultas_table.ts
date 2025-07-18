import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fakultuses extends BaseSchema {
  protected tableName = 'fakultas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_fakultas').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

