import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

class JWTService {
  generateToken(payload: object, expiresIn: string | number = "1d"): string {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}

export default JWTService;
