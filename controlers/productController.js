import productModel from "../models/productModel.js";
import cloudinary from 'cloudinary';
import { getDataUri } from "../utils/features.js";

export const getAllproductController = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.status(200).send({
            success: true,
            message: 'All products fatch successfully',
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GET ALL Products API',
            error,
        })
    }
}


export const getSingleProductController = async (req, res) => {
    try {

        const product = await productModel.findById(req.params.id)
        // validaton
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            })
        }

        res.status(200).send({
            success: true,
            message: 'product found',
            product,
        })

    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Invalid id',
            });
        }
        res.status(500).send({
            success: false,
            message: 'Error in GET singel Products API',
            error,
        })
    }
}



//create product
export const creatwProductController = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        // validation
        // if(!name || !description || !price || !category || !stock){
        //     return res.status(404).send({
        //         success: false,
        //         message:'please provide all fields'
        //     })
        // }
        if (!req.file) {
            return res.status(404).send({
                success: false,
                message: 'please provide product image',
            });
        }
        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url,
        };
        const product = await productModel.create({
            name, description, price, category, stock, images: [image],
        })
        res.status(200).send({
            success: true,
            message: 'product created successfully',
            product,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error,
        });
    }
};

// UPDATE PRODUCT

export const updateProductController = async (req, res) => {
    try {
        // find product
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }
        const { name, description, price, stock, category } = req.body
        // validate and update 
        if (name) product.name = name
        if (description) product.description = description
        if (price) product.price = price
        if (stock) product.stock = stock
        if (category) product.category = category

        await product.save()
        res.status(200).send({
            success: true,
            message: 'Product Details  update successfully'
        })

        // check file
        if (!req.file) {
            return res.status(404).send({
                success: false,
                message: 'product image not found'
            });
        }
        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }
        // save
        product.images.push(image)
        await product.save()
        response.status(200).send({
            success: true,
            message: 'product image update'
        })
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Invalid id',
            });
        }
        res.status(500).send({
            success: false,
            message: 'Error In GET UPDATE PRODUCT products API'
        })
    }
}

// update product Image
export const updateProductImageController = async (req, res) => {
    try {
        // find product
        const product = await productModel.findById(req.params.id);
        // validaton
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }
        // check product
        if (!req.file) {
            return res.status(404).send({
                success: false,
                message: 'Product image not found'
            });
        }
        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }
        // save
        product.images.push(image)
        await product.save()
        res.status(200).send({
            success: true,
            message: 'product image update'
        })
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Invalid id',
            });
        }
        res.status(500).send({
            success: false,
            message: 'Error In GET UPDATE PRODUCT products image API'
        })
    }
}

export const deleteProductImgController = async (req, res) => {
    try {

        const product = await productModel.findById(req.params.id);
        // console.log("Product Found:", product);
        // validation
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }
        // image id find
        let id = req.query.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'product image not found',
            });
        }
        // Check if the image exists in the product's images array
        let isExist = -1;
        product.images.forEach((item, index) => {
            if (item._id.toString() === id.toString()) isExist = index;

        });

        if (isExist < 0) {
            return res.status(404).send({
                success: false,
                message: 'Image not found',
            });
        }

        // DELETE PRODUCT IMAGE
        await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
        product.images.splice(isExist, 1);
        await product.save();

        return res.status(200).send({
            success: true,
            message: 'Product image deleted successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in DELETE product image API',
        });
    }
};

export const deleteProductController=async(req,res)=>{
    try {
        // find product
        const product=await productModel.findById(req.params.id);
        // validation
        if(!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }
        // find adn delete image cloudinary
//         for(let index=0; index < product.images.length; index ++){
// await cloudinary.v2.uploader.destroy(product.images[index].public_id);
//         }

for (const image of product.images) {
    await cloudinary.v2.uploader.destroy(image.public_id);
}

        await product.deleteOne();
        res.status(200).send({
            success: true,
            message:'Product deleted successfully'
        })

    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Invalid id',
            });
        }
        res.status(500).send({
            success: false,
            message: 'Error In GET delete PRODUCT products image API'
        })
    }
}