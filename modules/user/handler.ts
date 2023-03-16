import UserRepository from "./repository";
import CreateUserUseCase from "./usecase/createUserUseCase";
import errorHandler from "../../middleware/errorHandler";
import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

const MONGODB_URI = process.env.MONGODB_URI;

const repository = new UserRepository(MONGODB_URI);
const createUserUseCase = new CreateUserUseCase(repository);

const createUserHandler: APIGatewayProxyHandler = errorHandler(
  async (event: any): Promise<APIGatewayProxyResult> => {
    const data = JSON.parse(event.body);
    const result = await createUserUseCase.execute(data);

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(result),
    };
  }
);

export { createUserHandler as createUser };
