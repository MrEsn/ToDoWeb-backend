import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('text_color')
      table.string('background_color')
      table.integer('user_id').references('id').inTable('users')
      table.integer('category_id').references('id').inTable('categories')
      table.enum('priority', ['Highest', 'High', 'Medium', 'Low', 'Lowest']).notNullable().defaultTo('Medium')
      table.timestamp('due_date', { useTz: true }).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
