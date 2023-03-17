import { CognitoIdentityServiceProvider, SNS } from "aws-sdk";

const cognito = new CognitoIdentityServiceProvider();
const UserPoolId = process.env.COGNITO_USER_POOL_ID;
const sns = new SNS();

class VerificationRepository {
  async sendSMS(phoneNumber: string, message: string) {
    const params = {
      PhoneNumber: phoneNumber,
      Message: message,
    };
    return sns.publish(params).promise();
  }

  async saveCodeToCognito(username: string, code: string) {
    if (!UserPoolId) {
      throw new Error("UserPoolId is not defined");
    }

    const currentTimestamp = Date.now();

    const params = {
      UserAttributes: [
        {
          Name: "custom:verification_code",
          Value: code,
        },
        {
          Name: "custom:last_time_code",
          Value: currentTimestamp.toString(),
        },
      ],
      Username: username,
      UserPoolId,
    };
    return cognito.adminUpdateUserAttributes(params).promise();
  }

  async getCodeFromCognito(username: string) {
    if (!UserPoolId) {
      throw new Error("UserPoolId is not defined");
    }

    const params = {
      Username: username,
      UserPoolId,
    };
    const response = await cognito.adminGetUser(params).promise();
    if (response.UserAttributes) {
      const codeAttribute = response.UserAttributes.find(
        (attr) => attr.Name === "custom:verification_code"
      );
      return codeAttribute?.Value;
    }
    return undefined;
  }

  async getUser(username: string) {
    if (!UserPoolId) {
      throw new Error("UserPoolId is not defined");
    }

    const params = {
      UserPoolId,
      Username: username,
    };

    try {
      const result = await cognito.adminGetUser(params).promise();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(username: string) {
    if (!UserPoolId) {
      throw new Error("UserPoolId is not defined");
    }

    const params = {
      UserPoolId,
      Username: username,
    };

    try {
      const result = await cognito.adminCreateUser(params).promise();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default VerificationRepository;
