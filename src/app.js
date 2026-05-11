import express from "express";
import morgan from "morgan";
// import dotenv from "dotenv"


const app = express();
// dotenv.config();
app.use(morgan("dev"))





export default app; 