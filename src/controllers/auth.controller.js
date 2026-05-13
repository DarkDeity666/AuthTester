import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"


async function registerUser(req,res){
    try{
        const {email,username,password} = req.body;
        if(!email||username||password){
            res.status(401).json({
                message:"All fields are required",
            })
        }
        const isUserExists = await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        });
        if(isUserExists){
            res.status(409).json({
                message:"User already exists"
            })
        }
        // const hashedPassword =  await bcrypt.hash(password,10)
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword
        })

    }catch(err){
        throw new error(err.message)
        console.log(err);
    }
}


export {registerUser}