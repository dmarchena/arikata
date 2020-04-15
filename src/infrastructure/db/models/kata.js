export default (sequelize, DataTypes, Model) => {
  class Kata extends Model {}
  Kata.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      test: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      modelName: 'kata',
      sequelize,
      timestamps: false,
    }
  );
  return Kata;
};
