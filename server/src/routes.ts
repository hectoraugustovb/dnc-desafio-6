import { Router } from "express";

import UsersController from "./controllers/UsersController";
import ProductsController from "./controllers/ProductsController";
import OrdersController from "./controllers/OrdersController";
import SalesController from "./controllers/SalesController";

const routes = Router();

routes
    .get('/users', UsersController.getAllUsers)
    .get('/users/:id', UsersController.getUser)
    .post('/users', UsersController.createUser)
    .put('/users', UsersController.updateUser)
    .delete('/users/:id', UsersController.deleteUser)

    .get('/products', ProductsController.getAllProducts)
    .get('/products/:id', ProductsController.getProduct)
    .post('/products', ProductsController.createProduct)
    .put('/products', ProductsController.updateProduct)
    .delete('/products/:id', ProductsController.deleteProduct)

    .get('/orders', OrdersController.getAllOrders)
    .get('/orders/:id', OrdersController.getOrder)
    .post('/orders', OrdersController.createOrder)
    .put('/orders', OrdersController.updateOrder)
    .delete('/orders/:id', OrdersController.deleteOrder)

    .get('/sales', SalesController.getAllSales)
    .get('/sales/:id', SalesController.getSale)
    .post('/sales', SalesController.createSale)
    .delete('/sales/:id', SalesController.deleteSale);

export default routes;