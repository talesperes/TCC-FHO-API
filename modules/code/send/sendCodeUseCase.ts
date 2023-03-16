import VerificationRepository from "../repository";

class SendCodeUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(phoneNumber: string, username: string) {
    const code = Math.floor(Math.random() * 900000 + 100000).toString();
    const message = `[Agendamento de Consulta] Seu código de verificação é: ${code}`;

    try {
      await this.repository.getUser(username);
    } catch (error: any) {
      if (error.code === "UserNotFoundException") {
        await this.repository.createUser(username);
      } else {
        throw error;
      }
    }

    await this.repository.sendSMS(phoneNumber, message);
    await this.repository.saveCodeToCognito(username, code);
  }
}

export { SendCodeUseCase };
