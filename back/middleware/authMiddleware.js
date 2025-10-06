import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const authMiddleware = async (req,res,next)=>{
    const token = req.headers.authorization?.slice(0,7);
    if(!token) {
         return res.status(401).json({
            success:false,
            message:"Token is not present"
        })
    }

    const decoded = await jwt.verify(token , process.env.JWT_SECRET)

    if(!decoded){
         return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    req.user = decoded
    next();
}