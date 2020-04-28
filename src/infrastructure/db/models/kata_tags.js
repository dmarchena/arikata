export default (sequelize, DataTypes, Model) => {
  class KataTags extends Model {}
  KataTags.init(
    {},
    {
      freezeTableName: true,
      modelName: 'kata_tags',
      sequelize,
      timestamps: false,
    }
  );

  return KataTags;
};
