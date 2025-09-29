import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: '<your_cloud_name>',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (localPath)=>{
    try {
        if(!localPath) return null
      const response = await  cloudinary.uploader.upload(localPath,{resource_type:"auto"})
        console.log("file is uploaded on url", response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localPath) // if there is error in localPath then this will remove the file from the server
        return null;
    }
}

export {uploadOnCloudinary}

