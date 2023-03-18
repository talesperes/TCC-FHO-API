import BaseException from "./BaseException"

class CodeAlreadySentException extends BaseException {
	constructor() {
		super("Code has already been sent, try again later", "CODE_ALREADY_SENT", 429)
	}
}

export default CodeAlreadySentException
