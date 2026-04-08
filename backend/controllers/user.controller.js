import {user} from '../models/user.model.js'
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//route for user login
const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success: false, message: "User not exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {
            const token = createToken(user._id);

            res.status(200).json({success:true,token})
        } else {
            return res.status(400).json({success:false, message:error.message})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message})
    }
}

//route for user registeration
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        const exists = await User.findOne({email});

        if(exists) {
            return res.json({success: false, message: "User already exists"});
        }

        //validate email and strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"})
        }
        if(password.length < 8) {
            return res.json({success: false, message: "Enter strong password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            password:hashedPassword,
            email
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.status(200).json({success: true, token})
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message})
    }
    res.json({message: "Api Working"})
}

//route for admin login
const adminLogin = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
        } else {
            res.status(401).json({success: false, message: "Invalid Credentials",email,password})
        }
    } catch (error) {
        res.status(401).json({success: false, message: error.message})
    }
}

export {loginUser, registerUser, adminLogin}