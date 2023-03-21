import { APIGatewayEvent } from "aws-lambda"
import { IResponse } from "../../definitions/responses"
import responseMiddleware from "../../middleware/responseMiddleware"
import UserRepository from "../../repositories/UserRepository"
import CodeService from "../../services/CodeService"
import VerifyCodeUseCase from "../../usecases/VerifyCodeUseCase"

const MONGODB_URI = process.env.MONGODB_URI || ""

const verifyCode = responseMiddleware(
	async (event: APIGatewayEvent): Promise<IResponse> => {
		const { cpf, code }: { cpf: string; code: string } = JSON.parse(event.body!)
		const repository = new UserRepository(MONGODB_URI)
		const usecase = new VerifyCodeUseCase(repository)
		return await usecase.execute(cpf, code)
	}
)

export { verifyCode }
