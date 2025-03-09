import { db } from "../../lib/db/db.js";
import { Employee, Admin, issue } from "../../lib/db/schema.js";
import { sql, eq } from "drizzle-orm";

export async function GetIssueByAdmin(req, res){
    const {id} = req.body;
    if(!id){
        return res.status(401).json({message: "Admin id is required"});
    }
    try {
        const issues = await db
            .select({
                issueId: issue.id,
                title: issue.title,
                description: issue.description,
                status: issue.status,
                employeeId: issue.employeeId,
                employeeName: sql`${Employee.fname} || ' ' || ${Employee.lname}`, // Combine first and last name
            })
            .from(issue)
            .leftJoin(Employee, eq(issue.employeeId, Employee.id)) // Join Employee table
            .leftJoin(Admin, eq(Employee.adminId, Admin.id)) // Join Admin table
            .where(eq(Admin.id, id)); // Filter by Admin ID

        console.log(issues);

        return res.status(200).json({message: "Getting issus successfully", issues})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"})
    }
}