import VerificationRepository from "../repository";

class GetUserCognitoUseCase {
  constructor(private repository: VerificationRepository) {}

  async execute(username: string) {
    const result = await this.repository.getUser(username);
    const { UserAttributes } = result;

    if (UserAttributes) {
      const phoneNumberData = UserAttributes.find(
        (attr) => attr.Name === "phone_number"
      );

      if (phoneNumberData?.Value) {
        const formatedNumber = this.formatPhoneNumber(phoneNumberData.Value);
        return { phoneNumber: formatedNumber };
      } else {
        throw new Error("User doesnt have phone number");
      }
    }

    return;
  }

  private formatPhoneNumber = (numero: string) => {
    const numeroLimpo = numero.replace(/\D+/g, "");
    const parte3 = numeroLimpo.slice(-4);
    return `(XX) XXXX-${parte3}`;
  };
}

export { GetUserCognitoUseCase };
