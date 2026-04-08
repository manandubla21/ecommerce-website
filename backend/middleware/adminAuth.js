import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers;

        if(!token) {
            return res.status(401).json({success: false,message: "Not Authorized Login"});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(402).json({success:false, message: "Not Authorized Login"})
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message})
    }
}

export default adminAuth;