import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'address is required']
        },
        city: {
            type: String,
            required: [true, 'city is required']
        },
        country: {
            type: String,
            required: [true, 'country name is required']
        }
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, 'product name is required']
            },
            price: {
                type: Number,
                required: [true, 'product price is required']
            },
            quantity: {
                type: Number,
                required: [true, 'product quantity is required']
            },
            image: {
                type: String,
                required: [true, 'product image is required']
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            }
        }
    ],
    paymentMethod: {
        type: String,
        enum: ['COD', 'ONLINE'],
        default: 'COD'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'user id is require']
    },
    paidAt: Date,
    paymentInfo: {
        id: String,
        status: String,
    },
    itemPrice: {
        type: Number,
        required: [true, 'item price is required...................']
    },
    tax: {
        type: Number,
        required: [true, 'tax price is required']
    },
    shippingCharges: {
        type: Number,
        required: [true, 'shippingChargers is required.................']
    },
    totalAmount: {
        type: Number,
        required: [true, 'totalAmount price is required']
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'deliverd']
    },
    deliverdAt: Date,


},
    { timestamps: true });

export const orderModel = mongoose.model('orders', orderSchema)
export default orderModel;