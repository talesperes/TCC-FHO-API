import mongoose from "mongoose"

export enum UserType {
	PATIENT = "patient",
	DOCTOR = "doctor",
	ADMIN = "admin",
}

export interface IUser extends Document {
	_id: string
	cpf: string
	name: string
	phoneNumber: string
	type: UserType
	code: string
	expirationCode: number
	lastSentCodeTime: number
	specialty?: string
	crm?: string
	deleted: boolean
}

const UserSchema = new mongoose.Schema<IUser>({
	_id: { type: String, required: true },
	cpf: { type: String, required: true },
	name: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	type: { type: String, enum: Object.values(UserType), required: true },
	code: { type: String, required: true },
	expirationCode: { type: Number, required: true },
	lastSentCodeTime: { type: Number, required: true },
	specialty: { type: mongoose.Schema.Types.ObjectId },
	crm: { type: String },
	deleted: { type: Boolean, required: true, default: false }
})

export default mongoose.model<IUser>("User", UserSchema)
