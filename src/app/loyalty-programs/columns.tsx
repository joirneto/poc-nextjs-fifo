"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "~/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-column-row-actions"


export type Item = {
  id: number
  name: string
  identifier: string
  createdAt: Date|string|null
  updatedAt: Date|string|null
}

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Programa" />
    ),
  },
  {
    accessorKey: "identifier",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meu Identificador" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Atualizado em" />
    ),
  },


  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

// {
//   accessorKey: "price",
//   header: ({ column }) => (
//     <DataTableColumnHeader column={column} title="Price" />
//   ),
//   cell: ({ row }) => {
//     const price = parseFloat(row.getValue("price"))
//     const formatted = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price)
//     return <div className="font-medium">{formatted}</div>
//   },
// },