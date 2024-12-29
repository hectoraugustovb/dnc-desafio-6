import { Client, Sale, Product, Stock } from "../database/models/index";

interface CreateProductData {
    client_id: number;
    products: {
        id: number;
        amount: number;
    }[];
}

export default {
    getAllSales: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const sales = await Sale.findAll({
                include: [{
                    model: Client,
                    as: 'client'
                }, {
                    model: Product,
                    as: 'products'
                }]
            });

            return {
                code: 200,
                data: sales
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching sales'
                }
            }
        }
    },

    getSale: async (id: number): Promise<{ code: number, data?: {} }> => {
        try {
            const sale = await Sale.findByPk(id, {
                include: [{
                    model: Client,
                    as: 'client'
                }, {
                    model: Product,
                    as: 'products'
                }]
            });

            if (!sale)
                return {
                    code: 404,
                    data: {
                        message: 'Sale not found'
                    }
                }

            return {
                code: 200,
                data: sale
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching sale'
                }
            }
        }
    },

    createSale: async (data: CreateProductData): Promise<{ code: number, data?: {} }> => {
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
                const gettedProduct = await Product.findByPk(product.id, {
                    include: [{
                        model: Stock,
                        as: 'stock'
                    }]
                });

                if (!gettedProduct) {
                    return {
                        code: 404,
                        data: {
                            message: `Product not found: ID - ${product.id}`
                        }
                    }
                }

                if (gettedProduct.dataValues.stock?.amount === 0)
                    return {
                        code: 400,
                        data: {
                            message: 'Insufficient stock'
                        }
                    }

                productsData.totalPrice += gettedProduct.dataValues.price * product.amount;
                productsData.products.push({
                    amount: product.amount,
                    product: gettedProduct
                });

                const productStock = await Stock.findByPk(product.id);

                await productStock?.update({
                    amount: productStock.dataValues.amount - product.amount
                });
            }

            const productsToAdd = productsData.products.map(item => item.product);

            const sale = await Sale.create({ buyer_id: data.client_id, total_price: productsData.totalPrice });
            for (const product of productsToAdd) {
                const productAmount = productsData.products
                    .filter(item => item.product.dataValues.id === product.dataValues.id)
                    .map(item => item.amount)[0];

                await sale.addProduct(product, { 
                    through: { 
                        amount: productAmount 
                    } 
                });

                const productStock = await Stock.findByPk(product.dataValues.id);
                await productStock?.update({
                    amount: productStock.dataValues.amount - productAmount
                });
            }

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