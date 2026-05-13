import express, { json } from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js"


const app = express();
//middelware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded())

app.use("api/auth",authRouter);


export default app;