import { Request, Response } from 'express';

import mainRepository from '../repositories/products.repository';

const productReqProps = [
    'name',
    'price',
    'amount',
    'description',
]

class ProductsController {
    async getAllProducts (request: Request, res: Response) {
        const response = await mainRepository.getAllProducts();

        return res.status(response.code).json(response.data);
    };
    async createProduct (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = productReqProps.find(prop => !data[prop]);
        if (missingProp) {
            return res.status(400).json({ message: `Missing property ${missingProp} in the body request` });
        }

        const response = await mainRepository.createProduct({
            name: data.name,
            price: data.price,
            description: data.description,
            amount: data.amount
        });

        return res.status(response.code).json(response.data);
    };
    async deleteProduct (req: Request, res: Response) {
        const productId = parseInt(req.params.id);

        const response = await mainRepository.deleteProduct(productId);

        return res.status(response.code).json(response.data);
    };
}

export default new ProductsController();