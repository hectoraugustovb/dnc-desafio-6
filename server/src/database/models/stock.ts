import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface SaleInfo {
    id: number,
    product_id: number,
    amount: number,
    created_at?: string,
    updated_at?: string
}

type SaleInfoCreation = Optional<SaleInfo, 'id'>;

class Sale extends Model<SaleInfo, SaleInfoCreation> {};

Sale.init({
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
    tableName: 'sales',
    sequelize
});

export default Sale;