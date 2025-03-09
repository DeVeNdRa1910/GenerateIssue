// all ther user who have same admin referance , get all of them
import { db } from "../../lib/db/db.js";
import { Employee } from "../../lib/db/schema.js";
import { eq } from "drizzle-orm";

export async function GetAdminUsers(req, res){
    try {
        const {id} = req.body;
        
        if(!id){
            return res.status(400).json({message: "Admin id is required"});
        }
        let users;
        try {
            users = await db.select().from(Employee).where(eq(Employee.adminId, id));
            if(users.length === 0){
                return res.status(401).json({message: "No Employee found"});
            }
        } catch (error) {
            console.log("Here", error);
            return res.status(500).json({message: "Failed to get Admin users"});
        }
        return res.status(200).json({message: "Admin users found", users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }

    

}