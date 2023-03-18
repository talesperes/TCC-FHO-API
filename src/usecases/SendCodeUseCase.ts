import { IResponse } from "../definitions/responses"
import UserNotFoundException from "../exceptions/UserNotFoundException"
import { verificationCodeGenerator } from "../functions/utils"
import UserRepository from "../repositories/UserRepository"
import CodeService from "../services/CodeService"

class SendCodeUseCase {
	constructor(
		private userRepository: UserRepository,
		private codeService: CodeService
	) {
		this.userRepository = userRepository
		this.codeService = codeService
	}

	async execute(cpf: string): Promise<IResponse> {
		const user = await this.userRepository.getUserByCPF(cpf)

		if (!user) {
			throw new UserNotFoundException()
		}

		const { phoneNumber } = user
		const verificationCode = verificationCodeGenerator()
		await this.userRepository.updateUser(cpf, { verificationCode })
		return await this.codeService.send(phoneNumber, verificationCode)
	}
}

export default SendCodeUseCase
