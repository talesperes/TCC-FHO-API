import twilio from "twilio"
import VerificationCodeNotSentException from "../exceptions/VerificationCodeNotSentException"
import InvalidVerificationCodeException from "../exceptions/InvalidVerificationCodeException"
import VerificationCodeCheckException from "../exceptions/VerificationCodeCheckException"
import { IResponse } from "../definitions/responses"
import { verificationCodeGenerator } from "../functions/utils"

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const AUTH_TOKE = process.env.TWILIO_AUTH_TOKEN
const SERVICE_SID = process.env.TWILIO_SERVICE_SID || ""

class CodeService {
	constructor() {}

	async send(phoneNumber: string): Promise<IResponse> {
		const client = twilio(ACCOUNT_SID, AUTH_TOKE)

		const code = verificationCodeGenerator()

		const body = `Seu código de verificação é ${code} [Agendamento de Consulta]`

		// const response = await client.messages
		// 	.create({ body, from: "+15513103275", to: phoneNumber })
		// 	.catch((error) => {
		// 		console.error(error)
		// 		throw new VerificationCodeNotSentException()
		// 	})

		const response = true

		return {
			message: "verification code sent",
			data: { code, response },
		}
	}
}

export default CodeService
