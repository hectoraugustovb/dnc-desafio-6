import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface ClientInfo {
    id: string,
    cpf: string,
    name: string,
    email: string,
    password: string,
    cep: string,
    phone: string,
    created_at?: string,
    updated_at?: string,
}

type ClientInfoCreation = Optional<ClientInfo, 'id'>;

class Client extends Model<ClientInfo, ClientInfoCreation> {};

Client.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    cpf: {
        type: DataTypes.STRING,
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
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