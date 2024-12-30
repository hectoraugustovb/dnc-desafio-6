import { Op } from "sequelize";
import { Client, Order, Sale } from "../database/models/index";

interface ICreateUser {
    name: string;
    email: string;
    phone: number;
    cpf: number;
}

interface IUpdateUser {
    id: number;
    name?: string;
    email?: string;
    phone?: number;
    cpf?: number;
}

export default {
    getAllUsers: async (): Promise<{ code: number, data?: {} }> => {
        try {
            const users = await Client.findAll({
                include: [{
                    model: Order,
                    as: 'orders'
                }, {
                    model: Sale,
                    as: 'sales'
                }]
            });

            return {
                code: 200,
                data: users
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching users'
                }
            }
        }
    },

    getUser: async (id: number): Promise<{ code: number, data?: {} }> => {
        try {
            const user = await Client.findByPk(id, {
                include: [{
                    model: Order,
                    as: 'orders'
                }, {
                    model: Sale,
                    as: 'sales'
                }]
            });

            if (!user)
                return {
                    code: 404,
                    data: {
                        message: 'User not found'
                    }
                }

            return {
                code: 200,
                data: user
            }

        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error fetching user'
                }
            }
        }
    },

    createUser: async (data: ICreateUser): Promise<{ code: number, data?: {} }> => {
        try {
            const existingClient = await Client.findOne({
                where: {
                    [Op.or]: [
                        { email: data.email },
                        { cpf: data.cpf },
                        { phone: data.phone }
                    ]
                }
            });

            if (existingClient)
                return {
                    code: 409,
                    data: {
                        message: 'CPF, email or phone are not available'
                    }
                };

            await Client.create(data);

            return {
                code: 201
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error creating user'
                }
            }
        }
    },

    updateUser: async (data: IUpdateUser): Promise<{ code: number, data?: {} }> => {
        try {
            const client = await Client.findByPk(data.id);

            if (!client)
                return {
                    code: 404,
                    data: {
                        message: 'User not found'
                    }
                };

            
            const whereDbConditions = [];

            if (data.email) whereDbConditions.push({ email: data.email });
            if (data.cpf) whereDbConditions.push({ cpf: data.cpf });
            if (data.phone) whereDbConditions.push({ phone: data.phone });

            const existingClient = await Client.findOne({
                where: {
                    [Op.and]: [
                        { id: { [Op.ne]: data.id } },
                        {
                            [Op.or]: whereDbConditions
                        }
                    ]
                }
            });

            if (existingClient)
                return {
                    code: 409,
                    data: {
                        message: 'CPF, email or phone are not available'
                    }
                };

            
            await client.update({
                name: data.name,
                email: data.email,
                phone: data.phone,
                cpf: data.cpf
            });

            return {
                code: 201
            }
        } catch (error) {
            console.log(error)

            return {
                code: 500,
                data: {
                    message: 'Error updating user'
                }
            }
        }
    },

    deleteUser: async (userId: number): Promise<{ code: number, data?: {} }> => {
        try {
            return await Client.destroy({ where: { id: userId } })
                .then(result => {
                    if (result === 0)
                        return {
                            code: 404,
                            data: {
                                message: 'User not found'
                            }
                        }

                    return {
                        code: 200
                    }
                });
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: 'Error deleting user'
                }
            }
        }
    },
}