import VerificationRepository from "../repository";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID || "";

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
          const savedTimestamp = lastTimeCodeData.Value;
          const currentTimestamp = Date.now();
          const diffGreaterThan60Seconds = this.diffGreaterThan60Seconds(
            currentTimestamp,
            savedTimestamp
          );
          if (!diffGreaterThan60Seconds) {
            return;
          }
        }
        const phoneNumber = phoneNumberData.Value;

        const client = twilio(accountSid, authToken); 

        await client.verify.v2
          .services(serviceSid)
          .verifications.create({
            to: "+5519992619918",
            channel: "sms",
          })
          .then((verification) => console.log(verification))
          .catch((error) => console.error(error));

        return { message: "code sended" };

        // await this.repository.sendSMS(phoneNumber, message);
        // await this.repository.saveCodeToCognito(username, code);
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
