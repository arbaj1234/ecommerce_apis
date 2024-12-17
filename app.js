import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/UserRouters.js';
import ProductRouters from './routes/productRoutes.js';
import categoryRouters from './routes/categoryRoutes.js';
import orderRouters from './routes/orderRouters.js';

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
connectDb()




// middlewar
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());



//router
app.use('/api/v1/', testRoutes)
app.use('/api/v1/user', userRoutes)
app.use("/api/v1/product", ProductRouters)
app.use("/api/v1/createCategory",categoryRouters)
app.use("/api/v1/order",orderRouters)



//port
const PORT = process.env.PORT || 5050

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Welcome to node app.js</h1>')
});

app.listen(PORT, () => {
    console.log(`server runnimg on PORT ${PORT}`);
})

