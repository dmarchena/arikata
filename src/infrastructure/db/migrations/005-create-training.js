module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('training', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      success: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      kataId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'kata',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('training');
  },
};
