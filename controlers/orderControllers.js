import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const createOrderController=async(req,res)=>{
    try {
        const{shippingInfo,orderItems,paymentMethod,paymentInfo,itmePrice,tax,shippingCharger,totalAmount}=req.body
        // validation
        // if(!shippingInfo || !orderItems || !paymentMethod || !paymentInfo || itmePrice || !tax || !shippingCharger || !totalAmount)
        //     return res.status(400).send({
        //    success: false,
        //    message:'please provide all fields'
        //     })
            await orderModel.create({
                user:req.user._id,
                shippingInfo,
                orderItems,
                paymentMethod,
                paymentInfo,
                itmePrice,
                tax,
                shippingCharger,
                totalAmount,

            })
            // stock update
            for(let i = 0; i < orderItems.length; i++) {
                // find product
                const product=await productModel.findById(orderItems[i].product);
                product.stock =orderItems[i].quantity; 
            }
            res.status(200).send({
                success: true,
                message:'order placed successfully'
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error creating order api',
            error,
        })
    }
}