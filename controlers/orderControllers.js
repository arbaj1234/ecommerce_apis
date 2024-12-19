// import { strip } from "colors/index.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
// import stripe from "stripe";

export const createOrderController = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentMethod, paymentInfo, itemPrice, tax, shippingCharges, totalAmount } = req.body
        // validation
        // if(!shippingInfo || !orderItems || !paymentMethod || !paymentInfo || itmePrice || !tax || !shippingCharger || !totalAmount)
        //     return res.status(400).send({
        //    success: false,
        //    message:'please provide all fields'
        //     })
        console.log("req.body", req.body)
        await orderModel.create({
            user: req.user._id,
            shippingInfo,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount,

        })
        // stock update
        for (let i = 0; i < orderItems.length; i++) {
            // find product
            const product = await productModel.findById(orderItems[i].product);
            product.stock = orderItems[i].quantity;
        }
        res.status(200).send({
            success: true,
            message: 'order placed successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating order api',
            error,
        })
    }
}

// get all orders
export const getmyordersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id })
        // validaton
        if (!orders) {
            return res.status(404).send({
                success: false,
                message: "no orders found",
            });
        }
        res.status(200).send({
            success: true,
            message: "yours orders data",
            totalOrder: orders.length,
            orders,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in my order api',
            error,
        })
    }
}

// get singel orders 

export const singleOrderDetrailsController = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        // validaton
        if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'your order fetched',
            order,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in singel  order api',
            error,
        })
    }
}

// ACCEPT PAYMENTS
export const paymentsController = async (req, res) => {
    try {
        // get ampunt 
        const { totalAmount } = req.body;
        // validation 
        if (!totalAmount) {
            return res.status(404).send({
                success: false,
                message: 'Total amount is required',
            });
        }
        const { client_secret } = await Stripe.paymentIntents.create({
            amount: Number(totalAmount * 100),
            currency: "usd",
        });
        res.status(200).send({
            success: true,
            client_secret,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GET UPDATE product api',
            error,
        })
    }
}