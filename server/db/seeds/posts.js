/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {id: 1, title: "Chicken Parm", description: 'rowValue1'},
    {id: 2, title: "Egg Noodles",description:'rowValue2'},
    {id: 3, title: "Pork Shnitzel",description:'rowValue3'}
  ]);
};
