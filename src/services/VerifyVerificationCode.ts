import twilio from "twilio"
import UserNotFoundException from "../exceptions/UserNotFoundException"
import InvalidVerificationCodeException from "../exceptions/InvalidVerificationCodeException"
import VerificationCodeCheckException from "../exceptions/VerificationCodeCheckException"
import UserRepository from "../../repositories/UserRepository"

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const AUTH_TOKE = process.env.TWILIO_AUTH_TOKEN
const SERVICE_SID = process.env.TWILIO_SERVICE_SID || ""

class VerifyVerificationCode {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(cpf: string, code: string) {
    const user = await this.userRepository.getUserByCPF(cpf)

    if (!user) {
      throw new UserNotFoundException()
    }

    const { verificationCode, phoneNumber } = user

    if (verificationCode != code) {
      throw new InvalidVerificationCodeException()
    }

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
  }
}

export { VerifyVerificationCode }
