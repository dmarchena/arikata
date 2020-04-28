require('dotenv-flow').config();

const {
  DATABASE_USER: username,
  DATABASE_PASS: password,
  DATABASE_DB: database,
  DATABASE_DIALECT: dialect,
  DATABASE_HOST: host,
  DATABASE_PORT: port,
} = process.env;

const uuidNamespaces = {
  tag: 'dffd62cd-3684-4703-914c-731c8729c0c0',
};

const config = {
  localhost: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces,
  },
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces,
  },
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces,
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    uuidNamespaces,
  },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
