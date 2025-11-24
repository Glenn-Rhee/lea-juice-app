import z from "zod";
import { CartItem, CATEGORY, Product } from "../../generated/prisma";
import CartValidation from "@/validation/cart-validation";

export interface ResponsePayload<T = unknown> {
  status: "success" | "failed";
  message: string;
  code: number;
  data: T;
}

export interface RegisterUser {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface ResponseNextAuth {
  error: string | null;
  status: number;
  ok: boolean;
  url: string;
}

export interface DataUserAuth {
  id: string;
  name: string;
  email: string;
}

export interface PatchUser {
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  dateOfBirth: Date | null;
  bio?: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  image: string | null;
}

export interface DataUser extends PatchUser {
  image: string;
}

export interface DataProduct extends Product {
  category: {
    id: string;
    category_name: CATEGORY;
  };
}

export interface DataCart extends z.infer<typeof CartValidation.CREATECART> {
  cart_id: string;
}

export interface Cart extends CartItem {
  product: Product
}