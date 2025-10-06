import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();


const generateToken = async(user ,res)=>{
    try {
         const token = await jwt.sign({id:user._id,name:user.username},process.env.JWT_SECRET,{
    expiresIn:"20m"
  });
  

  if(!token){
    return res.status(500).json({
        success:false,
        message:"error in generating token"
    })
  }

 
  return token
    } catch (error) {
         return res.status(500).json({
        success:false,
        message:"error in generating token"
    })
    }
}

export default generateToken;