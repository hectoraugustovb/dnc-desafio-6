import { Request, Response } from 'express';

import mainRepository from '../repositories/main.repository';

const productReqProps = [
    'name',
    'price',
    'amount',
    'description',
]

const userReqProps = [
    'name',
    'cpf',
    'email',
    'phone'
]

const orderReqProps = [
    'client_id',
    'product_id',
    'amount'
]

class MainController {
    async getAllUsers (request: Request, res: Response) {
        const response = await mainRepository.getAllUsers();

        return res.status(response.code).json(response.data);
    }; 
    async createUser (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = userReqProps.find(prop => !data[prop]);
        if (missingProp) {
            return res.status(400).json({ message: `Missing property ${missingProp} in the body request` });
        }

        const response = await mainRepository.createUser({
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            phone: data.phone
        });

        return res.status(response.code).json(response.data);
    };

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

    async getAllOrders (request: Request, res: Response) {
        const response = await mainRepository.getAllOrders();

        return res.status(response.code).json(response.data);
    };
    async createOrder (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = orderReqProps.find(prop => !data[prop]);
        if (missingProp) {
            return res.status(400).json({ message: `Missing property ${missingProp} in the body request` });
        }

        const response = await mainRepository.createOrder({
            client_id: data.client_id,
            product_id: data.product_id,
            amount: data.amount
        });

        return res.status(response.code).json(response.data);
    };
}

export default new MainController();