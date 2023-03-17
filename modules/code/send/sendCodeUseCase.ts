import VerificationRepository from "../repository";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID || "";

class SendCodeUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(username: string) {
    const user = await this.repository.getUser(username);
    const { UserAttributes } = user;
    if (UserAttributes) {
      const phoneNumberData = UserAttributes.find(
        (attr) => attr.Name === "phone_number"
      );
      if (phoneNumberData?.Value) {
        const phoneNumber = phoneNumberData.Value;

        const client = twilio(accountSid, authToken); 

        await client.verify.v2
          .services(serviceSid)
          .verifications.create({
            to: phoneNumber,
            channel: "sms",
          })
          .then((verification) => console.log(verification))
          .catch((error) => console.error(error));

        return { message: "code sended" };
      } else {
        throw new Error("User doesnt have phone number");
      }
    } else {
      throw new Error("User not found");
    }
  }
}

export { SendCodeUseCase };
