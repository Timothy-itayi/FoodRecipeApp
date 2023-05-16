/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      id: 1,
      title: 'Chicken Parm',
      description: 'Delicious chicken parmesan recipe',
      user_id: 1,
    },
    {
      id: 2,
      title: 'Egg Noodles',
      description: 'Tasty homemade egg noodles recipe',
      user_id: 1,
    },
    {
      id: 3,
      title: 'Pork Schnitzel',
      description: 'Authentic German pork schnitzel recipe',
      user_id: 2,
    },
    {
      id: 4,
      title: 'Chocolate Cake',
      description: 'Decadent chocolate cake recipe',
      user_id: 2,
    },
    {
      id: 5,
      title: 'Vegetable Stir-Fry',
      description: 'Healthy vegetable stir-fry recipe',
      user_id: 3,
    },
    {
      id: 6,
      title: 'Blueberry Muffins',
      description: 'Fluffy blueberry muffins recipe',
      user_id: 3,
    },
  ])
}
