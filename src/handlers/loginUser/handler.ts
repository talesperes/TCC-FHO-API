import { APIGatewayEvent } from "aws-lambda";
import { IResponse } from "../../definitions/responses";
import responseMiddleware from "../../middleware/responseMiddleware";
import UserRepository from "../../repositories/UserRepository";
import JWTService from "../../services/JWTService";
import LoginUserUseCase from "../../usecases/LoginUserUseCase";

const MONGODB_URI = process.env.MONGODB_URI || "";

const loginUser = responseMiddleware(
  async (event: APIGatewayEvent): Promise<IResponse> => {
    const { cpf, password }: { cpf: string; password: string } = JSON.parse(event.body!);
    const repository = new UserRepository(MONGODB_URI);
    const jwtService = new JWTService();
    const usecase = new LoginUserUseCase(repository, jwtService);
    return await usecase.execute(cpf, password);
  }
);

export { loginUser };
