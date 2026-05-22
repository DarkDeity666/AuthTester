import app from "./src/app.js"
import dotenv from "dotenv"
import dbConnect from "./src/config/database.js"
import config from "./src/config/config.js"

dotenv.config();
dbConnect();


app.listen(config.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT}`);

})