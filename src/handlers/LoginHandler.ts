import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { CodeService } from "../services/CodeService"
import responseMiddleware from "../middleware/responseMiddleware"
import UserRepository from "../repositories/UserRepository"
import SendCodeUseCase from "../usecases/SendCodeUseCase"

const MONGODB_URI = process.env.MONGODB_URI || ""

interface IRequest extends APIGatewayProxyEvent {
	pathParameters: {
		cpf: string
	}
}

const SendCodeHandler: APIGatewayProxyHandler = responseMiddleware(
	async (event: IRequest) => {
		const { cpf } = event.pathParameters
		const repository = new UserRepository(MONGODB_URI)
		const codeService = new CodeService()
		const usecase = new SendCodeUseCase(repository, codeService)

		return await usecase.execute(cpf)
	}
)

export { SendCodeHandler as sendCode }
