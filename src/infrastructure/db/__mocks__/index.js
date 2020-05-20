import Sequelize from 'sequelize';
import SequelizeMock from 'sequelize-mock';

import KataMock from './kata';
import KataTagsMock from './kata_tags';
import TagMock from './tag';
import UserMock from './user';

import mockJson from '../../../mock.json';

const db = {};

const sequelize = new SequelizeMock();

db.KataTags = KataTagsMock(sequelize, mockJson.kataEntity);
db.Kata = KataMock(sequelize, mockJson.kataEntity);
db.Tag = TagMock(sequelize, mockJson.kataEntity);
db.Kata.belongsToMany(db.Tag, {
  through: db.KataTags,
  foreignKey: 'kataId',
  otherKey: 'tagId',
});
db.Tag.belongsToMany(db.Kata, {
  through: db.KataTags,
  foreignKey: 'tagId',
  otherKey: 'kataId',
});
db.User = UserMock(sequelize, mockJson.users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
