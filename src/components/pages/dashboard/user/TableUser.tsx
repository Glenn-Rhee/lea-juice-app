"use client";
import { DataUserTable } from "@/types";
import { columnsUser } from "./Columns";
import DataTableUser from "./DataTableUser";
import FilterUser from "./FilterUser";
import StatsCard from "./StatsCard";
import { useEffect, useState } from "react";

export default function TableUser({
  data: initialData,
}: {
  data: DataUserTable[];
}) {
  const [data, setData] = useState<DataUserTable[]>(initialData);

  const filterUser = (filter: string) => {
    if (filter === "") {
      setData(initialData);
      return;
    }

    // username
    let filtered = initialData.filter((d) => d.username.includes(filter));
    if (filtered.length === 0) {
      // email
      filtered = initialData.filter((d) => d.email.includes(filter));
    }

    if (filtered.length === 0) {
      // id
      filtered = initialData.filter((d) => d.id === filter);
    }

    if (filtered.length === 0) {
      // total orders
      filtered = initialData.filter((d) => d.totalOrders.toString() === filter);
    }

    if (filtered.length === 0) {
      // total spending
      filtered = initialData.filter(
        (d) => d.totalSpending.toString() === filter
      );
    }

    setData(filtered);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      <StatsCard data={data} />
      <FilterUser filterUser={filterUser} />
      <DataTableUser columns={columnsUser} data={data} />
    </>
  );
}
