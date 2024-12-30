import { Model, DataTypes, Optional } from 'sequelize';
import { Product, Order } from '.';
import sequelize from '..';

interface OrdersProductsProps {
    id?: number,
    product_id: number,
    amount: number
}

type OrdersProductsInfoCreation = Optional<OrdersProductsProps, 'id'>;

class OrdersProducts extends Model<OrdersProductsProps, OrdersProductsInfoCreation> {};

OrdersProducts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: Order,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'orders_products',
    sequelize
});


export default OrdersProducts;