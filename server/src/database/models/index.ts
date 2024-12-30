import Client from "./client";
import Order from "./order";
import OrdersProducts from "./orders_products";
import Product from "./product";
import Sale from "./sale";
import SalesProducts from "./sales_products";
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
Product.belongsToMany(Order, { through: OrdersProducts, foreignKey: 'product_id', otherKey: 'order_id', as: 'orders' });
Order.belongsToMany(Product, { through: OrdersProducts, foreignKey: 'order_id', otherKey: 'product_id', as: 'products' });

//-----Product to Sale
Product.belongsToMany(Sale, { through: SalesProducts, foreignKey: 'product_id', otherKey: 'sale_id', as: 'sales' });
Sale.belongsToMany(Product, { through: SalesProducts, foreignKey: 'sale_id', otherKey: 'product_id', as: 'products' });

export {
    Client,
    Order,
    Sale,
    Product,
    Stock,
    SalesProducts
};