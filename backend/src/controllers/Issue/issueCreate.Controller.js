import fs from "fs";
import { issue } from "../../lib/db/schema.js";
import { db } from "../../lib/db/db.js";
import path from "path";
import cloudinary from "../../config/cloudinary.js";

export async function CreateIssue(req, res){
    const {title, description, employeeId} = req.body;

    const image = req.files?.IssueImage;
    if (!image) {
        console.log("Missing image file");
        return res.status(404).json({ message: "Missing image file" });
    }

    const fileName = `${title}.${image[0].originalname.split(".").pop()}`;
    const filePath = path.resolve(image[0].destination, fileName);

    let imageUploadResult;
    try {
        imageUploadResult = await cloudinary.uploader.upload(filePath, {
            timeout: 60000,
            filename_override: fileName,
            folder: "issues",
            resource_type: "auto",
        }, (error, result)=>{
            if(error){
                return res.status(500).json({message: "Failed to save the file in file cloudinary"});
            }
            return result;
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to save the file in file cloudinary"});
    }

    try {
        await db.insert(issue).values({
            title,
            description,
            image: imageUploadResult.secure_url,
            employeeId
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to create issue"});
    }

    try {
        
        await fs.promises.unlink(filePath)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to delete file locally"});
    }
    res.status(201).json({message: "Issue create successfully"});
}