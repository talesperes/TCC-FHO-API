import { IResponse } from "../definitions/responses"
import CodeAlreadySentException from "../exceptions/CodeAlreadySentException"
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
		const { phoneNumber, lastSentCodeTime } = user
		const currentTime = Date.now()
		const diffGreaterThanLimit =
			Math.abs(currentTime - lastSentCodeTime) / 1000 > 60
		if (lastSentCodeTime && !diffGreaterThanLimit) {
			throw new CodeAlreadySentException()
		}
		const sendCodeResponse = await this.codeService.send(phoneNumber)
		const {
			message,
			data: { code },
		} = sendCodeResponse
		const newLastCodeTime = Date.now()
		await this.userRepository.updateUser(cpf, {
			code,
			lastSentCodeTime: newLastCodeTime,
		})
		return { message }
	}
}

export default SendCodeUseCase
