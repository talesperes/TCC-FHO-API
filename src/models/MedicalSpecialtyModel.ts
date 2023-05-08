import mongoose from "mongoose";

export interface IMedicalSpecialty extends Document {
  name: string;
}

const MedicalSpecialtySchema = new mongoose.Schema<IMedicalSpecialty>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IMedicalSpecialty>("MedicalSpecialty", MedicalSpecialtySchema);
