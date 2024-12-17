import express from 'express';  
import { isAuth } from '../middlewares/authMiddlewares.js';
import { createCategory, deleteCategoryController, getAllCategoryController, updateCategoryController } from '../controlers/categoryController.js';

const router=express.Router();

// router
// CREATE CATEGORY
router.post('/create',isAuth, createCategory)

// get all
router.get('/getAll',getAllCategoryController )

// delete category
router.delete('/delete/:id',isAuth,deleteCategoryController)

// update category
router.put('/update/:id',isAuth,updateCategoryController)


export default router;
