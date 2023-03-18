import UserNotFoundException from "../exceptions/UserNotFoundException"
import UserRepository from "../repositories/UserRepository"
import CodeService from "../services/CodeService"
import { IResponse } from "../definitions/responses"

class SendCodeUseCase {
	constructor(
		private userRepository: UserRepository,
		private codeService: CodeService
	) {
		this.userRepository = userRepository
		this.codeService = codeService
	}

	async execute(cpf: string, code: string): Promise<IResponse> {
		const user = await this.userRepository.getUserByCPF(cpf)

		if (!user) {
			throw new UserNotFoundException()
		}

		const { sid } = user

		return await this.codeService.verify(sid, code)
	}
}

export default SendCodeUseCase
