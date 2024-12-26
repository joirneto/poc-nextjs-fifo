import { DataTable } from "./data-table"
import { columns } from "./columns"
import { getItems } from "./actions"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export default async function TableManagement() {
  const data = await getItems()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Item Management</h1>
        <Button asChild>
          <Link href="/table-management/add">Add New Item</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

