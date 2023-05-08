import { APIGatewayEvent } from "aws-lambda";
import { IResponse } from "../../definitions/responses";
import responseMiddleware from "../../middleware/responseMiddleware";
import UserRepository from "../../repositories/UserRepository";
import GetUserUseCase from "../../usecases/GetUserUseCase";

const MONGODB_URI = process.env.MONGODB_URI || "";

const getUser = responseMiddleware(
  async (event: APIGatewayEvent): Promise<IResponse> => {
    const { cpf }: { cpf: string } = JSON.parse(event.body!);
    const repository = new UserRepository(MONGODB_URI);
    const usecase = new GetUserUseCase(repository);
    return await usecase.execute(cpf);
  }
);

export { getUser };
