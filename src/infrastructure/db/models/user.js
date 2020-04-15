import { encryptPassword } from '../../encryption';

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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: (user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = encryptPassword(user.password);
        },
      },
      modelName: 'user',
      sequelize,
      timestamps: false,
    }
  );

  return User;
};
