import { Client, Sale, Product, Stock } from "../database/models/index";
import checkProduct from "./utils/checkProduct";
import ProductError from "./utils/ProductError";

interface ICreateProductData {
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

    createSale: async (data: ICreateProductData): Promise<{ code: number, data?: {} }> => {
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
                    message: 'Error creating Sale'
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