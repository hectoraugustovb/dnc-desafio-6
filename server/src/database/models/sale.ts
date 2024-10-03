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
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'sales',
    sequelize
});

export default Sale;