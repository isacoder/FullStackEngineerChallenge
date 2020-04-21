exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('employee', t => {
      t.increments('id').primary();
      t.enum('type', ['regular', 'admin']).default('regular');
      t.string('name').notNull();
      t.string('email').unique().notNull();
      t.string('password', 32).notNull(); // md5 (TODO: This is just for the rush of the project)
      t.string('title').notNull();
      t.string('avatar_url').nullable();
      t.timestamps(true, true);
    }).then(() => (
      knex.schema.createTable('reaction', t => {
        t.increments('id').primary();
        t.string('name').notNull();
        t.enum('sentiment', ['possitive', 'negative', 'neutral']).notNull();
      })
    )).then(() => (
      knex.schema.createTable('performance_review', t => {
        t.increments('id').primary();
        t.integer('author_id').unsigned().references('id').inTable('employee').onDelete('CASCADE');
        t.integer('reviewer_id').unsigned().references('id').inTable('employee').onDelete('CASCADE');
        t.integer('receiver_id').unsigned().references('id').inTable('employee').onDelete('CASCADE');
        t.integer('reaction_id').unsigned().references('id').inTable('reaction').onDelete('SET NULL');
        t.text('comment').nullable();
        t.enum('status', ['in_review', 'done']).default('in_review');
        t.timestamps(true, true);
      })),
    ),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('performance_review'),
    knex.schema.dropTableIfExists('reaction'),
    knex.schema.dropTableIfExists('employee'),
  ]);
};
