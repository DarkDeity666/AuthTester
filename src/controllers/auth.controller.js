import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

async function registerUser(req, res) {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(401).json({
                message: "All fields are required",
            })
        }
        const isUserExists = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if (isUserExists) {
            return res.status(409).json({
                message: "User already exists"
            })
        }
        // const hashedPassword =  await bcrypt.hash(password,10)
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword
        })

        const generatedToken = jwt.sign({
            id: user._id

        }, config.JWT_SECRET, {
            expiresIn: "1d"
        })

        return res.status(201).json({
            message: "User registered successfully",
            token: generatedToken
        })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


async function userLogin(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({
                message: "All fields are required..!"
            })
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        if (user.password !== hashedPassword) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const generatedToken = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({
            message: "Login successful",
            token: generatedToken
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export { registerUser, userLogin }