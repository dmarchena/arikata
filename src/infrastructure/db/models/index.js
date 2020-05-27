import Sequelize, { DataTypes, Model } from 'sequelize';
import config from '../config';

import kataTags from './kata_tags';
import kata from './kata';
import user from './user';
import tag from './tag';
import training from './training';

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

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

export default {
  ...db,
  sequelize,
  Sequelize,
};
