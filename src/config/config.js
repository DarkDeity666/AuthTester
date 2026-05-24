import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI || !process.env.PORT){
    throw new Error("Please add variable to env file - mongodb uri and port")
}

if(!process.env.JWT_SECRET){
    throw new Error("Please add variable to env file - jwt secert")
}
if(!process.env.AUTH_REFRESH_TOKEN){
    throw new Error("Please add variable to env file - refrese token")
}
if(!process.env.AUTH_ACCESS_TOKEN){
    throw new Error("Please add variable to env file - access token")
}
if(!process.env.AUTH_USER){
    throw new Error("Please add variable to env file - app user")
}
if(!process.env.CLIENT_ID || !process.env.CLIENT_SECRET){
    throw new Error("Please add variable to env file - auth variables")
}

const config = {
    MONGO_URI : process.env.MONGODB_URI,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    AUTH_REFRESH_TOKEN: process.env.AUTH_REFRESH_TOKEN,
    AUTH_ACCESS_TOKEN: process.env.AUTH_ACCESS_TOKEN,
    AUTH_USER: process.env.AUTH_USER,
    CLIENTID : process.env.CLIENT_ID,
    CLIENTSECRET : process.env.CLIENT_SECRET,
    REFRESH_TOKEN : process.env.AUTH_REFRESH_TOKEN,
    ACCESS_TOKEN : process.env.AUTH_ACCESS_TOKEN,
}

export default config;