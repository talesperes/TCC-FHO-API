import { IResponse } from "../definitions/responses"
import UserNotFoundException from "../exceptions/UserNotFoundException"
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
		const sendCodeResponse = await this.codeService.send(phoneNumber)
		const {
			message,
			data: { verificationSid },
		} = sendCodeResponse

		await this.userRepository.updateUser(cpf, { verificationSid })

		return { message }
	}
}

export default SendCodeUseCase
