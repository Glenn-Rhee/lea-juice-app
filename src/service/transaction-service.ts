import { Transaction } from "@/components/pages/transaction/Columns";
import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";

export default class TransactionService {
  static async getTransaction(user_id: string): Promise<ResponsePayload> {
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new ResponseError(404, "Oops! User is not found!");
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
