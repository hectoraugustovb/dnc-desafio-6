import { Request, Response } from 'express';

import mainRepository from '../repositories/main.repository';

const productReqProps = [
    'name',
    'price',
    'description',
]

class MainController {
    async getAllProducts (request: Request, res: Response) {
        const response = await mainRepository.getAllProducts();

        return res.status(response.code).json(response.data);
    }
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
        });

        return res.status(response.code).json(response.data);
    }
}

export default new MainController();