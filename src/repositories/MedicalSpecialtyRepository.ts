import mongoose from "mongoose";
import MedicalSpecialtyModel, { IMedicalSpecialty } from "../models/MedicalSpecialtyModel";

export interface IMedicalSpecialtyRepository {
  createMedicalSpecialty(data: IMedicalSpecialty): Promise<IMedicalSpecialty>;
  getMedicalSpecialtyById(id: string): Promise<IMedicalSpecialty | null>;
  getMedicalSpecialties(): Promise<IMedicalSpecialty[]>;
  updateMedicalSpecialty(id: string, data: Partial<IMedicalSpecialty>): Promise<IMedicalSpecialty | null>;
  deleteMedicalSpecialty(id: string): Promise<IMedicalSpecialty | null>;
}

class MedicalSpecialtyRepository implements IMedicalSpecialtyRepository {
  constructor(connection: string) {
    mongoose.connect(connection);
  }

  async createMedicalSpecialty(data: IMedicalSpecialty): Promise<IMedicalSpecialty> {
    const medicalSpecialty = new MedicalSpecialtyModel(data);
    await medicalSpecialty.save();
    return medicalSpecialty;
  }

  async getMedicalSpecialtyById(id: string): Promise<IMedicalSpecialty | null> {
    const medicalSpecialty = await MedicalSpecialtyModel.findById(id);
    return medicalSpecialty;
  }

  async getMedicalSpecialties(): Promise<IMedicalSpecialty[]> {
    const medicalSpecialties = await MedicalSpecialtyModel.find();
    return medicalSpecialties;
  }

  async updateMedicalSpecialty(id: string, data: Partial<IMedicalSpecialty>): Promise<IMedicalSpecialty | null> {
    const medicalSpecialty = await MedicalSpecialtyModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return medicalSpecialty;
  }

  async deleteMedicalSpecialty(id: string): Promise<IMedicalSpecialty | null> {
    const medicalSpecialty = await MedicalSpecialtyModel.findByIdAndDelete(id);
    return medicalSpecialty;
  }
}

export default MedicalSpecialtyRepository;
