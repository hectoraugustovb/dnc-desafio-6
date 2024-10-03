import Client from "./client";
import Order from "./order";

Client.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(Client, { foreignKey: 'buyer_id', as: 'clients' });

export {
    Client,
    Order
};