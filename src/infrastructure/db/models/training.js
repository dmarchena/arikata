export default (sequelize, DataTypes, Model) => {
  class Training extends Model {}
  Training.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      success: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
      modelName: 'training',
      sequelize,
      timestamps: true,
    }
  );

  Training.associate = function associate(models) {
    this.User = this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.UUID,
        allowNull: true,
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    this.Kata = this.belongsTo(models.Kata, {
      foreignKey: {
        name: 'kataId',
        type: DataTypes.UUID,
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Training;
};
