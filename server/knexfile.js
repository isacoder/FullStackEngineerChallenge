module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    database: 'appraisal',
    user: 'app_user',
    password: 'abc123',
  },
  migrations: {
    tableName: 'migrations',
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
