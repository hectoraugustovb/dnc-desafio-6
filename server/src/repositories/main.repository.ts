import { Client, Order, Product, Sale, Stock } from "../database/models/index";
import { UserType } from "../types/types";

export default {
    getAllUsers: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const users = await Client.findAll({
                include: [{
                    model: Order,
                    as: 'orders'
                }, {
                    model: Sale,
                    as: 'sales'
                }]
            });

            return {
                code: 200,
                data: users
            }

        } catch (error) {
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

    deleteUser: async (userId: number): Promise<{ code: number, data?: {} }> => {
        try {
            await Client.destroy({ where: { id: userId } });

            return {
                code: 200
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error deleting user'
                }
            }
        }
    },
    

    getAllProducts: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Stock,
                    as: 'stock'
                }]
            });

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

    createProduct: async (data: { name: string, price: number, amount: number, description: string }): Promise<{ code: number, data?: {} }>  => {
        try {
            const newProduct = await Product.create({
                name: data.name,
                price: data.price,
                description: data.description,
            })
            await Stock.create({
                product_id: newProduct.dataValues.id,
                amount: data.amount
            })
            
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
    
    deleteProduct: async (productId: number): Promise<{ code: number, data?: {} }> => {
        try {
            await Product.destroy({ where: { id: productId } });

            return {
                code: 200
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error deleting product'
                }
            }
        }
    },
    

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
                        message: 'Client not found'
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
    
   
    getAllSales: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const sales = await Sale.findAll({
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
                data: sales
            }

        } catch (error) {
            console.log(error)
            return {
                code: 500,
                data: {
                    message: 'Error fetching sales'
                }
            }
        }
    },

    createSale: async (data: { client_id: number, product_id: number, amount: number }): Promise<{ code: number, data?: {} }> => {
        try {
            const buyer = await Client.findByPk(data.client_id);
            const product = await Product.findByPk(data.product_id, {
                include: [{
                    model: Stock,
                    as:'stock'
                }]
            });

            if (!buyer)
                return {
                    code: 404,
                    data: {
                        message: 'Client not found'
                    }
                }

            if (!product)
                return {
                    code: 404,
                    data: {
                        message: 'Product not found'
                    }
                }

            if (product.dataValues.stock?.amount === 0)
                return {
                    code: 400,
                    data: {
                        message: 'Insufficient stock'
                    }
                }

            const productStock = await Stock.findByPk(data.product_id);

            await Sale.create({ buyer_id: data.client_id, product_id: data.product_id, amount: data.amount });
            await productStock?.update({
                amount: productStock.dataValues.amount - data.amount
            });

            return {
                code: 201
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error creating sale'
                }
            }
        }
    },

    deleteSale: async (saleId: number): Promise<{ code: number, data?: {} }> => {
        try {
            await Sale.destroy({ where: { id: saleId } });

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