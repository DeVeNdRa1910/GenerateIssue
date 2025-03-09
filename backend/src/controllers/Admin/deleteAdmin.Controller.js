import { db } from "../../lib/db/db.js";
import { Admin } from "../../lib/db/schema.js";
import { eq } from "drizzle-orm";

export async function DeleteAdmin(req, res){
    try {
        const { id } = req.res;

        if(!id){
            return res.status(400).json({message: "Id of Admin is required"});
        }

        try {
            await db.select().from(Admin).where(eq(Admin.id, id)).limit(1);
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "Admin not found with that id"});
        }

        try {
            await db.delete(Admin).where(eq(Admin.id, id));
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Failed to delete Admin due to server Error!"});
        }

        return res.status(200).json({message: "Admin Delete from DB successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to delete Admin due to server Error!"});
    }
}