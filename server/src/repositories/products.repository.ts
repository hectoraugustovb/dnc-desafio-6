import { Product, Stock } from "../database/models/index";

export default {
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

    getProduct: async (id: number): Promise<{ code: number, data?: {} }> => {
        try {
            const product = await Product.findByPk(id, {
                include: [{
                    model: Stock,
                    as: 'stock'
                }]
            });

            if (!product)
                return {
                    code: 404,
                    data: {
                        message: 'Product not found'
                    }
                }

            return {
                code: 200,
                data: product
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching product'
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
}