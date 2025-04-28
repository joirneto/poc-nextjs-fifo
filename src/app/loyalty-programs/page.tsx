import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getLoyaltyPrograms } from "~/server/loyalty-programs";

async function fetchLoyaltyPrograms() {
  return getLoyaltyPrograms();
}

export default async function TableManagement() {
  const data = await fetchLoyaltyPrograms();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Programas de Pontos</h1>
        <Button asChild>
          <Link href="/loyalty-programs/add">Adicionar Programa</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
