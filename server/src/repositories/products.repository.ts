import { Product, Stock } from "../database/models/index";

interface ICreateProductData {
    name: string;
    price: number;
    amount: number;
    description: string;
}

interface IUpdateProductData {
    id: number;
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
}

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

    createProduct: async (data: ICreateProductData): Promise<{ code: number, data?: {} }>  => {
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
        
    updateProduct: async (data: IUpdateProductData): Promise<{ code: number, data?: {} }> => {
        try {
            const product = await Product.findByPk(data.id);

            if (!product)
                return {
                    code: 404,
                    data: {
                        message: 'Product not found'
                    }
                }

            if (data.amount){
                await Stock.update({ amount: data.amount }, { where: { product_id: data.id } });
            }

            const updateProductData = { ...data };
            delete updateProductData.amount;

            await product.update(updateProductData);

            return {
                code: 200
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error updating product'
                }
            }
        }
    },

    deleteProduct: async (productId: number): Promise<{ code: number, data?: {} }> => {
        try {
            return await Product.destroy({ where: { id: productId } })
                .then(result => {
                    console.log(result)

                    if (result == 0)
                        return {
                            code: 404,
                            data: {
                                message: 'Product not found'
                            }
                        }

                    return {
                        code: 200
                    }
                });
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