import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface SaleInfo {
    id: number,
    product_id: number,
    buyer_id: number,
    created_at?: string
}

type SaleInfoCreation = Optional<SaleInfo, 'id'>;

class Sale extends Model<SaleInfo, SaleInfoCreation> {};

Sale.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, {
    tableName: 'sales',
    sequelize
});

export default Sale;