import Client from "./client";
import Order from "./order";
import Product from "./product";
import Sale from "./sale";
import Stock from "./stock";

//----Product to Stock
Product.hasOne(Stock, { foreignKey: 'product_id', as: 'stock' });
Stock.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

//-----Client to Order
Client.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(Client, { foreignKey: 'buyer_id', as: 'client' });

//-----Client to Sale
Client.hasMany(Sale, { foreignKey: 'buyer_id', as: 'sales' });
Sale.belongsTo(Client, { foreignKey: 'buyer_id', as: 'client' });

//-----Product to Order
Product.belongsToMany(Order, { through: 'order_product', foreignKey: 'product_id', otherKey: 'order_id', as: 'orders' });
Order.belongsToMany(Product, { through: 'order_product', foreignKey: 'order_id', otherKey: 'product_id', as: 'products' });

//-----Product to Sale
Product.belongsToMany(Sale, { through: 'sale_product', foreignKey: 'product_id', otherKey: 'sale_id', as: 'sales' });
Sale.belongsToMany(Product, { through: 'sale_product', foreignKey: 'sale_id', otherKey: 'product_id', as: 'products' });

export {
    Client,
    Order,
    Sale,
    Product,
    Stock
};