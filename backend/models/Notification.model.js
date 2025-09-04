import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    
  },
  { timestamps: true }
);
 
export default mongoose.model("Notification", notificationSchema);
