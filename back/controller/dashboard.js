import User from "../models/User.js"

const dashBoard = async (req,res)=>{
    try {

         return res.status(200).json({
            success:false,
            data:req.user,
            message:"Token is not present"
        })
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export default dashBoard