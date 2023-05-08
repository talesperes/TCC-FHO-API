import mongoose from "mongoose";

export interface IMedicalAppointment extends Document {
    patient: mongoose.Schema.Types.ObjectId;
    doctor: mongoose.Schema.Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    reason: string;
    status: string;
    notes?: string;
}

const MedicalAppointmentSchema = new mongoose.Schema<IMedicalAppointment>({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
        type: String,
        enum: ["rescheduled", "scheduled", "completed", "canceled"],
        required: true,
    },
    notes: { type: String, default: null },
});

export default mongoose.model<IMedicalAppointment>(
    "MedicalAppointment",
    MedicalAppointmentSchema
);