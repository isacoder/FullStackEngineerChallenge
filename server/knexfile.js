module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'appraisal',
    user: process.env.DB_USER || 'app_user',
    password: process.env.DB_PASSWORD || 'abc123',
  },
  migrations: {
    tableName: 'migrations',
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
