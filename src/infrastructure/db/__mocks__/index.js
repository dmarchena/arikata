import Sequelize from 'sequelize';
import SequelizeMock from 'sequelize-mock';
import KataMock from './kata';
import TagMock from './tag';
import KataTagsMock from './kata_tags';

const db = {};

const sequelize = new SequelizeMock();

db.KataTags = KataTagsMock(sequelize);
db.Kata = KataMock(sequelize);
db.Tag = TagMock(sequelize);
// db.User = user(sequelize, DataTypes, Model);
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
