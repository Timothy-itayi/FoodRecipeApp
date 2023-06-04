exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('description')
    table.string('image_url')
    table.integer('user_id').unsigned().references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
