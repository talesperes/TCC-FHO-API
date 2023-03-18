import BaseException from "./BaseException"

class InvalidVerificationCodeException extends BaseException {
  constructor() {
    super("Invalid verification code", "INVALID_VERIFICATION_CODE", 400)
  }
}

export default InvalidVerificationCodeException
