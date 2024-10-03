import Product from "../database/models/product"

export default {
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
    }
}