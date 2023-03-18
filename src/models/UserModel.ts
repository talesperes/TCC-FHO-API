import mongoose from "mongoose"

export interface IUser extends Document {
	cpf: string
	name: string
	phoneNumber: string
	type: string
	serviceSid: string
	lastCodeTime: number
}

const UserSchema = new mongoose.Schema<IUser>({
	cpf: { type: String, required: true },
	name: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	type: { type: String, required: true },
	serviceSid: { type: String, required: true },
	lastCodeTime: { type: Number, required: true },
})

export default mongoose.model<IUser>("User", UserSchema)
