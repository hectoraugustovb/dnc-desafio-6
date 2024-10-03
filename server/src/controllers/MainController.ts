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
    async deleteUser (req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        const response = await mainRepository.deleteUser(userId);

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
    async deleteProduct (req: Request, res: Response) {
        const productId = parseInt(req.params.id);

        const response = await mainRepository.deleteProduct(productId);

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
    async deleteOrder (req: Request, res: Response) {
        const orderId = parseInt(req.params.id);

        const response = await mainRepository.deleteOrder(orderId);

        return res.status(response.code).json(response.data);
    };

    async getAllSales (request: Request, res: Response) {
        const response = await mainRepository.getAllSales();

        return res.status(response.code).json(response.data);
    };
    async createSale (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = orderReqProps.find(prop => !data[prop]);
        if (missingProp) {
            return res.status(400).json({ message: `Missing property ${missingProp} in the body request` });
        }

        const response = await mainRepository.createSale({
            client_id: data.client_id,
            product_id: data.product_id,
            amount: data.amount
        });

        return res.status(response.code).json(response.data);
    };
    async deleteSale (req: Request, res: Response) {
        const saleId = parseInt(req.params.id);

        const response = await mainRepository.deleteSale(saleId);

        return res.status(response.code).json(response.data);
    };
}

export default new MainController();