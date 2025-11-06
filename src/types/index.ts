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
