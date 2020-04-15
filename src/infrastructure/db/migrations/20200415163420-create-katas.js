export default {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('kata', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      test: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('kata');
  },
};
