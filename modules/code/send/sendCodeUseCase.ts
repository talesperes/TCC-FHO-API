import VerificationRepository from "../repository";

class SendCodeUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(phoneNumber: string, username: string) {
    const code = Math.floor(Math.random() * 900000 + 100000).toString();
    const message = `Seu código de verificação é: ${code}`;
    await this.repository.sendSMS(phoneNumber, message);
    await this.repository.saveCodeToCognito(username, code);
  }
}

export { SendCodeUseCase };
