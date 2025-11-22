"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const moveHistory = [
  {
    id: "LOG-001",
    date: "2024-01-17 14:30",
    product: "Steel Rods",
    operation: "Receipt",
    qty: 100,
    fromLocation: "Supplier",
    toLocation: "Main Store",
    user: "John Doe",
  },
  {
    id: "LOG-002",
    date: "2024-01-17 15:00",
    product: "Steel Rods",
    operation: "Transfer",
    qty: 50,
    fromLocation: "Main Store",
    toLocation: "Production Rack",
    user: "Jane Smith",
  },
  {
    id: "LOG-003",
    date: "2024-01-17 16:15",
    product: "Office Chairs",
    operation: "Delivery",
    qty: 10,
    fromLocation: "Section A",
    toLocation: "Customer",
    user: "Mike Johnson",
  },
  {
    id: "LOG-004",
    date: "2024-01-17 17:00",
    product: "Electrical Wire",
    operation: "Adjustment",
    qty: -3,
    fromLocation: "Rack C2",
    toLocation: "Adjustment (Damaged)",
    user: "John Doe",
  },
]

export default function HistoryPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Move History</h1>
            <p className="text-muted-foreground mt-1">Complete transaction log of all inventory movements</p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Search by product or ID..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Operations</SelectItem>
                <SelectItem value="receipt">Receipt</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* History Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-foreground">Log ID</TableHead>
                      <TableHead className="text-foreground">Date & Time</TableHead>
                      <TableHead className="text-foreground">Product</TableHead>
                      <TableHead className="text-foreground">Operation</TableHead>
                      <TableHead className="text-right text-foreground">Quantity</TableHead>
                      <TableHead className="text-foreground">From Location</TableHead>
                      <TableHead className="text-foreground">To Location</TableHead>
                      <TableHead className="text-foreground">User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {moveHistory.map((log) => (
                      <TableRow key={log.id} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold text-accent">{log.id}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.date}</TableCell>
                        <TableCell className="font-medium">{log.product}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              log.operation === "Receipt"
                                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                : log.operation === "Delivery"
                                  ? "bg-red-500/20 text-red-600 dark:text-red-400"
                                  : log.operation === "Transfer"
                                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                    : "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                            }`}
                          >
                            {log.operation}
                          </span>
                        </TableCell>
                        <TableCell
                          className={`text-right font-semibold ${log.qty > 0 ? "text-green-600 dark:text-green-400" : log.qty < 0 ? "text-destructive" : ""}`}
                        >
                          {log.qty > 0 ? "+" : ""}
                          {log.qty}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.fromLocation}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.toLocation}</TableCell>
                        <TableCell>{log.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
