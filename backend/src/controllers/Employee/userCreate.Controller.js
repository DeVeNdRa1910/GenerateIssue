import { Employee, Admin } from "../../lib/db/schema.js";
import { db } from "../../lib/db/db.js";
import path from "path";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs";
import { sql, eq } from "drizzle-orm";


export async function UserCreate(req, res) {
  const { fname, lname, email, password, role, adminId } = req.body;
  
  // console.log("This is Files " , req.files);
  const image = req.files?.EmployeeImage;
  // console.log(image);
  if (!image) {
    console.log("Missing image file");
    return res.status(404).json({ message: "Missing image file" });
  }

  const fileName = `${fname}.${image[0].originalname.split(".").pop()}`;
  const filePath = path.resolve(image[0].destination, fileName);
  let imageUploadResult;
  
  try {
    imageUploadResult = await cloudinary.uploader.upload(filePath, {
      timeout: 60000,
      filename_override: fileName,
      folder: "employees",
      resource_type: "auto",
    },(error, result) => {
        if (error) {
          throw new Error("Error uploading to Cloudinary");
        }
        return result;
    });
    // console.log(imageUploadResult);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to save the file in file fs" });
  }

  //create Employee in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await db.insert(Employee).values({
      fname,
      lname,
      email,
      password: hashedPassword,
      image: imageUploadResult.secure_url,
      adminId
    })

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to save the data in the database" });
  }

  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Failed to delete temporary files" });
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
