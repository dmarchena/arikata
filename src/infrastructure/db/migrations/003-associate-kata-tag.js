export default {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('kata_tags', {
      kataId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      tagId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('kata_tags');
  },
};
