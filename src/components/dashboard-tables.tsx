import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

  interface RowData {
    [key: string]: string | number | Date | undefined
  }
  
  interface DashboardTableProps {
    title: string;
    data: RowData[];
    columns: string[];
  }
  
  
  const DashboardTable = ({ title, data, columns }: DashboardTableProps) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {String(row[column.toLowerCase()])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
  
  export function DashboardTables() {
  
    const smallTable1Data = [
      { name: "User 1", lastActive: "2023-05-15" },
      { name: "User 2", lastActive: "2023-05-14" },
      { name: "User 3", lastActive: "2023-05-13" },
    ]
  
    const smallTable2Data = [
      { order: "#1234", status: "Shipped" },
      { order: "#1235", status: "Processing" },
      { order: "#1236", status: "Delivered" },
    ]
  
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <DashboardTable 
            title="Recent Users" 
            data={smallTable1Data} 
            columns={["Name", "Last Active"]} 
          />
          <DashboardTable 
            title="Recent Orders" 
            data={smallTable2Data} 
            columns={["Order", "Status"]} 
          />
        </div>
      </div>
    )
  }
  
  