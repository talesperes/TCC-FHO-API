import { IResponse } from "../definitions/responses";
import UserRepository from "../repositories/UserRepository";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(cpf: string): Promise<IResponse> {
    const user = await this.userRepository.deleteUser(cpf);
    if (!user) {
      throw new UserNotFoundException();
    }
    return { message: "User deleted successfully" };
  }
}

export default DeleteUserUseCase;
