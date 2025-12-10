import { DataUserTable } from "@/types";
import { columnsUser } from "./Columns";
import DataTableUser from "./DataTableUser";
import FilterUser from "./FilterUser";
import StatsCard from "./StatsCard";

const dummyUser: DataUserTable[] = [
  {
    id: "USR-001",
    username: "arielrizki",
    name: "Ariel Rizki",
    email: "ariel@example.com",
    image: "/prof.jpg",
    totalOrders: 12,
    address: "Jl. Kenanga No. 24",
    phoneNumber: "081234567890",
    gender: "MALE",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40123",
    totalSpending: 2450000,
    lastPurchaseDate: new Date("2025-11-18T10:30:00"),
  },
  {
    id: "USR-002",
    username: "arielrizki",
    name: "Ariel Rizki",
    email: "ariel@example.com",
    image: "/prof.jpg",
    totalOrders: 12,
    address: "Jl. Kenanga No. 24",
    phoneNumber: "081234567890",
    gender: "MALE",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40123",
    totalSpending: 2450000,
    lastPurchaseDate: new Date("2025-11-18T10:30:00"),
  },
];

export default function TableUser() {
  return (
    <>
      <StatsCard />
      <FilterUser />
      <DataTableUser columns={columnsUser} data={dummyUser} />
    </>
  );
}
