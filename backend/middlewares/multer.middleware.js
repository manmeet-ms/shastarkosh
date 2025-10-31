// middlewares/multer.middleware.js
import multer from "multer";

// Memory storage (send file to Cloudinary directly)
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
  },
  fileFilter(req, file, cb) {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    const isPdf = file.mimetype === "application/pdf";
    if (isImage || isVideo || isPdf) {
      cb(null, true);
    } else {
      cb(new Error("Only images, videos, or PDFs are allowed"), false);
    }
  },
});