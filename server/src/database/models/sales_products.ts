import { Model, DataTypes, Optional } from 'sequelize';
import { Product, Sale } from '.';
import sequelize from '..';

interface SalesProductsProps {
    id?: number,
    product_id: number,
    amount: number
}

type SalesProductsInfoCreation = Optional<SalesProductsProps, 'id'>;

class SalesProducts extends Model<SalesProductsProps, SalesProductsInfoCreation> {};

SalesProducts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: Sale,
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
    tableName: 'sales_products',
    sequelize
});


export default SalesProducts;