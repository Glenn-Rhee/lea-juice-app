import { LoginUser } from "@/types";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtDecoded extends JwtPayload {
  email: string;
  password: string;
}

export default class JWT {
  static generateToken(data: LoginUser) {
    return jwt.sign(data, process.env.NEXTAUTH_SECRET as string, {
      expiresIn: "3h",
      algorithm: "HS256",
    });
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET as string
      ) as JwtDecoded;

      return decoded;
    } catch (error) {
      console.log("Error verify token: ", error);
      return null;
    }
  }
}
