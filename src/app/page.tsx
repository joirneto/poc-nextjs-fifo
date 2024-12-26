import Link from "next/link";
import { DashboardTables } from "~/components/dashboard-tables";
import { Button } from "~/components/ui/button";


export default function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Modern CRUD App</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Manage your data with ease using our intuitive and responsive interface.
          Create, read, update, and delete entries effortlessly.
        </p>
        <Button asChild>
          <Link href="/table-management">Go to Table Management</Link>
        </Button>
      </div>
      <DashboardTables />
    </div>
  )
}

