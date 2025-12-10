import { DataUserTable } from "@/types";
import { columnsUser } from "./Columns";
import DataTableUser from "./DataTableUser";
import FilterUser from "./FilterUser";
import StatsCard from "./StatsCard";

export default function TableUser({ data }: { data: DataUserTable[] }) {
  return (
    <>
      <StatsCard data={data} />
      <FilterUser />
      <DataTableUser columns={columnsUser} data={data} />
    </>
  );
}
