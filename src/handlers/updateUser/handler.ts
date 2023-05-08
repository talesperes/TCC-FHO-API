import { APIGatewayEvent } from "aws-lambda";
import { IResponse } from "../../definitions/responses";
import responseMiddleware from "../../middleware/responseMiddleware";
import UserRepository from "../../repositories/UserRepository";
import UpdateUserUseCase from "../../usecases/UpdateUserUseCase";

const MONGODB_URI = process.env.MONGODB_URI || "";

const updateUser = responseMiddleware(
  async (event: APIGatewayEvent): Promise<IResponse> => {
    const { cpf, userData } = JSON.parse(event.body!);
    const repository = new UserRepository(MONGODB_URI);
    const usecase = new UpdateUserUseCase(repository);
    return await usecase.execute(cpf, userData);
  }
);

export { updateUser };
