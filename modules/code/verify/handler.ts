import { APIGatewayProxyHandler } from "aws-lambda";
import errorHandler from "../../../middleware/errorHandler";
import VerificationRepository from "../repository";
import { VerifyCodeUseCase } from "./verifyCodeUseCase";

const repository = new VerificationRepository();
const useCase = new VerifyCodeUseCase(repository);

const verifyCode: APIGatewayProxyHandler = errorHandler(
  async (event: { body: string }) => {
    const { cpf, code } = JSON.parse(event.body);
    return await useCase.execute(cpf, code);
  }
);

export { verifyCode };
