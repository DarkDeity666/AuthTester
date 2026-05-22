import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
const app = express();

//middelware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser())

//Routes
app.use("/api/auth",authRouter);


export default app;