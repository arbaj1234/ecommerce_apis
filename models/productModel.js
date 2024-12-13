import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type: 'string',
        required: [true,"product name is required"],
    },
    description :{
        type: 'string',
        required: [true,"product description is required"],
    },
    price:{
        type: 'Number',
        required: [true,"product price is required"],
    },  
    stock:{
        type:Number,
        required: [true,"product stock is required"],
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    images:[
        {
            public_id:String,
            url:String,
        },
    ],
},
{timestamps:true},
)

export const productModel=mongoose.model("products",productSchema)
export default productModel;