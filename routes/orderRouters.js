import express from 'express';  
import { createOrderController } from "../controlers/orderControllers.js";
import {isAuth} from "./../middlewares/authMiddlewares.js";


const router=express.Router();



// CREATE ORDER

router.post('/create',isAuth,createOrderController);

export default router;