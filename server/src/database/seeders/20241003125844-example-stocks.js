"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("stock", [
      {
        product_id: 1,
        amount: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        amount: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        amount: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        amount: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stock", null, {});
  },
};