import express from 'express';  
import { createOrderController, getmyordersController, paymentsController, singleOrderDetrailsController } from "../controlers/orderControllers.js";
import {isAuth} from "./../middlewares/authMiddlewares.js";


const router=express.Router();



// CREATE ORDER
router.post('/create',isAuth,createOrderController);

// GET ALL ORDERS
router.get('/my-order',isAuth,getmyordersController);

// GET singel ORDERS
router.get('/my-order:id',isAuth,singleOrderDetrailsController);

//  acceipt payment
// router.post('/payments',isAuth,paymentsController);

export default router;