import UserRepository from "./repository";
import CreateUserUseCase from "./usecase/createuserUseCase";
import errorHandler from "../../middleware/errorHandler";

const MONGODB_URI = process.env.MONGODB_URI;

const repository = new UserRepository(MONGODB_URI);
const createUserUseCase = new CreateUserUseCase(repository);

export const createUser = errorHandler(async (event: any) => {
  const data = JSON.parse(event.body);
  return await createUserUseCase.execute(data);
});
