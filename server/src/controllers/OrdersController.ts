import { Request, Response } from 'express';

import ordersRepository from '../repositories/orders.repository';

const createOrderReqProps = [
    'client_id',
    'products'
]

const updateOrderReqProps = [
    'id',
    'status'
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
        
        const missingProp = createOrderReqProps.find(prop => !data[prop]);
        if (missingProp)
            return res
                .status(400)
                .json({ 
                    message: `Missing property ${missingProp} in the body request` 
                });

        for (let product of data.products) {
            if (!product.id)
                return res
                   .status(400)
                   .json({ 
                        message: `Missing product id in the body request` 
                   });
            
            if (!product.amount)
                return res
                    .status(400)
                    .json({ 
                        message: `Missing product amount in the body request (Product ID: ${product.id})` 
                    });
        }
        
        const response = await ordersRepository.createOrder({
            client_id: data.client_id,
            products: data.products
        });

        return res.status(response.code).json(response.data);
    };

    async updateOrder (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = updateOrderReqProps.find(prop => !data[prop]);
        if (missingProp)
            return res
                .status(400)
                .json({ 
                    message: `Missing property ${missingProp} in the body request` 
                });

        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(data.status))
            return res
               .status(400)
               .json({ 
                    message: `Invalid status provided.`
                });
        
        const response = await ordersRepository.updateOrder({
            id: data.id,
            status: data.status
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