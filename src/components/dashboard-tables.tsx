import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
  
  const DashboardTable = ({ title, data, columns }: { title: string, data: any[], columns: string[] }) => (
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
                  <TableCell key={colIndex}>{row[column.toLowerCase()]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
  
  export function DashboardTables() {
    const largeTableData = [
      { id: 1, name: "Product A", category: "Electronics", stock: 150, price: "$299.99" },
      { id: 2, name: "Product B", category: "Clothing", stock: 200, price: "$49.99" },
      { id: 3, name: "Product C", category: "Home & Garden", stock: 75, price: "$129.99" },
      { id: 4, name: "Product D", category: "Electronics", stock: 100, price: "$199.99" },
      { id: 5, name: "Product E", category: "Clothing", stock: 300, price: "$39.99" },
    ]
  
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
        <div className="md:col-span-1">
          <DashboardTable 
            title="Product Inventory" 
            data={largeTableData} 
            columns={["Name", "Category", "Stock", "Price"]} 
          />
        </div>
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
  
  