import app from "./src/app.js" 
import dotenv from "dotenv"
import dbConnect from "./src/config/database.js"


dotenv.config();
dbConnect();


app.listen(process.env.POR || 3001,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);

})