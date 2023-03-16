import VerificationRepository from "../repository";

class GetUserCognitoUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(username: string) {
    const result = await this.repository.getUser(username);
    return result
  }
}

export { GetUserCognitoUseCase };
