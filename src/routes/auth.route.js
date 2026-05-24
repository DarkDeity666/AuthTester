import { Router } from "express";
import { registerUser, userLogin, getMe,refreshToken,userLogout,userlogoutAll,otpVerification} from "../controllers/auth.controller.js"
const authRouter = Router();


authRouter.post("/register", registerUser)
authRouter.post("/login", userLogin)
authRouter.get("/get-me",getMe) 
authRouter.get("/refresh-token",refreshToken)
authRouter.post("/logout",userLogout)
authRouter.post("/logout-all",userlogoutAll)
authRouter.post("/verify-otp",otpVerification)

export default authRouter;