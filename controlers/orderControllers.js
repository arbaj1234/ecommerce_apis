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

// get all orders
export const getmyordersController=async(req,res)=>{
    try {
        const orders=await orderModel.find({user:req.user._id})
        // validaton
        if(!orders){
            return res.status(404).send({
                success: false,
                message:"no orders found",
            });
        }
        res.status(200).send({
            success: true,
            message:"yours orders data",
            totalOrder:orders.length,
            orders,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in my order api',
            error,
        })
    }
}

// get singel orders 

export const singleOrderDetrailsController=async(req,res)=>{
try {
    const order=await orderModel.findById(req.params.id)
    // validaton
    if(!order){
        return res.status(404).send({
            success: false,
            message: 'Order not found',
        });
    }
    res.status(200).send({
        success: true,
        message:'your order fetched',
        order,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message:'Error in singel  order api',
        error,
    })
}
}