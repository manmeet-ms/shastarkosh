// utils/upload.js
import cloudinary from "../../backend/config/cloudinary.js";
import { Readable } from "stream";

// Utility to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        timeout: 60000,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Convert buffer to stream
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export const uploadImage = async (fileBuffer, folder) => {
  const result = await uploadToCloudinary(fileBuffer, folder, "image");
  return { url: result.secure_url, public_id: result.public_id };
};

export const uploadPdf = async (fileBuffer, folder) => {
  const result = await uploadToCloudinary(fileBuffer, folder, "raw"); // 'raw' for PDF
  return { url: result.secure_url, public_id: result.public_id };
};

export const uploadVideo = async (fileBuffer, folder) => {
  const result = await uploadToCloudinary(fileBuffer, folder, "video");
  return { url: result.secure_url, public_id: result.public_id };
};