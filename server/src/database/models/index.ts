import Client from "./client";
import Order from "./order";
import Product from "./product";
import Stock from "./stock";

Client.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(Client, { foreignKey: 'buyer_id', as: 'clients' });

Product.hasOne(Stock, { foreignKey: 'product_id', as: 'stock' });
Stock.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export {
    Client,
    Order,
    Product,
    Stock
};