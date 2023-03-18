type HandlerFunction = (...args: any[]) => Promise<any>
type MiddlewareFunction = (fn: HandlerFunction) => HandlerFunction

interface ErrorResponse {
	statusCode: number
	errorCode: string
	message: string
}

interface Response {
	statusCode: number
	errorCode?: string
	headers: {
		"Access-Control-Allow-Origin": string
		"Access-Control-Allow-Credentials": boolean
	}
	body: string
}

const responseMiddleware: MiddlewareFunction =
	(fn) =>
	async (...args) => {
		try {
			const result = await fn(...args)

			const response: Response = {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(result),
			}

			return response
		} catch (error: any) {
			const {
				statusCode = 500,
				message = "Internal Error",
				errorCode = "INTERNAL_ERROR",
			} = error as Partial<ErrorResponse>

			const errorResponse: Response = {
				errorCode,
				statusCode,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify({ message }),
			}

			return errorResponse
		}
	}

export default responseMiddleware
