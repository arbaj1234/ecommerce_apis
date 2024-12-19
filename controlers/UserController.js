import userModel from '../models/userModel.js';
import cloudinary from 'cloudinary';
import { getDataUri } from '../utils/features.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, city, country, phone } = req.body;

        // validation
        if (!name || !email || !password || !address || !city || !country || !phone) {
            return res.status(400).send({
                success: false,
                message: "please provide All fields",
            })
        }
        // check exisitingUser user
        const exisitingUser = await userModel.findOne({ email });
        // validation
        if (exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "email already token"
            })
        }

        const user = await userModel.create({
            name, email, password, address, city, country, phone,
        });
        res.status(201).send({
            success: true,
            message: "Registration success,please login",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration API",
            error,
        })


    }
}




export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Add Email OR Password"
            })
        };
        // check user
        const user = await userModel.findOne({ email })
        // user validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        // check password
        const isMatch = await user.comparePassword(password);
        // validation pass
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'invalid credentials'
            });
        }
        const token = user.generateToken();
        res.status(200).cookie('token', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
        }).send({
            success: true,
            message: 'login successfuly',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error,
        })
    }


}

export const getUserProfileController = async (req, res) => {
    try {
        // const { name, email, address, city, country, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User profile fetched successfully',
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getUserProfileController",
            error,
        })
    }

};

export const logoutcontroller = async (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
        });

        res.status(200).send({
            success: true,
            massage: 'Logout successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            massage: 'Error in Logout API',
            error,
        })
    }
}

// UPDATE USER PROFILE
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, address, city, country, phone } = req.body;
        const user = await userModel.findByIdAndUpdate(req.user._id, { name, email, address, city, country, phone }, { new: true });
        console.log(user)
        res.status(200).send({
            success: true,
            message: "User profile updated successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Profile updated API ',
            error,
        })
    }
}

export const UpdatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        const { oldPassword, newPassword } = req.body;
        // validation
        if (!oldPassword || !newPassword) {
            return res.status(404).send({
                success: false,
                message: 'please provide old or new password'
            })
        }
        // old password check
        const isMatch = await user.comparePassword(oldPassword)
        // validations
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: 'invalid old password',
            });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'password updated successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error update password API",
            error,
        })
    }
}


// Update user profile photo

export const updateProfilePicController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        console.log("user", user);
        // file get from client photo
        const file = getDataUri(req.file);
        // console.log("file get from client" , file);
        // delete prev image
        // const demo = await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
        // console.log("delete from cloudinary" , demo)


        // Upload new profile picture to Cloudinary
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        user.profilePic = {
            public_id: cdb.public_id,
            url: cdb.secure_url,
        };
        // save func
        await user.save()
        res.status(200).send({
            success: true,
            message: 'profile picture successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update profile picture API',
            error: error.message
        })
    }

}