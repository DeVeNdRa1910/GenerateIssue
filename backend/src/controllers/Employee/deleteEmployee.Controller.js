import { db } from '../../lib/db/db.js'
import { Employee } from '../../lib/db/schema.js'
import { eq } from 'drizzle-orm';

export async function DeleteEployee(req, res){
    try {
        const { id } = req.body;

        if(!id){
            return res.status(400).json({message: "Id of Employee is required"})
        }

        // Check user exist or not
        try {
            const employee = await db.select().from(Employee).where(eq(Employee.id, id)).limit(1);
            if( employee.length ==0){
                return res.status(200).json({message: "Employee not found"});
            }
        } catch (error) {
            console.log(error);
            return res.status(200).json({message: "Employee not found"});
        }

        // try to delete employee from db
        try {
            await db.delete(Employee).where(eq(Employee.id, id));
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "Employee not Deleted"});
        }

        return res.status(200).json({message: "Employye Deleted Successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"})
    }
}