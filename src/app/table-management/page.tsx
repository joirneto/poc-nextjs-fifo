import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getData() {
  // Fetch data from your API here
  return [
    {
      id: "728ed52f",
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: "489e1d42",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    // ...
  ]
}

export default async function TableManagement() {
  const data = await getData()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Table Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

