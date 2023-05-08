import { IResponse } from "../definitions/responses";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import UserRepository from "../repositories/UserRepository";

class GetUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(cpf: string): Promise<IResponse> {
    const user = await this.userRepository.getUserByCPF(cpf);
    if (!user) {
      throw new UserNotFoundException();
    }
    return { message: "User retrieved successfully", data: { user } };
  }
}

export default GetUserUseCase;
