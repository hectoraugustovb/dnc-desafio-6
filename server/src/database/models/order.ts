import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface OrderInfo {
    id: number,
    product_id: number,
    buyer_id: number,
    amount: number,
    created_at?: string,
    updated_at?: string,
}

type OrderInfoCreation = Optional<OrderInfo, 'id'>;

class Order extends Model<OrderInfo, OrderInfoCreation> {};

Order.init({
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
    tableName: 'orders',
    sequelize
});

export default Order;