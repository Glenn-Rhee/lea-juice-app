import z from "zod";

export default class UserValidation {
  static readonly REGISTER = z.object({
    fullname: z
      .string({ error: "Please fill fullname properly!" })
      .min(1, { error: "Minimum length of fullname is 1" }),
    username: z
      .string({ error: "Please fill username properly!" })
      .min(5, { error: "Minimum length of username is 5" }),
    email: z.email({ error: "Please fill email properly!" }),
    password: z
      .string({ error: "Please fill password" })
      .min(4, { error: "Minimum length of password is 4" })
      .max(100, { error: "Maximum length of password is 100" }),
    confirmPassword: z
      .string({ error: "Please fill confirmation password properly" })
      .min(4, { error: "Minimum length of confirmation password is 4" })
      .max(100, { error: "Maximum length of confirmation password is 100" }),
  });
}
