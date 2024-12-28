import { Client, Order, Sale } from "../database/models/index";
import { UserType } from "../types/types";

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

    createUser: async (data: UserType): Promise<{ code: number, data?: {} }> => {
        try {
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

    deleteUser: async (userId: number): Promise<{ code: number, data?: {} }> => {
        try {
            await Client.destroy({ where: { id: userId } });

            return {
                code: 200
            }
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