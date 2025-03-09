import { Employee, Admin } from "../../lib/db/schema.js";
import { db } from "../../lib/db/db.js";
import path from "path";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs";
import { sql, eq } from "drizzle-orm";


export async function UserCreate(req, res) {
  const { fname, lname, email, password, role, adminId, imageUrl } = req.body;
  
  try {
    await db.insert(Employee).values({
      fname,
      lname,
      email,
      password,
      image: imageUrl,
      adminId
    })

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to save the data in the database" });
  }

  // assign that user to the admin and get employeeId and push it to the admin table employeeIds array
  try {
    const [lastInsertedEmployee] = await db
      .select({ id: Employee.id })
      .from(Employee)
      .orderBy(sql`${Employee.id} DESC`)
      .limit(1);
    console.log(lastInsertedEmployee); 
   
    await db
      .update(Admin)
      .set({
        employeeIds: sql`array_append("employeeIds", ${lastInsertedEmployee.id})`,
      })
      .where(eq(Admin.id, adminId));
  } catch (error) {
    console.log(error);
    return res.status(500)
              .json({message: "Employee created but Failed to assign the employee to the admin"});
  }

  return res.status(201).json({ message: "Employee created successfully" });
}
