import { Router } from "express";
import { registerUser, userLogin, getMe,refreshToken } from "../controllers/auth.controller.js"
const authRouter = Router();


authRouter.post("/register", registerUser)
authRouter.post("/login", userLogin)
authRouter.get("/get-me",getMe) 
authRouter.get("/refresh-token",refreshToken)



export default authRouter;