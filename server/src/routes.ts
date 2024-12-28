import { Router } from "express";

import MainController from "./controllers/MainController";

const routes = Router();

routes
    .get('/users', MainController.getAllUsers)
    .post('/users', MainController.createUser)
    .delete('/users', MainController.deleteUser)

    .get('/products', MainController.getAllProducts)
    .post('/products', MainController.createProduct)
    .delete('/products', MainController.deleteProduct)

    .get('/orders', MainController.getAllOrders)
    .post('/orders', MainController.createOrder)
    .delete('/orders', MainController.deleteOrder)

    .get('/sales', MainController.getAllSales)
    .post('/sales', MainController.createSale);

export default routes;