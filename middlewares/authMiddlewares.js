import JWT from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
export const isAuth = async(req,res,next)=>{
    const {token} = req.cookies;
    // validation
    if(!token){
        return res.status(403).send({
            success: false,
            message:'UnAuthorized user'
        })
    }
    const decodeData =JWT.verify(token,process.env.JWT_SECRET);
    req.user= await UserModel.findById(decodeData._id);
    next();
};