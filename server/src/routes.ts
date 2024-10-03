import { Router } from "express";

import MainController from "./controllers/MainController";

const routes = Router();

routes
    .get('/users', MainController.getAllUsers)
    .post('/users', MainController.createUser)

    .get('/products', MainController.getAllProducts)
    .post('/products', MainController.createProduct)

    .get('/orders', MainController.getAllOrders)
    .post('/orders', MainController.createOrder);

export default routes;