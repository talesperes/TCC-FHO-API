import { IResponse } from "../definitions/responses";
import UserRepository from "../repositories/UserRepository";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import { IUser } from "../models/UserModel";

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(cpf: string, userData: Partial<IUser>): Promise<IResponse> {
    const user = await this.userRepository.updateUser(cpf, userData);
    if (!user) {
      throw new UserNotFoundException();
    }
    return { user };
  }
}

export default UpdateUserUseCase;
