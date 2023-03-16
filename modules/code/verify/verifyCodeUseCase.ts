import VerificationRepository from "../repository";

class VerifyCodeUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(username: string, code: string) {
    const savedCode = await this.repository.getCodeFromCognito(username);
    if (savedCode !== code) {
      throw new Error("Código de verificação incorreto");
    }
  }
}

export { VerifyCodeUseCase };
