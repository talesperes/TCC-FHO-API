import BaseException from "./BaseException"

class VerificationCodeCheckException extends BaseException {
	constructor() {
		super("Error verifying code", "VERIFICATION_CODE_CHECK_ERROR", 400)
	}
}

export default VerificationCodeCheckException
