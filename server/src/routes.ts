import { Router } from "express";

import MainController from "./controllers/MainController";

const routes = Router();

routes
    .get('/products', MainController.getAllProducts)
    .post('/products', MainController.createProduct);

export default routes;