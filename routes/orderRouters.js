import express from 'express';  
import { createOrderController, getmyordersController, singleOrderDetrailsController } from "../controlers/orderControllers.js";
import {isAuth} from "./../middlewares/authMiddlewares.js";


const router=express.Router();



// CREATE ORDER
router.post('/create',isAuth,createOrderController);

// GET ALL ORDERS
router.get('/my-order',isAuth,getmyordersController);

// GET singel ORDERS
router.get('/my-order:id',isAuth,singleOrderDetrailsController);

export default router;