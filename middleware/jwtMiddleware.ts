import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const jwtValidator =
  (fn: any) =>
  async (...args: any) => {
    const event = args[0];
    const headers = event.headers;
    const token = headers.Authorization || headers.authorization;

    if (!token) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Token não fornecido" }),
      };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      event.user = decoded;

      return await fn(...args);
    } catch (error: any) {
      const statusCode = error.statusCode || 403;
      const message = error.message || "Token inválido";

      return {
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message }),
      };
    }
  };

export default jwtValidator;
