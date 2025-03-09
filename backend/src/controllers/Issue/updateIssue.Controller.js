import { db } from "../../lib/db/db.js";
import { issue } from "../../lib/db/schema.js";
import { eq } from "drizzle-orm";

export async function UpdateIssue(req, res){
    try {
        const { id, status } = req.body;

        if(!id || !status){
            return res.status(400).json({message: "Id of issue and status both are required"})
        }

        try {
            await db.select().from(issue).where(eq(issue.id, id)).limit(1);
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "Can't find an Issue"})
        }

        // status = processing or complete

        try {
            await db.update(issue).set({status}).where(eq(issue.id, id))
            return res.status(200).json({message: "Status of Issue is successfully updated"})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Can't Update Issue due server error"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Can't Update Issue due server error"});
    }
}