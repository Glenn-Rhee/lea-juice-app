import bcrypt from "bcrypt";

export default class Bcrypt {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashed: string) {
    return bcrypt.compare(password, hashed);
  }
}
