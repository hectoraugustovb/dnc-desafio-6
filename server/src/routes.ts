import { Router } from "express";

import UsersController from "./controllers/UsersController";
import ProductsController from "./controllers/ProductsController";
import OrdersController from "./controllers/OrdersController";
import SalesController from "./controllers/SalesController";

const routes = Router();

routes
    .get('/users', UsersController.getAllUsers)
    .post('/users', UsersController.createUser)
    .delete('/users', UsersController.deleteUser)

    .get('/products', ProductsController.getAllProducts)
    .post('/products', ProductsController.createProduct)
    .delete('/products', ProductsController.deleteProduct)

    .get('/orders', OrdersController.getAllOrders)
    .post('/orders', OrdersController.createOrder)
    .delete('/orders', OrdersController.deleteOrder)

    .get('/sales', SalesController.getAllSales)
    .post('/sales', SalesController.createSale);

export default routes;