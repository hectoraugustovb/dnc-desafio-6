import { Sequelize } from "sequelize";
import dbConfig from "./config/database";

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: dbConfig.storage,
    define: dbConfig.define,
    logging: dbConfig.logging
});

export default connection;