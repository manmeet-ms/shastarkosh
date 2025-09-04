import mongoose from "mongoose";

const resourceMaterialSchema = new mongoose.Schema(
  {
    
  },
  { timestamps: true }
);
 
export default mongoose.model("ResourceMaterial", resourceMaterialSchema);
