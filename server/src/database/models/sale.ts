import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface SaleInfo {
    id: string,
    product_id: number,
    buyer_id: number,
    created_at?: string
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
    buyer_id: {
        type: DataTypes.NUMBER,
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