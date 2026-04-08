import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import user from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.route.js';

//App config
const app = express()
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user', user);
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

//start express server
app.listen(PORT, ()=> console.log('Server started on PORT : '+ PORT))
