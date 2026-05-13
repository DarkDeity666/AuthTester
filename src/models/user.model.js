import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required :[true,"Username is required"],
        unique: true,
        // trim: true
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
        requried:[true,"password is required"],
        min:8,
        max:20
    }
    
})


const userModel = mongoose.model("users",userSchema);

export default userModel;