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
		const { phoneNumber, lastCodeTime } = user
		const currentTime = Date.now()
		const diffGreaterThanLimit = Math.abs(currentTime - lastCodeTime) / 1000 > 60
		if (lastCodeTime && !diffGreaterThanLimit) {
			throw new CodeAlreadySentException()
		}
		const sendCodeResponse = await this.codeService.send(phoneNumber)
		const {
			message,
			data: { sid },
		} = sendCodeResponse
		const newLastCodeTime = Date.now()
		await this.userRepository.updateUser(cpf, {
			sid,
			lastCodeTime: newLastCodeTime,
		})
		return { message }
	}
}

export default SendCodeUseCase
