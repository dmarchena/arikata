require('dotenv-flow').config();

const {
  DATABASE_USER: username,
  DATABASE_PASS: password,
  DATABASE_DB: database,
  DATABASE_DIALECT: dialect,
  DATABASE_HOST: host,
  DATABASE_PORT: port,
} = process.env;

module.exports = {
  localhost: {
    username,
    password,
    database,
    host,
    port,
    dialect,
  },
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect,
  },
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect,
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect,
  },
};
