import mongoose from "mongoose";
import MedicalAppointmentModel, { IMedicalAppointment } from "../models/MedicalAppointmentModel";

export interface IMedicalAppointmentRepository {
  createAppointment(data: IMedicalAppointment): Promise<IMedicalAppointment>;
  getAppointmentById(id: string): Promise<IMedicalAppointment | null>;
  getAppointments(): Promise<IMedicalAppointment[]>;
  updateAppointment(id: string, data: Partial<IMedicalAppointment>): Promise<IMedicalAppointment | null>;
}

class MedicalAppointmentRepository implements IMedicalAppointmentRepository {
  constructor(connection: string) {
    mongoose.connect(connection);
  }

  async createAppointment(data: IMedicalAppointment): Promise<IMedicalAppointment> {
    const appointment = new MedicalAppointmentModel(data);
    await appointment.save();
    return appointment;
  }

  async getAppointmentById(id: string): Promise<IMedicalAppointment | null> {
    const appointment = await MedicalAppointmentModel.findById(id);
    return appointment;
  }

  async getAppointments(): Promise<IMedicalAppointment[]> {
    const appointments = await MedicalAppointmentModel.find();
    return appointments;
  }

  async updateAppointment(id: string, data: Partial<IMedicalAppointment>): Promise<IMedicalAppointment | null> {
    const appointment = await MedicalAppointmentModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return appointment;
  }

}

export default MedicalAppointmentRepository;
