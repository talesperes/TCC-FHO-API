import UserNotFoundException from "../exceptions/UserNotFoundException"
import UserRepository from "../repositories/UserRepository"
import { IResponse } from "../definitions/responses"
import InvalidVerificationCodeException from "../exceptions/InvalidVerificationCodeException"

class SendCodeUseCase {
	constructor(private userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async execute(cpf: string, codeReceived: string): Promise<IResponse> {
		const user = await this.userRepository.getUserByCPF(cpf)

		if (!user) {
			throw new UserNotFoundException()
		}

		const { code } = user

		if (codeReceived != code) {
			throw new InvalidVerificationCodeException()
		}

		return { message: "code verified" }
	}
}

export default SendCodeUseCase
