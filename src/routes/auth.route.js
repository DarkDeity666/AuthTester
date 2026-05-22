import {Router} from "express";
import { registerUser,userLogin } from "../controllers/auth.controller.js"
const authRouter = Router();


authRouter.post("/register",registerUser)
authRouter.post("/login",userLogin)




export default authRouter;