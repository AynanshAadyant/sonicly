import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadSong = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("No file path provided");

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "video",  
      folder: "songs",
    });

    fs.unlinkSync(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
    } catch (err) {
    console.error("Cloudinary Upload Error:", err);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw err;
  }
};

export const uploadCover = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("No file path provided");

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "photo",  
      folder: "covers",
    });

    fs.unlinkSync(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
    } catch (err) {
    console.error("Cloudinary Upload Error:", err);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw err;
  }
};

export {cloudinary}