
import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required :[true,"Username is required"],
        unique: true,

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique: true,
        lowercase:true,
        trim:true,
    },
    password:{
        type: String,
        required:[true,"password is required"]
    },
    verified:{
        type: Boolean,
        default: false
    }
    
})


const userModel = mongoose.model("users",userSchema);

export default userModel;