import express from 'express';
import { getUserProfileController, loginController, logoutcontroller, registerController, UpdatePasswordController, updateProfileController, updateProfilePicController } from '../controlers/UserController.js';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { singleUplod } from '../middlewares/multer.js';
import productModel from '../models/productModel.js';
import { deleteProductController } from '../controlers/productController.js';

// router object 
const router =express.Router()


// routers
router.post('/register',registerController);

// login
router.post('/login',loginController);

router.get('/profile',isAuth, getUserProfileController)

//loout
router.get('/logout',isAuth,logoutcontroller)

// update profile
router.put('/profile-update',isAuth,updateProfileController)

router.put('/update-password',isAuth,UpdatePasswordController)

router.put('/update-picture',singleUplod,isAuth, updateProfilePicController)

// DELETE PRODUCT
router.delete('/delete:id',isAuth, deleteProductController)



// export
export default router