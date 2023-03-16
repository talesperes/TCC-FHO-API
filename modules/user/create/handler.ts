import UserRepository from "../repository";
import CreateUserUseCase from "./createUserUseCase";
import errorHandler from "../../../middleware/errorHandler";
import { APIGatewayProxyHandler } from "aws-lambda";
import { userSchema } from "./userSchema";

const MONGODB_URI = process.env.MONGODB_URI;

const repository = new UserRepository(MONGODB_URI);
const createUserUseCase = new CreateUserUseCase(repository);

const createUserHandler: APIGatewayProxyHandler = errorHandler(
  async (event: any) => {
    const data = JSON.parse(event.body);
    await userSchema.validate(data);
    return await createUserUseCase.execute(data);
  }
);

export { createUserHandler as createUser };
