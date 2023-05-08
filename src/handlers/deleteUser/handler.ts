import { APIGatewayEvent } from "aws-lambda";
import { IResponse } from "../../definitions/responses";
import responseMiddleware from "../../middleware/responseMiddleware";
import UserRepository from "../../repositories/UserRepository";
import DeleteUserUseCase from "../../usecases/DeleteUserUseCase";

const MONGODB_URI = process.env.MONGODB_URI || "";

const deleteUser = responseMiddleware(
  async (event: APIGatewayEvent): Promise<IResponse> => {
    const { cpf }: { cpf: string } = JSON.parse(event.body!);
    const repository = new UserRepository(MONGODB_URI);
    const usecase = new DeleteUserUseCase(repository);
    return await usecase.execute(cpf);
  }
);

export { deleteUser };
