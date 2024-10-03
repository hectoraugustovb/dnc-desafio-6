"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        name: "Mouse",
        price: 50,
        description: "Mouse",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Keyboard",
        price: 100,
        description: "Keyboard",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Book",
        price: 80,
        description: "Book",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pencil",
        price: 10,
        description: "Pencil",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};