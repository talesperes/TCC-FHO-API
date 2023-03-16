import VerificationRepository from "../repository";

class SendCodeUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(username: string) {
    const code = Math.floor(Math.random() * 900000 + 100000).toString();
    const message = `[Agendamento de Consulta] Seu código de verificação é: ${code}`;
    const user = await this.repository.getUser(username);
    const { UserAttributes } = user;
    if (UserAttributes) {
      const phoneNumberData = UserAttributes.find(
        (attr) => attr.Name === "phone_number"
      );

      if (phoneNumberData?.Value) {
        const phoneNumber = phoneNumberData.Value;
        await this.repository.sendSMS(phoneNumber, message);
        await this.repository.saveCodeToCognito(username, code);
      } else {
        throw new Error("User doesnt have phone number");
      }
    } else {
      throw new Error("User not found");
    }
  }
}

export { SendCodeUseCase };
