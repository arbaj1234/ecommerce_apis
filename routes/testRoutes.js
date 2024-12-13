import express from 'express';
import { testController } from '../controlers/testController.js';


// routers object 
const router = express.Router();

// routes 
router.get('/test',testController)


// export
export default router;