import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

// CREATE CREATECATEGORY
export const createCategory =async(req,res)=>{
    try {
        const{ category}=req.body;
        // validation
        if(!category){
            return res.status(404).send({
                success: false,
                message:'please provide category name',
            })
        }
        await categoryModel.create({category});
        res.status(200).send({
            success: true,
            message:`${category} category created successfully`,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In create Cat API',
        })
    }
}


export const getAllCategoryController=async(req,res)=>{
    try {
        const categories=await categoryModel.find({});
        res.send({
            success:true,
            message:'category fetch successfully',
            // totalCat:categories.length,
            categories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In GET All cat Api',
        })
    }
}

export const deleteCategoryController=async(req,res)=>{
    try {
        // find category
        const category = await categoryModel.findById(req.params.id)
        // validation
        if(!category){
            return res.status(404).send({
                success:false,
                message:'category not found'
            })
        }
        // find product with this category id
        const products=await productModel.find({category:category._id})
        // update product caategory
        for(let i=0; i<products.length; i++){
            const product = products[i];
            product.category=undefined;
            await product.save();
        }
        // save
        await category.deleteOne();
        res.status(200).send({
            success: true,
            message:'category deleted successfully',
        })
    } catch (error) {
        console.log(error);
        // cost error || OBJECT ID
        res.status(500).send({
            success:false,
            message:'Error In DELETE api'
        })
    }
}

export const updateCategoryController=async(req,res)=>{

    try {
        // find category
        const category=await categoryModel.findById(req.params.id);
        // validation
        if(!category){
            return res.status(404).send({
                success: false,
                message:'Category Not Found',
            });
        }
        // get new category
        const {updatedCategory}=req.body;
        // find product with this category id
        const products=await productModel.find({category:category._id})
           // update product caategory
        for(let i=0; i < products.length; i++){
            const product = products[i];
            product.category=updatedCategory;
            await product.save();
        }
        if(updatedCategory)category.category=updatedCategory
        // save
        await category.save();
        res.status(200).send({
            success: true,
            message:'category update successfully',
        })
    } catch (error) {
        console.log(error);
        // cost error || OBJECT ID
        res.status(500).send({
            success:false,
            message:'Error In update api'
        })
    }
}