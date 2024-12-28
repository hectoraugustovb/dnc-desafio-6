import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface OrderInfo {
    id: number,
    buyer_id: number,
    total_price: number,
    status?: 'pending' | 'processing' |'shipped' | 'delivered' | 'cancelled',
    created_at?: string,
}

type OrderInfoCreation = Optional<OrderInfo, 'id'>;

class Order extends Model<OrderInfo, OrderInfoCreation> {};

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        },
        allowNull: false,
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'orders',
    sequelize
});

export default Order;