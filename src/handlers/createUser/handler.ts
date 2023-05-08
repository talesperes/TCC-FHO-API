import { APIGatewayEvent } from "aws-lambda";
import { IResponse } from "../../definitions/responses";
import responseMiddleware from "../../middleware/responseMiddleware";
import UserRepository from "../../repositories/UserRepository";
import CreateUserUseCase from "../../usecases/CreateUserUseCase";

const MONGODB_URI = process.env.MONGODB_URI || "";

const createUser = responseMiddleware(
  async (event: APIGatewayEvent): Promise<IResponse> => {
    const userData = JSON.parse(event.body!);
    const repository = new UserRepository(MONGODB_URI);
    const usecase = new CreateUserUseCase(repository);
    return await usecase.execute(userData);
  }
);

export { createUser };
