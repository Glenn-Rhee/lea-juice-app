import z from "zod";
import {
  CartItem,
  CATEGORY,
  GENDER,
  Product,
  STATUSORDER,
  STATUSPAYMENT,
} from "../../generated/prisma";
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
  Detail_Order: {
    quantity: number;
  }[];
  totalPurchased: number;
  advantage: number;
  imageUrlUser: string | null;
}

export interface DataCart extends z.infer<typeof CartValidation.CREATECART> {
  cart_id: string;
}

export interface Cart extends CartItem {
  product: Product;
}

export interface TransactionDashboard {
  id: string;
  transactionId: string;
  product: string;
  productType: CATEGORY;
  customerName: string;
  amount: number;
  quantity: number;
  date: string;
  status: STATUSORDER;
  statusPayment: STATUSPAYMENT;
  paidAt: string;
  phoneNumber: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
}

type TotalRating = {
  stars: number[];
  avgRating: string;
};

export interface DataReview {
  id: string;
  name: string | null;
  imageUrl: string | null;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface TotalReview {
  totalRating: TotalRating;
  dataReview: DataReview[];
  satisfiedTotal: number;
}

export interface DataUserTable {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  totalOrders: number;
  address: string;
  phoneNumber: string;
  gender: GENDER;
  city: string;
  province: string;
  postalCode: string;
  totalSpending: number;
  lastPurchaseDate: Date;
  bestSeller: CATEGORY;
}

export type DataNewOrder = {
  total: number;
  pending: number;
  process: number;
};

export type TotalRevenue = {
  id: string;
  total_price: number;
};

export type DataTotalRevenue = {
  today: TotalRevenue[];
  sevenDay: TotalRevenue[];
  oneMonth: TotalRevenue[];
  threeMonth: TotalRevenue[];
  yesterday: TotalRevenue[];
};

export type DataBestSeller = {
  productName: string;
  stock: number;
  sold: number | null;
};

export type DataProductLowStock = {
  totalProduct: number;
  products: {
    id: string;
    product_name: string;
  }[];
};

export interface DataStatistic {
  dataTotalRevenue: DataTotalRevenue;
  dataNewOrder: DataNewOrder;
  dataBestSeller: DataBestSeller;
  dataProductLowStock: DataProductLowStock;
}
