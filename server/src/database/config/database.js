const { AbstractDialect } = require('sequelize/lib/dialects/abstract/index');
require('dotenv').config();

const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    underscored: true,
    timestamps: false
  }
}

module.exports = dbConfig;