class BaseException extends Error {
  constructor(message: string, public errorCode: string, public code: number) {
    super(message);
  }
}

export default BaseException;
