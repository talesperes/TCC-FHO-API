import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import JWTService from "../services/JWTService";
import { IResponse } from "../definitions/responses";

interface JWTContext extends Context {
  jwtPayload?: any
}

const jwtService = new JWTService();

const authMiddleware = (
  handler: (event: APIGatewayEvent, context: JWTContext) => Promise<ProxyResult>
) => {
  return async (event: APIGatewayEvent, context: JWTContext) => {
    const token = event.headers.Authorization?.split(" ")[1];

    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized: Missing token" }),
      };
    }

    const decoded = jwtService.verifyToken(token);

    if (!decoded) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized: Invalid token" }),
      };
    }

    context.jwtPayload = decoded;

    return handler(event, context);
  };
};

export default authMiddleware;
