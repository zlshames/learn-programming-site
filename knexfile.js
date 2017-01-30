const config = require('./config')

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: config.DB_NAME,
      user:     config.DB_USER,
      password: config.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  staging: {
    client: 'mysql',
    connection: {
      database: config.DB_NAME,
      user:     config.DB_USER,
      password: config.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      database: config.DB_NAME,
      user:     config.DB_USER,
      password: config.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
