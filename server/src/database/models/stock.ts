import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface SaleInfo {
    id: string,
    product_id: number,
    amount: number,
    created_at?: string,
    updated_at?: string
}

type SaleInfoCreation = Optional<SaleInfo, 'id'>;

class Sale extends Model<SaleInfo, SaleInfoCreation> {};

Sale.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    product_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    amount: {
        type: DataTypes.NUMBER,
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
        allowNull: false,
    }
}, {
    tableName: 'sales',
    sequelize
});

export default Sale;