import mongoose from "mongoose";
import config from "./config.js";


async function dbConnect(){
    try{
        const connectionInstance = await mongoose.connect(config.MONGO_URI);
        console.log(`the database server is connected..!`)
    }
    catch(error){
        console.log(`the database server is not connected..!`)
    }
}


export default dbConnect;
