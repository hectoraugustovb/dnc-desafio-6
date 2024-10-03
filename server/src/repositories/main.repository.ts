import Client from "../database/models/client";
import Product from "../database/models/product"
import { UserType } from "../utils/types";

export default {
    getAllUsers: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const users = await Client.findAll();

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
}