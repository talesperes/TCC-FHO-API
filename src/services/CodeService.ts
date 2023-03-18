import twilio from "twilio"
import VerificationCodeNotSentException from "../exceptions/VerificationCodeNotSentException"
import InvalidVerificationCodeException from "../exceptions/InvalidVerificationCodeException"
import VerificationCodeCheckException from "../exceptions/VerificationCodeCheckException"
import { IResponse } from "../definitions/responses"

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const AUTH_TOKE = process.env.TWILIO_AUTH_TOKEN
const SERVICE_SID = process.env.TWILIO_SERVICE_SID || ""

class CodeService {
	constructor() {}

	async send(phoneNumber: string): Promise<IResponse> {
		const client = twilio(ACCOUNT_SID, AUTH_TOKE)
		const response = await client.verify.v2
			.services(SERVICE_SID)
			.verifications.create({
				to: phoneNumber,
				channel: "sms",
			})
			.catch((error) => {
				console.error(error)
				throw new VerificationCodeNotSentException()
			})

		return {
			message: "verification code sent",
			data: { sid: response.sid },
		}
	}

	async verify(sid: string, code: string): Promise<IResponse> {
		const client = twilio(ACCOUNT_SID, AUTH_TOKE)

		const verification = await client.verify.v2
			.services(SERVICE_SID)
			.verificationChecks.create({
				code,
				verificationSid: sid,
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

export default CodeService
