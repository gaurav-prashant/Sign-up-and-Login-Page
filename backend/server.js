import dotenv from "dotenv";
dotenv.config();
import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import { User } from "./models/userModel.js"
import bcrypt from "bcryptjs"
import cors from 'cors'
import "./config/passport.js"


const app = express()
console.log("ENV:", process.env.MONGO_URI);

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/auth', authRoute)
app.use('/user', userRoute)

// http://localhost:8000/user/register


app.listen(PORT, async () => {
    connectDB()
    console.log(`Server is listening at port ${PORT}`);  

    try {
        const hashedPassword = await bcrypt.hash("123456", 10);
        await User.updateOne(
             { email: "debug@gmail.com" },
             { username: "Debug Admin", email: "debug@gmail.com", password: hashedPassword, isVerified: true },
             { upsert: true }
        );
        console.log("DEBUG USER READY: debug@gmail.com / 123456");
    } catch(e) {
        console.log("Failed to create debug user", e);
    }
})