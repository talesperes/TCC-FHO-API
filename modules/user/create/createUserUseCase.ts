import { IUserRepository } from '../repository';

class CreateUserUseCase {
  private userRepository: IUserRepository;
  constructor(userRepository: any) {
    this.userRepository = userRepository;
  }

  async execute(data: any) {
    return this.userRepository.createUser(data);
  }
}

export default CreateUserUseCase;
