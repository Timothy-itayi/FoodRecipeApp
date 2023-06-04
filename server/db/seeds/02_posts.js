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
      image_url: 'pizzabread.jpeg',
      title: 'Pizzabread',
      description:
        'homemade pizza dough, chopped tomatoes , bacon , feta cheese , basil  , seasoned with salt and pepper with a drizzle of oil',
      user_id: 1,
    },
    {
      id: 2,
      image_url: 'pancakes.jpeg',
      title: 'Pancakes',
      description:
        'add flour , sugar ,milk , baking powder with a few eggs and mix. leave to rest while you season your pan with oil .',
      user_id: 1,
    },
    {
      id: 3,
      image_url: 'flatbread01.jpeg',
      title: 'Veggie Flatbread',
      description:
        'homemade pizza dough, chopped carrots ,onions, seasoned with salt and pepper with a drizzle of oil',
      user_id: 2,
    },
    {
      id: 4,
      image_url: 'breadbun.jpeg',
      title: 'Bread Bun',
      description: 'Stuffed bun.',
      user_id: 2,
    },
    {
      id: 5,
      title: 'Chicken Parm',
      description: 'Delicious chicken parmesan recipe',
      user_id: 1,
    },
    {
      id: 6,
      title: 'Egg Noodles',
      description: 'Tasty homemade egg noodles recipe',
      user_id: 1,
    },
    {
      id: 7,
      title: 'Pork Schnitzel',
      description: 'Authentic German pork schnitzel recipe',
      user_id: 2,
    },
    {
      id: 8,
      title: 'Chocolate Cake',
      description: 'Decadent chocolate cake recipe',
      user_id: 2,
    },
    {
      id: 9,
      title: 'Vegetable Stir-Fry',
      description: 'Healthy vegetable stir-fry recipe',
      user_id: 3,
    },
    {
      id: 10,
      title: 'Blueberry Muffins',
      description: 'Fluffy blueberry muffins recipe',
      user_id: 3,
    },
  ])
}
