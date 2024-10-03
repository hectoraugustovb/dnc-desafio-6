import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface ClientInfo {
    id?: number,
    cpf: number,
    name: string,
    email: string,
    phone: number,
    created_at?: string,
    updated_at?: string,
}

type ClientInfoCreation = Optional<ClientInfo, 'id'>;

class Client extends Model<ClientInfo, ClientInfoCreation> {};

Client.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    cpf: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'clients',
    sequelize
});

export default Client;