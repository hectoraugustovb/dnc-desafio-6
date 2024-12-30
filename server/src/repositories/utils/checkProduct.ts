import { Product, Stock } from "../../database/models";
import ProductError from "./ProductError";

const checkProduct = async (product: { id: number; amount: number; }): Promise<Product> => {
    const gettedProduct = await Product.findByPk(product.id, {
        include: [{
            model: Stock,
            as: 'stock'
        }]
    });

    if (!gettedProduct)
        throw new ProductError(404, `Product not found (ID: ${product.id})`);
    

    const productStock = gettedProduct.dataValues.stock?.amount;

    if ((productStock && productStock <= 0) || (productStock && productStock < product.amount))
        throw new ProductError(422, `Out of stock or insufficient (ID: ${product.id})`);


    return gettedProduct;
}

export default checkProduct;