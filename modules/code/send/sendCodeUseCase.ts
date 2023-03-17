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
      const lastTimeCodeData = UserAttributes.find(
        (attr) => attr.Name === "custom:last_time_code"
      );
      if (phoneNumberData?.Value) {
        if (lastTimeCodeData?.Value) {
          const savedTimestamp = new Date(lastTimeCodeData.Value).getTime();
          const currentTimestamp = Date.now();
          const diffGreaterThan60Seconds = this.diffGreaterThan60Seconds(
            savedTimestamp,
            currentTimestamp
          );
          if (!diffGreaterThan60Seconds) {
            return;
          }
        }
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

  private diffGreaterThan60Seconds = (timestamp1: any, timestamp2: any) => {
    const differenceInSeconds = Math.abs(timestamp1 - timestamp2) / 1000;
    return differenceInSeconds > 60;
  };
}

export { SendCodeUseCase };
