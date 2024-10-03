import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface ProductInfo {
    id: number,
    name: string,
    description: string,
    price: number,
    created_at?: string,
    updated_at?: string,
}

type ProductInfoCreation = Optional<ProductInfo, 'id'>;

class Product extends Model<ProductInfo, ProductInfoCreation> {};

Product.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
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
    tableName: 'products',
    sequelize
});

export default Product;