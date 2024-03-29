/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'John Adams',
      user_email: 'user@example.com',
      selectedIcon: '/user-icons/icon.jpg',
    },
    {
      id: 2,
      username: 'Rachel Green',
      user_email: 'user@example.com',
      selectedIcon: '/user-icons/icon_1.jpg',
    },
    {
      id: 3,
      username: 'Sarah Goober',
      user_email: 'user@example.com',
      selectedIcon: '/user-icons/icon_2.jpg',
    },
  ])
}
