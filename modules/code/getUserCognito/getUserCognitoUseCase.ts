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
      return phoneNumberData;
    }

    return;
  }
}

export { GetUserCognitoUseCase };
