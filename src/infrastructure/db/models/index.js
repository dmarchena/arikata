import Sequelize, { DataTypes, Model } from 'sequelize';
import configuration from '../config';

import kata from './kata';
import user from './user';

const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const db = {};

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

db.Kata = kata(sequelize, DataTypes, Model);
db.User = user(sequelize, DataTypes, Model);

/* Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
