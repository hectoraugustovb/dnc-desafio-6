import { Client, Order } from "../database/models/index";
import Product from "../database/models/product"
import { UserType } from "../types/types";

export default {
    getAllUsers: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const users = await Client.findAll({
                include: [{
                    model: Order,
                    as: 'orders'
                }]
            });

            return {
                code: 200,
                data: users
            }

        } catch (error) {
            console.log(error)
            return {
                code: 500,
                data: {
                    message: 'Error fetching users'
                }
            }
        }
    },

    createUser: async (data: UserType): Promise<{ code: number, data?: {} }> => {
        try {
            await Client.create(data);

            return {
                code: 201
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error creating user'
                }
            }
        }
    },

    getAllProducts: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const products = await Product.findAll();

            return {
                code: 200,
                data: products
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching products'
                }
            }
        }
    },

    createProduct: async (data: { name: string, price: number, description: string }): Promise<{ code: number, data?: {} }>  => {
        try {
            await Product.create(data)
            
            return {
                code: 201
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error creating product'
                }
            }
        }
    },

    getAllOrders: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const orders = await Order.findAll();

            return {
                code: 200,
                data: orders
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching orders'
                }
            }
        }
    },

    createOrder: async (data: { client_id: number, product_id: number, amount: number }): Promise<{ code: number, data?: {} }> => {
        try {
            const buyer = await Client.findByPk(data.client_id);
            const product = await Product.findByPk(data.product_id);

            if (!buyer)
                return {
                    code: 404,
                    data: {
                        message: 'Buyer not found'
                    }
                }

            if (!product)
                return {
                    code: 404,
                    data: {
                        message: 'Product not found'
                    }
                }

            await Order.create({ buyer_id: data.client_id, product_id: data.product_id, amount: data.amount });

            return {
                code: 201
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error creating order'
                }
            }
        }
    }
}