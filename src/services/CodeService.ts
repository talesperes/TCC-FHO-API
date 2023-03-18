import twilio from "twilio"
import VerificationCodeNotSentException from "../exceptions/VerificationCodeNotSentException"
import InvalidVerificationCodeException from "../exceptions/InvalidVerificationCodeException"
import VerificationCodeCheckException from "../exceptions/VerificationCodeCheckException"

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const AUTH_TOKE = process.env.TWILIO_AUTH_TOKEN
const SERVICE_SID = process.env.TWILIO_SERVICE_SID || ""

class CodeService {
	constructor() {}

	async send(phoneNumber: string, code: string) {
		const client = twilio(ACCOUNT_SID, AUTH_TOKE)

		await client.verify.v2
			.services(SERVICE_SID)
			.verifications.create({
				to: phoneNumber,
				channel: "sms",
				customCode: code,
			})
			.then(() => {
				return { message: "verification code sent" }
			})
			.catch((error) => {
				console.error(error)
				throw new VerificationCodeNotSentException()
			})
	}

	async verify(phoneNumber: string, code: string) {
		const client = twilio(ACCOUNT_SID, AUTH_TOKE)

		const verification = await client.verify.v2
			.services(SERVICE_SID)
			.verificationChecks.create({
				to: phoneNumber,
				code,
			})
			.catch(() => {
				throw new VerificationCodeCheckException()
			})

		if (verification.status !== "approved") {
			throw new InvalidVerificationCodeException()
		}

		return { message: "code approved" }
	}
}

export { CodeService }
