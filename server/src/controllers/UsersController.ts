import { Request, Response } from 'express';

import mainRepository from '../repositories/main.repository';

const userReqProps = [
    'name',
    'cpf',
    'email',
    'phone'
]

class UsersController {
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
}

export default new UsersController();