import twilio from "twilio"
import UserNotFoundException from "../exceptions/UserNotFoundException"
import VerificationCodeNotSentException from "../exceptions/VerificationCodeNotSentException"
import UserRepository from "../repositories/UserRepository"

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const AUTH_TOKE = process.env.TWILIO_AUTH_TOKEN
const SERVICE_SID = process.env.TWILIO_SERVICE_SID || ""

class SendVerificationCode {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(cpf: string) {
    const user = await this.userRepository.getUserByCPF(cpf)

    if (!user) {
      throw new UserNotFoundException()
    }

    const { phoneNumber } = user

    const client = twilio(ACCOUNT_SID, AUTH_TOKE)

    await client.verify.v2
      .services(SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      })
      .then(() => {
        return { message: "verification code sent", data: {} }
      })
      .catch((error) => {
        console.error(error)
        throw new VerificationCodeNotSentException()
      })
  }
}

export { SendVerificationCode }
