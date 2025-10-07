import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const authMiddleware = async (req,res,next)=>{
    try {
         const authHeader = req.headers.authorization
        console.log(authHeader, "token auth header")
        
         if(!authHeader || !authHeader.startsWith("Bearer ")){
             return res.status(401).json({
            success:false,
            message:"Token is not present"
        })
         }

         const token = authHeader.split(" ")[1];
         console.log(token)
  

    const decoded =  jwt.verify(token , process.env.JWT_SECRET)

    if(!decoded){
         return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    req.user = decoded
    next();
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
   
}