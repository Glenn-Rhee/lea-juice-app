import TableUser from "@/components/pages/dashboard/user/TableUser";

export default function ProductsDashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Users</h1>
            <p className="text-muted-foreground">
              Display user information clearly and neatly.
            </p>
          </div>
          <TableUser />
        </div>
      </div>
    </div>
  );
}
