import Client from "./client";
import Order from "./order";
import Product from "./product";
import Sale from "./sale";
import Stock from "./stock";

Client.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(Client, { foreignKey: 'buyer_id', as: 'clients' });

Client.hasMany(Sale, { foreignKey: 'buyer_id', as: 'sales' });
Sale.belongsTo(Client, { foreignKey: 'buyer_id', as: 'clients' });

Product.hasOne(Stock, { foreignKey: 'product_id', as: 'stock' });
Stock.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export {
    Client,
    Order,
    Sale,
    Product,
    Stock
};