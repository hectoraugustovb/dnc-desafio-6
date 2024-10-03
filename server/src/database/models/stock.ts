import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface StockInfo {
    id: number,
    product_id: number,
    amount: number,
    created_at?: string,
    updated_at?: string
}

type StockInfoCreation = Optional<StockInfo, 'id'>;

class Stock extends Model<StockInfo, StockInfoCreation> {};

Stock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'stock',
    sequelize
});

export default Stock;