import ResponseError from "@/error/ResponseError";
import { getDateRange } from "@/helper/getDateRange";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";

export default class StatisticService {
  static async getStatistic(): Promise<ResponsePayload> {
    const {
      ordersOneMonth,
      ordersSevenDays,
      ordersThreeMonth,
      ordersToday,
      ordersYesterday,
    } = await this.getOrders();

    const dataTotalRevenue = {
      today: ordersToday,
      sevenDay: ordersSevenDays,
      oneMonth: ordersOneMonth,
      threeMonth: ordersThreeMonth,
      yesterday: ordersYesterday,
    };
    
    const newOrder = await prisma.detail_Order.findMany({
      where: {
        status: {
          in: ["PENDING", "PROCESSING"],
        },
      },
      select: {
        status: true,
      },
    });

    const totalOrdersPending = newOrder.filter(
      (order) => order.status === "PENDING"
    ).length;
    const totalOrdersProcess = newOrder.filter(
      (order) => order.status === "PROCESSING"
    ).length;

    const dataNewOrder = {
      total: totalOrdersPending + totalOrdersProcess,
      pending: totalOrdersPending,
      process: totalOrdersProcess,
    };

    const bestSeller = await this.getBestSeller();
    const product = await prisma.product.findUnique({
      where: {
        id: bestSeller[0].product_id,
      },
      select: {
        product_name: true,
        stock: true,
      },
    });

    if (!product) {
      throw new ResponseError(404, "Oops! Product best seller is not found!");
    }

    const dataBestSeller = {
      productName: product.product_name,
      stock: product.stock,
      sold: bestSeller[0]._sum.quantity,
    };

    const stockRunningLow = await prisma.product.findMany({
      where: {
        stock: {
          lte: 5,
        },
      },
      orderBy: {
        stock: "asc",
      },
      select: {
        id: true,
        product_name: true,
      },
    });

    const dataProductLowStock = {
      totalProduct: stockRunningLow.length,
      products: stockRunningLow,
    };

    return {
      status: "success",
      code: 200,
      message: "Successfully get statistic!",
      data: {
        dataTotalRevenue,
        dataNewOrder,
        dataBestSeller,
        dataProductLowStock,
      },
    };
  }

  static async getOrders() {
    const lastToday = getDateRange("today");
    const lastSevenDay = getDateRange("7d");
    const lastMonth = getDateRange("30d");
    const lastThreeMonth = getDateRange("90d");
    const lastYesterday = getDateRange("yesterday");
    const ordersToday = await prisma.detail_Order.findMany({
      select: {
        id: true,
        total_price: true,
      },
      where: {
        status: "COMPLETED",
        created_at: {
          gte: lastToday.gte,
          lte: lastToday.lte,
        },
      },
    });

    const ordersSevenDays = await prisma.detail_Order.findMany({
      select: {
        id: true,
        total_price: true,
      },
      where: {
        status: "COMPLETED",
        created_at: {
          gte: lastSevenDay.gte,
          lte: lastSevenDay.lte,
        },
      },
    });

    const ordersOneMonth = await prisma.detail_Order.findMany({
      select: {
        id: true,
        total_price: true,
      },
      where: {
        status: "COMPLETED",
        created_at: {
          gte: lastMonth.gte,
          lte: lastMonth.lte,
        },
      },
    });

    const ordersThreeMonth = await prisma.detail_Order.findMany({
      select: {
        id: true,
        total_price: true,
      },
      where: {
        status: "COMPLETED",
        created_at: {
          gte: lastThreeMonth.gte,
          lte: lastThreeMonth.lte,
        },
      },
    });

    const ordersYesterday = await prisma.detail_Order.findMany({
      select: {
        id: true,
        total_price: true,
      },
      where: {
        status: "COMPLETED",
        created_at: {
          gte: lastYesterday.gte,
          lte: lastYesterday.lte,
        },
      },
    });

    return {
      ordersToday,
      ordersSevenDays,
      ordersOneMonth,
      ordersThreeMonth,
      ordersYesterday,
    };
  }

  static async getBestSeller() {
    const sevenDay = getDateRange("7d");
    const bestSeller = await prisma.detail_Order.groupBy({
      by: ["product_id"],
      where: {
        status: "COMPLETED",
        created_at: { gte: sevenDay.gte, lte: sevenDay.lte },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 3,
    });

    return bestSeller;
  }
}
