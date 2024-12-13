import express from 'express';  
import { creatwProductController, deleteProductController, deleteProductImgController, getAllproductController, getSingleProductController, updateProductController, updateProductImageController } from '../controlers/productController.js';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { singleUplod } from '../middlewares/multer.js';

const router=express.Router();

// router
// GET ALL PRODUCT
router.get('/get-all',getAllproductController)

// GET SINGLE PRODUCT
router.get('/:id',getSingleProductController)

// CREATE PRODUCT
router.post('/create',isAuth,singleUplod,creatwProductController)

// UPDATE PRODUCT
router.put('/:id',isAuth,updateProductController)

// UPDATE PRODUCT
router.put('/image/:id',isAuth,singleUplod,updateProductImageController)

// DELETE PRODUCT IMAGE
router.delete('/delete/:id',isAuth,deleteProductController)


export default router;
