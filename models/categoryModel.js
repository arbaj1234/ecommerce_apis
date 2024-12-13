import mongoose from "mongoose";

const categorySchema =new mongoose.Schema({
    category:{
        typeof: 'string',
        required: [true,"category is required"],
    },
},
{timestamps:true}
);

const categoryModel=mongoose.model('Category',categorySchema);
export default categoryModel
