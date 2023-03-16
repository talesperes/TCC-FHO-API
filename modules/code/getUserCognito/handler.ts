import { APIGatewayProxyHandler } from "aws-lambda";
import errorHandler from "../../../middleware/errorHandler";
import VerificationRepository from "../repository";
import { GetUserCognitoUseCase } from "./getUserCognitoUseCase";

const repository = new VerificationRepository();
const useCase = new GetUserCognitoUseCase(repository);

const getUserCognito: APIGatewayProxyHandler = errorHandler(
  async (event: { body: string }) => {
    const { username } = JSON.parse(event.body);
    return await useCase.execute(username);
  }
);

export { getUserCognito };
