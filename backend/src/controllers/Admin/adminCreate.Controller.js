import { Admin } from "../../lib/db/schema.js";
import { db } from "../../lib/db/db.js";
import bcrypt from "bcryptjs";
import path from "path";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export async function AdminCreate(req, res) {
    const {fname, lname, email, password, role} = req.body;
    const image = req.files?.AdminImage;
    if(!image){
        return res.status(400).json({message: "Missing image File"});
    }
    const fileName = `${fname}.${image[0].originalname.split(".").pop()}`;
    const filePath = path.resolve(image[0].destination, fileName);
    let imageUploadResult;

    try {
        imageUploadResult = await cloudinary.uploader.upload(filePath,{
            timeout: 60000,
            filename_override: fileName,
            folder: "admins",
            resource_type: "auto"
        }, (error, result)=>{
            if(error){
                console.log("Error while uploading on clpudinary    ",error);
                return res.status(401).json({message: "Error uploading to Cloudinary"});
            }
            return result;
        })
    } catch (error) {
        return res.status(401).json({message: error.message})
    }

    // create admin in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await db.insert(Admin).values({
            fname,
            lname,
            email,
            password: hashedPassword,
            image: imageUploadResult.secure_url,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to save the data in the database" });
    }

    try {
        await fs.promises.unlink(filePath)
    } catch (error) {
        return res.status(402).json({message: "Failed to delete the file in file system"});
    }

    return res.status(201).json({ message: "Admin created successfully" });

}