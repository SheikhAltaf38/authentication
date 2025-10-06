import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role = "USER" } = req.body;
    // console.log(req.body)
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is Missing",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const gensalt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, gensalt);

    const newUser = await User.create({
      username :username,
      email :email,
      password: hashPass,
      role :role,
    }).catch((err)=>{
        console.log(err)
    });

    if(!newUser){
        return res.status(500).json({
            success:false,
            message:"cannot create user"
        })
    }
   const token = await generateToken({ newUser }, res);

    return res.status(200).json({
      success: true,
      token : token,
      message: "User created ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interna;l server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is Missing",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const isTruePass = await bcrypt.compare(password, user.password);

    if (!isTruePass) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

 const token =   await generateToken({ user }, res);

    return res.status(200).json({
      success: true,
      token : token,
      message: "Login Successfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interna;l server error",
    });
  }
};
