import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

async function registerUser(req, res) {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(401).json({
                message: "All fields are required",
            })
        }
        const isUserExists = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if (isUserExists) {
            return res.status(409).json({
                message: "User already exists"
            })
        }
        // const hashedPassword =  await bcrypt.hash(password,10)
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword
        })

        const accessToken = jwt.sign({
            id: user._id

        }, config.JWT_SECRET, {
            expiresIn: "15m"
        })
        const refreshToken = jwt.sign({id:user._id},{
            expireIn:"7d"
        })
        
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,secure:true,sameSite:"strict",
            maxAge: 7*24*60*60*1000
        })
        return res.status(201).json({
            message:"User Registered Successfully..!"
        })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


async function userLogin(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({
                message: "All fields are required..!"
            })
        }

        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


async function getMe(req,res){
    try{
      const token = req.headers.authorization?.split(" ")[1];
      if(!token){
        return res.status(400).json({
            message:"Token Not Found"
        })
      }
       const decodedToken = jwt.verify(token,config.JWT_SECRET)
       const user = await userModel.findById(decodedToken.id)
       if(!user){
        return res.status(401).json({
            message:"user not found"
        })}
        console.log(user)
        return res.status(200).json({
            message:"user found"
        })

    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}


async function refreshToken(req,res){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(400).json({
                message:"refresh token not found...!"
            })
        }
        const decodedToken = jwt.verify(refreshToken,config.JWT_SECRET);
        const accessToken = jwt.sign({id:decodedToken},config.JWT_SECRET,{
            expiresIn:"15m"
        })
        const newRefreshToken = jwt.sign({
            id:decodedToken
        },config.JWT_SECRET,{
            expireIn:"7d"
        })
        res.cookie("refreshToken",newRefreshToken,{
            httpOnly:true,secure:true,sameSite:"strict",
            maxAge: 7*24*60*60*1000 // this is calculation for 7 days
        })
        return res.status(201).json({
            message:"Token Refreshed Successfully...!",
            accessToken
        })
        
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
export { registerUser, userLogin, getMe ,refreshToken}