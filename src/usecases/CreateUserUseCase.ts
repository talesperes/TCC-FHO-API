import { IResponse } from "../definitions/responses";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../models/UserModel";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: IUser): Promise<IResponse> {
    const user = await this.userRepository.createUser(userData);
    return { message: "User created successfully", data: { user } };
  }
}

export default CreateUserUseCase;
