import {order} from '../models/order.model.js';
import {user} from '../models/user.model.js'
import razorpay from 'razorpay'

const currency = 'inr';
const deliveryCharge = 10;

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

const placeOrder = async (req,res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            address,
        }

        const newOrder = new order(orderData);
        await newOrder.save();

        await user.findbyIdAndUpdate(userId, {cartData: {}})
        
        res.status(200).json({success: true, message: "Order Placed"})
    } catch (error) {
        console.log(error);
        res.status(402).json({success: false, message: error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        const {userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log(orderInfo);

        if(orderInfo.status === 'paid') {
            await order.findbyIdAndUpdate(orderInfo.receipt,{payment:true});
            await user.findbyIdAndUpdate(userId,{cartData:{}});

            res.json({success:true, message: "Payment Successfull"})
        } else {
            res.json({success: false, message: "Payment Failed"})
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({success: false, message: error.message})
    }
}

const placeOrderUsingRazorpay = async (req,res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
            address,
        }

        const newOrder = new order(orderData);
        await newOrder.save();

        const options = {
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if(error) {
                console.log(error);
                return res.status(403).json({success: false, message: error.message})
            }

            res.json({success: true, order})
        })
    } catch (error) {
        console.log(error);
        res.status(403).json({success: false, message: error.message})
    }
}

//all orders from admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await order.find({});
        res.status(200).json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.status(402).json({success: false, message: error.message})
    }
}

const userOrders = async (req,res) => {
    try {
        const {userId} = req.body;

        const orders = await order.find({userId})

        res.status(200).json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.status(402).json({success: false, message: error.message})
    }
}

const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;

        await order.findbyIdAndUpdate(orderId,{
            status
        })
        
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        console.log(error);
        res.status(402).json({success: false, message: error.message})
    }
}

export {placeOrder, placeOrderUsingRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay}