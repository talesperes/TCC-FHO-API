import { APIGatewayEvent } from "aws-lambda"
import { IResponse } from "../../definitions/responses"
import responseMiddleware from "../../middleware/responseMiddleware"
import UserRepository from "../../repositories/UserRepository"
import CodeService from "../../services/CodeService"
import SendCodeUseCase from "../../usecases/SendCodeUseCase"

const MONGODB_URI = process.env.MONGODB_URI || ""

const sendCode = responseMiddleware(
	async (event: APIGatewayEvent): Promise<IResponse> => {
		const { cpf }: { cpf: string } = JSON.parse(event.body!)
		const repository = new UserRepository(MONGODB_URI)
		const codeService = new CodeService()
		const usecase = new SendCodeUseCase(repository, codeService)
		return await usecase.execute(cpf)
	}
)

export { sendCode }
