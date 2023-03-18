import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import responseMiddleware from "./responseMiddleware"
import { getUsersUseCase } from "./userUseCase"
import UserRepository from "../repositories/UserRepository"

const LoginHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	const { cpf } = event.pathParameters
	const repository = new UserRepository()
	const usecase = new LoginUseCase(repository)

	return usecase.execute(cpf)
}

export const getUsers = responseMiddleware(LoginHandler)
