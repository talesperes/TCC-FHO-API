import VerificationRepository from "../repository";

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID || "";

class VerifyCodeUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(username: string, code: string) {
    const user = await this.repository.getUser(username);
    const { UserAttributes } = user;
    if (UserAttributes) {
      const phoneNumberData = UserAttributes.find(
        (attr) => attr.Name === "phone_number"
      );
      if (phoneNumberData?.Value) {
        const phoneNumber = phoneNumberData.Value;
        const client = twilio(accountSid, authToken);
        const verificationResult = await client.verify.v2
          .services(serviceSid)
          .verificationChecks.create({
            to: phoneNumber,
            code: code,
          });
        if (verificationResult.status !== "approved") {
          throw new Error("Código de verificação incorreto");
        }
      }
    } else {
      throw new Error("User not found");
    }
  }
}

export { VerifyCodeUseCase };
