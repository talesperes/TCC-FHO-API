import mongoose from "mongoose"

export interface IUser extends Document {
	cpf: string
	name: string
	phoneNumber: string
	type: string
	verificationSid: string
}

const UserSchema = new mongoose.Schema<IUser>({
	cpf: { type: String, required: true },
	name: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	type: { type: String, required: true },
	verificationSid: { type: String, required: true },
})

export default mongoose.model<IUser>("User", UserSchema)
