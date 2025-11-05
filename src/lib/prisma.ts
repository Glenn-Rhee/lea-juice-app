import { PrismaClient } from "../../generated/prisma/client";

export const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query:", e.query);
  console.log("Duration:", e.duration);
});

prisma.$on("info", (e) => {
  console.log("Info:", e.message);
});

prisma.$on("warn", (e) => {
  console.log("Warning:", e.message);
});

prisma.$on("error", (e) => {
  console.log("❌ Error:", e.message);
});
