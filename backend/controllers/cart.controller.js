import {user} from '../models/user.model.js'

const addToCart = async (req,res) => {
    try {
        const {userId, itemId, size} = req.body;

        const userData = await user.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await user.findByIdAndUpdate(userId, {cartData});
        res.status(200).json({success: true, message: "added to cart"})
    } catch (error) {
        console.log(error);
        res.status(402).json({success: false, messge: error.message});
    }
}

const updateCart = async (req,res) => {
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await user.findByIdAndUpdate(userId, {cartData});
        res.status(200).json({success: true, message: "Cart Data updated"})
    } catch (error) {
        console.log(error);
        res.status(402).json({status: false, messge: error.message});
    }
}

const getUserCart = async (req,res) => {
    try {
        const {userId, itemId} = req.body;

        const userData = await user.findById(userId)
        let cartData = await userData.cartData;

        res.status(200).json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.status(402).json({status: false, messge: error.message});
    }
}

export {addToCart, updateCart, getUserCart};