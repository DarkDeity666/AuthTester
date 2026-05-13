import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js"

const app = express();

//middelware
app.use(morgan("dev"))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))


//Routes
app.use("api/auth",authRouter);


export default app;