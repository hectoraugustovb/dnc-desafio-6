import { Request, Response } from 'express';

import mainRepository from '../repositories/orders.repository';

const orderReqProps = [
    'client_id',
    'products',
]

class OrdersController {
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
            products: data.products,
        });

        return res.status(response.code).json(response.data);
    };
    async deleteOrder (req: Request, res: Response) {
        const orderId = parseInt(req.params.id);

        const response = await mainRepository.deleteOrder(orderId);

        return res.status(response.code).json(response.data);
    };
}

export default new OrdersController();