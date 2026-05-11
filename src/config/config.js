import dotenv from "dotenv";

dotenv.config();

const config = {
    MONGO_URI : process.env.MONGODB_URI,
    PORT : process.env.PORT || 3001,
}

export default config;