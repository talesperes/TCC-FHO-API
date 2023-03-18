class BaseException extends Error {
  constructor(
    public message: string,
    public errorCode: string,
    public statusCode: number
  ) {
    super(message)
  }
}

export default BaseException
