import { response } from 'express';
import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {
    const {token} = req.headers;

    if(!token) {
        return res.status(402).json({success:false, message: "Not Authenticated Login Again"})
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = tokenDecoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message})
    }
}

export default authUser;