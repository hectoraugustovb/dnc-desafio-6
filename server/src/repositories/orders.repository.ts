import connection from "../database";
import { Client, Order, Product } from "../database/models/index";
import { OrderType } from "../types/types";

export default {
    getAllOrders: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const orders = await Order.findAll({
                include: [{
                    model: Client,
                    as: 'client'
                }, {
                    model: Product,
                    as: 'product'
                }]
            });

            return {
                code: 200,
                data: orders
            }

        } catch (error) {
            console.log(error);
            return {
                code: 500,
                data: {
                    message: 'Error fetching orders'
                }
            }
        }
    },

    getOrder: async (id: number): Promise<{ code: number, data?: {} }> => {
        try {
            const order = await Order.findByPk(id, {
                include: [{
                    model: Client,
                    as: 'client'
                }, {
                    model: Product,
                    as: 'product'
                }]
            });

            if (!order)
                return {
                    code: 404,
                    data: {
                        message: 'Order not found'
                    }
                }

            return {
                code: 200,
                data: order
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching order'
                }
            }
        }
    },

    createOrder: async (data: OrderType): Promise<{ code: number, data?: {} }> => {
        const transaction = await connection.transaction();

        try {
            const buyer = await Client.findByPk(data.client_id);

            if (!buyer)
                return {
                    code: 404,
                    data: {
                        message: 'Client not found'
                    }
                }

            const foundProducts = await Product.findAll({
                where: {
                    id: data.products.map(product => product.id)
                }
            });
    
            if (foundProducts.length !== data.products.length) {
                return {
                    code: 404,
                    data: {
                        message: 'One or more products not found'
                    }
                };
            }

            let totalPrice = 0;
            foundProducts.forEach(product => {
                const productAmount = Number(data.products.find(p => p.id === product.dataValues.id)!.amount);
                const productPrice = productAmount * product.dataValues.price;

                return totalPrice += productPrice;
            })

            const order = await Order.create({
                buyer_id: data.client_id,
                total_price: totalPrice
            }, { transaction: transaction });

            for (let product of data.products) {
                const productToAdd = await Product.findByPk(product.id);
                if (!productToAdd)
                    return {
                        code: 404,
                        data: {
                            message: `Product not found: ID - ${product.id}`
                        }
                    }

                await order.addProducts(productToAdd, {
                    through: { amount: product.amount },
                    transaction: transaction
                });
            }

            await transaction.commit();

            return {
                code: 201
            }
        } catch (error) {
            console.log(error)
            await transaction.rollback();

            return {
                code: 500,
                data: {
                    message: 'Error creating order'
                }
            }
        }
    },

    deleteOrder: async (orderId: number): Promise<{ code: number, data?: {} }> => {
        try {
            await Order.destroy({ where: { id: orderId } });

            return {
                code: 200
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error deleting order'
                }
            }
        }
    },
    
}