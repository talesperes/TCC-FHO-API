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
		console.log("sendCodeResponse ======= ", sendCodeResponse)
		const {
			message,
			data: { serviceSid },
		} = sendCodeResponse

		const lastCodeTime = Date.now()

		await this.userRepository.updateUser(cpf, {
			serviceSid,
			lastCodeTime,
		})

		return { message }
	}
}

export default SendCodeUseCase
