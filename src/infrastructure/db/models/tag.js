import { v5 } from 'uuid';
import { partialRight } from 'ramda';
import config from '../config';

export const tagId = partialRight(v5, [config.uuidNamespaces.tag]);

export default (sequelize, DataTypes, Model) => {
  class Tag extends Model {}
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeSave: (tag) => {
          // eslint-disable-next-line no-param-reassign
          tag.id = tagId(tag.tag);
        },
      },
      modelName: 'tag',
      sequelize,
      timestamps: false,
    }
  );

  Tag.associate = function associate(models) {
    this.Katas = this.belongsToMany(models.Kata, {
      through: models.KataTags,
      foreignKey: 'tagId',
      otherKey: 'kataId',
    });
  };

  return Tag;
};
