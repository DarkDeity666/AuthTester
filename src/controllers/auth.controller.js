import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import sessionModel from "../models/session.model.js"



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

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword
        })

        const refreshToken = jwt.sign({id:user._id},{
            expireIn:"7d"
        })

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.create({
            user:user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent:req.headers["user-agent"]
        })

        const accessToken = jwt.sign({
            sessionId:session._id,
            id: user._id

        }, config.JWT_SECRET, {
            expiresIn: "15m"
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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required..!"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Password or email"
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const isPasswordValid = user.password === hashedPassword;

        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Username or Password..!"
            })
        }
        const refreshToken = jwt.sign({
            id:user._id
        },config.JWT_SECRET,{
            expiresIn:"7d"
        })
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const session = await sessionModel.create({
            user:user._id,
            refreshTokenHash,
            ip:req.ip,
            userAgent:req.headers["user-agent"]
        })
        const accessToken = jwt.sign({
            sessionId:session._id,
            id:user._id
        },config.JWT_SECRET,{
            expiresIn:"15m"
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json({
            message:"User Logged in successfully"
        })
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

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked:false
        })
        if(!session){
            return res.status(401).json({
                message:"Invlid refresh token"
            })
        }

        const accessToken = jwt.sign({id:decodedToken},config.JWT_SECRET,{
            expiresIn:"15m"
        })
        const newRefreshToken = jwt.sign({
            id:decodedToken
        },config.JWT_SECRET,{
            expireIn:"7d"
        })

        const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();

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

async function userLogout(req,res){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(400).json({
                message:"refresh token not found....!"
            })
        }
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked:false
            
        })
        if(!session){
            return res.status(400).json({
                message:"Invalid refresh Token...!"
            })
        }
        session.revoked = true;
        await session.save()
        res.clearCookie("refreshToken")
        return res.status(201).json({
            message:"User logged out successfully..!"
        })

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

async function userlogoutAll(req,res){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(400).json({
                message:"refresh token not found"
            })
        }
        const decodedToken = jwt.verify(refreshToken,config.JWT_SECRET);
        await sessionModel.updateMany({
            user:decodedToken.id,
            revoked:false
        },{
            revoked:true
        })
        res.clearCookie("refreshToken");
        return res.status(201).json({
            message:"Successfully logged out from all the devices...!"
        })


        
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong...!!"
        })
    }
}

export { registerUser, userLogin, getMe ,refreshToken,userLogout,userlogoutAll}