import Sequelize, { DataTypes, Model } from 'sequelize';
import config from '../config';

import kataTags from './kata_tags';
import kata from './kata';
import user from './user';
import tag from './tag';
import training from './training';

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

db.KataTags = kataTags(sequelize, DataTypes, Model);
db.Kata = kata(sequelize, DataTypes, Model);
db.Tag = tag(sequelize, DataTypes, Model);
db.User = user(sequelize, DataTypes, Model);
db.Training = training(sequelize, DataTypes, Model);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
