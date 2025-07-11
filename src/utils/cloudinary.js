import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    console.log("Uploading file to Cloudinary:", localfilePath);
    if (!localfilePath) {
      throw new Error("No file path provided for upload");
    }
    const response = await cloudinary.uploader.upload(localfilePath);
    console.log("File uploaded successfully to Cloudinary", response);
    response.url;
    return response; // Ensure the URL is secure
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localfilePath); // Delete the file if upload fails
    return null;
  }
};

export { uploadOnCloudinary };
