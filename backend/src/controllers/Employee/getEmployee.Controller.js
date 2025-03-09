import { db } from "../../lib/db/db.js";
import { Employee } from "../../lib/db/schema.js";
import { eq } from "drizzle-orm";    

export async function GetEmployee(req, res){
    const {id} = req.body;
    if(!id){
        return res.status(400).json({message: "Employee id is required"});
    }
    let user;
    try {
        user = await db.select().from(Employee).where(eq(Employee.id, id)).limit(1)
        if(user.length === 0){
            return res.status(401).json({message: "Employee not found"});
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({messgae: "Failed to get employee"});
    }
    return res.status(200).json({message: "Employee found", user: user[0]})
}