export default (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
      modelName: 'user',
      sequelize,
      timestamps: false,
    }
  );

  return User;
};
