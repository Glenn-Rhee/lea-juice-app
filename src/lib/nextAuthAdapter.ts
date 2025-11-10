import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const CustomPrismaAdapter = () => {
  return PrismaAdapter(prisma);
};
