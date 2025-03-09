import { Admin, Employee } from "../lib/db/schema.js";
import { db } from "../lib/db/db.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import conf from "../utils/conf.js";

export async function Login(req, res){
    try {
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({message: "Email and Password are required"});
        }

        // console.log(email, password);
    
        // Check if email exists
        let role;
        let user = await db.select().from(Employee).where(eq(Employee.email, email)).limit(1)
        role = "Employee";
        if (user.length === 0) {
            user = await db.select().from(Admin).where(eq(Admin.email, email)).limit(1);
            role = "Admin";
            if (user.length === 0) {
                return res.status(401).json({ message: "Invalid Email or Password" });
            }
        }
        
        // console.log(user);
        
        let isPasswordMatch;
        try {
            isPasswordMatch = await bcrypt.compare(password, user[0].password);
        } catch (error) {
            return res.status(401).json({message: "Invalid Password"});
            
        }
    
        if(!isPasswordMatch){
            return res.status(402).json({message: "Inavlid Email or Password"});
        }
    
        const tokenData = {
            id: user[0].id,
            email: user[0].email,
            role
        }
    
        const accessToken = jwt.sign(tokenData, conf.jwt_secret, {expiresIn: "12hr"})
    
        let userData = { ...user[0], accessToken};
    
        res
            .cookie("token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .status(201)
            .json({
                message: "Login Successful",
                userData
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}