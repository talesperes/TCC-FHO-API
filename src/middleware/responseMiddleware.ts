import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"
import { IResponse } from "../definitions/responses"

type Handler = (event: APIGatewayEvent) => Promise<IResponse>

const responseMiddleware = (
	handler: Handler
): ((event: APIGatewayEvent) => Promise<APIGatewayProxyResult>) => {
	return async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
		try {
			const result: IResponse = await handler(event)

			return {
				statusCode: 200,
				body: JSON.stringify({
					message: result.message,
					data: result.data,
				}),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json",
				},
			}
		} catch (error: unknown) {
			console.error("Error in responseMiddleware:", error)

			const err = error as {
				statusCode?: number
				message?: string
				errorCode?: string
			}

			const statusCode = err.statusCode || 500
			const message = err.message || "Internal Server Error"

			return {
				statusCode,
				body: JSON.stringify({
					message,
					error: err.errorCode || undefined,
				}),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json",
				},
			}
		}
	}
}

export default responseMiddleware
