import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import JWTService from "../services/JWTService";
import { IResponse } from "../definitions/responses";

const jwtService = new JWTService();

const authMiddleware = (
  handler: (event: APIGatewayEvent, context: Context) => Promise<ProxyResult>
) => {
  return async (event: APIGatewayEvent, context: Context) => {
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
