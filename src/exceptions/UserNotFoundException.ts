import BaseException from "./BaseException";

class UserNotFoundException extends BaseException {
  constructor() {
    super("User not found", "USER_NOT_FOUND", 404);
  }
}

export default UserNotFoundException;
