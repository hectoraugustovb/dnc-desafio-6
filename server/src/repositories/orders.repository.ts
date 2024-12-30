import { Client, Order, Product, Stock } from "../database/models/index";
import checkProduct from "./utils/checkProduct";
import ProductError from "./utils/ProductError";

interface ICreateOrder { 
    client_id: number;
    products: { 
        id: number;
        amount: number;
    }[];
}

interface IOrderUpdate {
    id: number;
    status: 'pending' | 'processing' |'shipped' | 'delivered' | 'cancelled';
}

export default {
    getAllOrders: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: Client,
                        as: 'client'
                    },
                    {
                        model: Product,
                        as: 'products',
                        attributes: ['id', 'name', 'description', 'price'],
                        through: {
                            attributes: ['amount']
                        }
                    }
                ],
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
                include: [
                    {
                        model: Client,
                        as: 'client'
                    },
                    {
                        model: Product,
                        as: 'products',
                        attributes: ['id', 'name', 'description', 'price'],
                        through: {
                            attributes: ['amount']
                        }
                    }
                ]
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

    createOrder: async (data: ICreateOrder): Promise<{ code: number, data?: {} }> => {
        try {
            const buyer = await Client.findByPk(data.client_id);
            if (!buyer)
                return {
                    code: 404,
                    data: {
                        message: 'Client not found'
                    }
                }

            let productsData: { totalPrice: number, products: Array<{ amount: number, product: Product }> }  = {
                totalPrice: 0,
                products: []
            };
            for (let product of data.products) {
                const gettedProduct = await checkProduct(product);

                productsData.totalPrice += gettedProduct.dataValues.price * product.amount;
                productsData.products.push({
                    amount: product.amount,
                    product: gettedProduct
                });

                //-----Update product stock
                const productStock = await Stock.findByPk(product.id);
                await productStock?.update({
                    amount: productStock.dataValues.amount - product.amount
                });
            }

            const productsToAdd = productsData.products.map(item => item.product);

            const order = await Order.create({ buyer_id: data.client_id, total_price: productsData.totalPrice });
            for (const product of productsToAdd) {
                const productAmount = productsData.products
                    .filter(item => item.product.dataValues.id === product.dataValues.id)
                    .map(item => item.amount)[0];

                await order.addProduct(product, { 
                    through: { 
                        amount: productAmount 
                    } 
                });

                //-----Update product stock
                const productStock = await Stock.findByPk(product.dataValues.id);
                await productStock?.update({
                    amount: productStock.dataValues.amount - productAmount
                });
            }

            return {
                code: 201
            }
        } catch (error) {
            if (error instanceof ProductError)
                return {
                    code: error.statusCode,
                    data: {
                        message: error.message
                    }
                };

            return {
                code: 500,
                data: {
                    message: 'Error creating order'
                }
            }
        }
    },

    updateOrder: async (data: IOrderUpdate): Promise<{ code: number, data?: {} }> => {
        try {
            const order = await Order.findByPk(data.id);
            if (!order)
                return {
                    code: 404,
                    data: {
                        message: 'Order not found'
                    }
                }

            order.update({ status: data.status })

            return {
                code: 200
            }
        } catch (error) {
            if (error instanceof ProductError)
                return {
                    code: error.statusCode,
                    data: {
                        message: error.message
                    }
                };

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
            const order = await Order.findByPk(orderId);

            if (!order)
                return {
                    code: 404,
                    data: {
                        message: 'Order not found'
                    }
                }

            await order.destroy();

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