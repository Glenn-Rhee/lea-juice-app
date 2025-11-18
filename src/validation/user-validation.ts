import z from "zod";

export default class UserValidation {
  static readonly REGISTER = z
    .object({
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: "Password doesn't match!",
    });

  static readonly LOGIN = z.object({
    email: z.email({ error: "Please fill email properly!" }),
    password: z
      .string({ error: "Please fill password" })
      .min(4, { error: "Minimum length of password is 4" })
      .max(100, { error: "Maximum length of password is 100" }),
  });

  static readonly EDIT = z.object({
    username: z
      .string({ error: "Please fill username properly!" })
      .min(5, { error: "Minimum length of username is 5" }),
    fullname: z
      .string({ error: "Please fill fullname properly!" })
      .min(1, { error: "Minimum length of fullname is 1" }),
    email: z.email({ error: "Please fill email properly!" }),
    phoneNumber: z
      .string({ error: "Please fill phone number properly!" })
      .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Invalid phone number"),
    address: z.string({ error: "Please fill address properly!" }),
    city: z.string({ error: "Please fill city properly!" }),
    province: z.string({ error: "Please fill province properly!" }),
    postalCode: z
      .string({ error: "Please fill postal code properly!" })
      .regex(/^[1-9][0-9]{4}$/, "Invalid postal code!"),
    dateOfBirth: z.date({ error: "Please fill your date of birth properly!" }),
    gender: z.enum(["MALE", "FEMALE", "UNKNOWN"], {
      error: "Please fill gender MALE, FEMALE, or UNKNOWN",
    }),
    bio: z.string({ error: "Please fill bio properly" }).optional(),
  });

  static readonly EDITIMAGE = z.object({
    image: z.url({ error: "Please fill url image properly!" }),
  });
}
