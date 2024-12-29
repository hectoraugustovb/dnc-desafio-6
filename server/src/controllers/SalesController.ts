import { Request, Response } from 'express';

import salesRepository from '../repositories/sales.repository';

const orderReqProps = [
    'client_id',
    'products',
]

class SalesController {
    async getAllSales (request: Request, res: Response) {
        const response = await salesRepository.getAllSales();

        return res.status(response.code).json(response.data);
    };

    async getSale (request: Request, res: Response) {
        const { id } = request.params

        const response = await salesRepository.getSale(Number(id));

        return res.status(response.code).json(response.data);
    };

    async createSale (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = orderReqProps.find(prop => !data[prop]);
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
        
        const response = await salesRepository.createSale({
            client_id: data.client_id,
            products: data.products
        });

        return res.status(response.code).json(response.data);
    };

    async deleteSale (req: Request, res: Response) {
        const saleId = parseInt(req.params.id);

        const response = await salesRepository.deleteSale(saleId);

        return res.status(response.code).json(response.data);
    };
}

export default new SalesController();