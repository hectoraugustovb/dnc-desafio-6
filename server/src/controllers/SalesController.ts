import { Request, Response } from 'express';

import mainRepository from '../repositories/sales.repository';

const orderReqProps = [
    'client_id',
    'products',
]

class SalesController {
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

export default new SalesController();