import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface OrderInfo {
    id: string,
    product_id: number,
    buyer_id: number,
    created_at?: string,
    updated_at?: string,
}

type OrderInfoCreation = Optional<OrderInfo, 'id'>;

class Order extends Model<OrderInfo, OrderInfoCreation> {};

Order.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    product_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    },
    buyer_id: {
        type: DataTypes.NUMBER,
        allowNull: false
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
    tableName: 'orders',
    sequelize
});

export default Order;