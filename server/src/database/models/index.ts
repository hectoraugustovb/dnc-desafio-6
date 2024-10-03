import Client from "./client";
import Order from "./order";
import Product from "./product";
import Sale from "./sale";
import Stock from "./stock";

Client.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(Client, { foreignKey: 'buyer_id', as: 'client' });

Client.hasMany(Sale, { foreignKey: 'buyer_id', as: 'sales' });
Sale.belongsTo(Client, { foreignKey: 'buyer_id', as: 'client' });

Product.hasOne(Stock, { foreignKey: 'product_id', as: 'stock' });
Stock.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.hasMany(Order, { foreignKey: 'product_id', as: 'orders' });
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.hasMany(Sale, { foreignKey: 'product_id', as: 'sales' });
Sale.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export {
    Client,
    Order,
    Sale,
    Product,
    Stock
};