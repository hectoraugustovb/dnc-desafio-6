const path = require('path');

require('dotenv').config();

const dbConfig = {
  dialect: 'sqlite',
  storage: path.join(__dirname, '../db/database.sqlite'),
  define: {
    underscored: true,
    timestamps: false
  },
  logging: false
}

module.exports = dbConfig;