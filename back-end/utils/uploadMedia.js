import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadMedia(file) {
    const buffer = file?.buffer || Buffer.from(await file.arrayBuffer());

    const resourceType = file.mimetype.startsWith("video/") ? "video" : "image";

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                folder: "chat_app",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(buffer);
    });

    return uploadResult;
}
