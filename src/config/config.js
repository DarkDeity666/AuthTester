import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI || !process.env.PORT){
    throw new Error("Please add variable to env file")
}

if(!process.env.JWT_SECRET){
    throw new Error("Please add variable to env file")
}
const config = {
    MONGO_URI : process.env.MONGODB_URI,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
}

export default config;