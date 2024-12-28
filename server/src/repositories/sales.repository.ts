import { Client, Product, Sale, Stock } from "../database/models/index";

export default {
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