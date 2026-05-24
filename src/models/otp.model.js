import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,"Email is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User ID is required"]
    },
    otpHash:{
        type:String,
        required:[true,"OTP is required"]
    },
    

},{timestamps:true})



const otpMode = mongoose.model("otp",otpSchema)

export default otpMode;