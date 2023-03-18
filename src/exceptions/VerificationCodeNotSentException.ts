import BaseException from "./BaseException"

class VerificationCodeNotSentException extends BaseException {
  constructor() {
    super("Verification code not sent", "VERIFICATION_CODE_NOT_SENT", 500)
  }
}

export default VerificationCodeNotSentException
