const employees = [{
  id: 1,
  type: 'admin',
  title: 'Turtle Developer',
  name: 'Isabel Anguiano',
  email: 'isabel@correo.com',
  password: '4b2fb63731e470a4911460210170abaa',
  avatar_url: 'http://placekitten.com/g/200/200',
}, {
  id: 2,
  type: 'regular',
  title: 'Penguin Developer',
  name: 'Aldo Vega',
  email: 'aldo@correo.com',
  password: 'b104ab9a0e58c861b9628208b3fecd58',
  avatar_url: 'http://placekitten.com/g/200/200',
}, {
  id: 3,
  type: 'regular',
  title: 'Seal Developer',
  name: 'Javier Castro',
  email: 'javier@correo.com',
  password: '3c9c03d6008a5adf42c2a55dd4a1a9f2',
  avatar_url: 'http://placekitten.com/g/200/200',
}, {
  id: 4,
  type: 'regular',
  title: 'Fish Designer',
  name: 'Vania Vega',
  email: 'vania@correo.com',
  password: '3c9c03d6008a5adf42c2a55dd4a1a9f2',
  avatar_url: 'http://placekitten.com/g/200/200',
}];

const reactions = [{
  name: 'training',
  sentiment: 'neutral',
}, {
  name: 'mvp',
  sentiment: 'possitive',
}, {
  name: 'nice_job',
  sentiment: 'possitive',
}, {
  name: 'no_clue',
  sentiment: 'negative',
}];

const reviews = [{
  author_id: 1,
  reviewer_id: 2,
  receiver_id: 3,
}, {
  author_id: 1,
  reviewer_id: 3,
  receiver_id: 2,
},{
  author_id: 1,
  reviewer_id: 3,
  receiver_id: 4,
},{
  author_id: 1,
  reviewer_id: 4,
  receiver_id: 3,
  status: "done",
  comment: "You saved the office!",
  reaction_id: 2,
},{
  author_id: 1,
  reviewer_id: 1,
  receiver_id: 3,
  status: "done",
  comment: "More care in your Pull Requests",
  reaction_id: 1,
}];

exports.seed = function(knex) {
  return Promise.all([
    knex('reaction').del().then(() => knex('reaction').insert(reactions)),
    knex('employee').del().then(() => knex('employee').insert(employees)).then(() =>
      knex('performance_review').del().then(() => knex('performance_review').insert(reviews)),
    ),
  ]);
};
