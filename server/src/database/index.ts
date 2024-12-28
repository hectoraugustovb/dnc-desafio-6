import { Sequelize } from "sequelize";
import dbConfig from "./config/database"

const connection = new Sequelize(String(dbConfig.database), String(dbConfig.username), dbConfig.password, {
    dialect: 'sqlite',
    host: dbConfig.host || './src/database/db/dev.sqlite',
    port: dbConfig.port,
    define: dbConfig.define,
    logging: false
})

export default connection;