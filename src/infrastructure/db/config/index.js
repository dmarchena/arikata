require('dotenv-flow').config();
const config = require('../../../config.json');

const {
  DATABASE_USER: username,
  DATABASE_PASS: password,
  DATABASE_DB: database,
  DATABASE_DIALECT: dialect,
  DATABASE_HOST: host,
  DATABASE_PORT: port,
} = process.env;

const dbconfig = {
  localhost: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces: config.uuidNamespaces,
  },
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces: config.uuidNamespaces,
  },
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces: config.uuidNamespaces,
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces: config.uuidNamespaces,
  },
};

const env = process.env.NODE_ENV || 'development';

module.exports = dbconfig[env];
