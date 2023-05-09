import { IResponse } from "../definitions/responses";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../models/UserModel";
import JWTService from "../services/JWTService";

class LoginUserUseCase {
  constructor(private userRepository: UserRepository, private jwtService: JWTService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async execute(cpf: string, password: string): Promise<IResponse> {
    const user = await this.userRepository.getUserByCPF(cpf);
    if (!user) {
      throw new UserNotFoundException();
    }
    
    const token = this.jwtService.generateToken({ userId: user._id, userType: user.type });

    return { message: "User logged in successfully", data: { token } };
  }
}

export default LoginUserUseCase;
