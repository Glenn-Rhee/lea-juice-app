import { Transaction } from "@/components/pages/transaction/Columns";
import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload, TransactionDashboard } from "@/types";

export default class TransactionService {
  static async getTransaction(user_id: string): Promise<ResponsePayload> {
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new ResponseError(404, "Oops! User is not found!");
    }

    if (user.role === "ADMIN") {
      const ordersUser = await prisma.order.findMany({
        include: {
          Detail_Order: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
          user: true,
        },
      });

      const data: TransactionDashboard[] = ordersUser.flatMap((o) =>
        o.Detail_Order.map<TransactionDashboard>((d) => ({
          id: d.order_id,
          transactionId: o.id,
          product: d.product.product_name,
          productType: d.product.category.category_name,
          customerName: o.user.name || "",
          amount: d.total_price,
          quantity: d.quantity,
          date: d.created_at.toISOString(),
          status: d.status,
        }))
      );

      return {
        status: "success",
        code: 200,
        data,
        message: "Successfully get transaction!",
      };
    }

    const ordersUser = await prisma.order.findMany({
      where: { user_id },
      include: {
        Detail_Order: {
          include: { product: true },
        },
      },
    });

    const dataTemp = ordersUser.flatMap((o) => o.Detail_Order);
    const data: Transaction[] = dataTemp.map((d) => ({
      id: d.order_id,
      productName: d.product.product_name,
      amount: d.total_price,
      date: d.created_at,
      quantity: d.quantity,
      status: d.status,
    }));

    return {
      status: "success",
      code: 200,
      data,
      message: "Successfully get transaction!",
    };
  }
}
