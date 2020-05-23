export default {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('tag', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('tag');
  },
};
