exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('description')
    table.integer('user_id').unsigned().references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
