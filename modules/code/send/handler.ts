import { APIGatewayProxyHandler } from "aws-lambda";
import errorHandler from "../../../middleware/errorHandler";
import VerificationRepository from "../repository";
import { SendCodeUseCase } from "./sendCodeUseCase";

const repository = new VerificationRepository();
const useCase = new SendCodeUseCase(repository);

const sendCode: APIGatewayProxyHandler = errorHandler(
  async (event: { body: string }) => {
    const { phoneNumber, username } = JSON.parse(event.body);
    return await useCase.execute(phoneNumber, username);
  }
);

export { sendCode };
