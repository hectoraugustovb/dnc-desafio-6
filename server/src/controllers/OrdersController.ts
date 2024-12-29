import { Request, Response } from 'express';

import ordersRepository from '../repositories/orders.repository';

const orderReqProps = [
    'client_id',
    'products',
    'amount'
]

class OrdersController {
    async getAllOrders (request: Request, res: Response) {
        const response = await ordersRepository.getAllOrders();

        return res.status(response.code).json(response.data);
    };

    async getOrder (request: Request, res: Response) {
        const { id } = request.params

        const response = await ordersRepository.getOrder(Number(id));

        return res.status(response.code).json(response.data);
    };

    async createOrder (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = orderReqProps.find(prop => !data[prop]);
        if (missingProp)
            return res
                .status(400)
                .json({ 
                    message: `Missing property ${missingProp} in the body request`
                });

        const response = await ordersRepository.createOrder({
            client_id: data.client_id,
            products: data.products,
            amount: data.amount
        });

        return res.status(response.code).json(response.data);
    };

    async deleteOrder (req: Request, res: Response) {
        const orderId = parseInt(req.params.id);

        const response = await ordersRepository.deleteOrder(orderId);

        return res.status(response.code).json(response.data);
    };
}

export default new OrdersController();