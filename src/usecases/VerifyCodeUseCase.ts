import UserNotFoundException from "../exceptions/UserNotFoundException"
import InvalidVerificationCodeException from "../exceptions/InvalidVerificationCodeException"
import UserRepository from "../repositories/UserRepository"
import { CodeService } from "../services/CodeService"

class SendCodeUseCase {
	constructor(
		private userRepository: UserRepository,
		private codeService: CodeService
	) {
		this.userRepository = userRepository
		this.codeService = codeService
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

		await this.codeService.verify(phoneNumber, code)
	}
}

export { SendCodeUseCase }
