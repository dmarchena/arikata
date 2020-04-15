const Sequelize = require('sequelize');
const configuration = require('../config');

const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const db = {};

const kata = require('./kata');
const user = require('./user');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.kata = kata(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.user = user(sequelize, Sequelize.DataTypes, Sequelize.Model);

/* Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
