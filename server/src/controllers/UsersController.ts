import { Request, Response } from 'express';

import usersRepository from '../repositories/users.repository';

const userReqProps = [
    'name',
    'cpf',
    'email',
    'phone'
]

class UsersController {
    async getAllUsers (request: Request, res: Response) {
        const response = await usersRepository.getAllUsers();

        return res.status(response.code).json(response.data);
    };

    async getUser (request: Request, res: Response) {
        const { id } = request.params

        const response = await usersRepository.getUser(Number(id));

        return res.status(response.code).json(response.data);
    };

    async createUser (req: Request, res: Response) {
        const data = req.body;
        
        const missingProp = userReqProps.find(prop => !data[prop]);
        if (missingProp)
            return res
                .status(400)
                .json({ 
                    message: `Missing property ${missingProp} in the body request` 
                });

        const response = await usersRepository.createUser({
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            phone: data.phone
        });

        return res.status(response.code).json(response.data);
    };

    async deleteUser (req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        const response = await usersRepository.deleteUser(userId);

        return res.status(response.code).json(response.data);
    };
}

export default new UsersController();