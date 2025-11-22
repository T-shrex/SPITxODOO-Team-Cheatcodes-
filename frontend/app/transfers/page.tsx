"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transfers = [
  {
    id: "TRF-001",
    product: "Steel Rods",
    qty: 50,
    fromLocation: "Main Store",
    toLocation: "Production Rack",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "TRF-002",
    product: "Office Chairs",
    qty: 10,
    fromLocation: "Section A",
    toLocation: "Warehouse 2",
    status: "in-progress",
    date: "2024-01-16",
  },
  {
    id: "TRF-003",
    product: "Electrical Wire",
    qty: 30,
    fromLocation: "Storage B",
    toLocation: "Rack C2",
    status: "pending",
    date: "2024-01-17",
  },
]

export default function TransfersPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Internal Transfers</h1>
              <p className="text-muted-foreground mt-1">Move stock between locations</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
              + New Transfer
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Form */}
          {showForm && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Create Transfer</CardTitle>
                <CardDescription>Move stock between warehouses or locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <Input placeholder="Select product" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>From Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Store</SelectItem>
                        <SelectItem value="production">Production Rack</SelectItem>
                        <SelectItem value="storage">Storage B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>To Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warehouse2">Warehouse 2</SelectItem>
                        <SelectItem value="rack">Rack C2</SelectItem>
                        <SelectItem value="production">Production Floor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Transfer Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Input placeholder="Add notes about this transfer" />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="bg-primary hover:bg-primary/90">Create Transfer</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Search transfers..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transfers Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-foreground">Transfer ID</TableHead>
                      <TableHead className="text-foreground">Product</TableHead>
                      <TableHead className="text-right text-foreground">Qty</TableHead>
                      <TableHead className="text-foreground">From Location</TableHead>
                      <TableHead className="text-foreground">To Location</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfers.map((transfer) => (
                      <TableRow key={transfer.id} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold">{transfer.id}</TableCell>
                        <TableCell>{transfer.product}</TableCell>
                        <TableCell className="text-right">{transfer.qty}</TableCell>
                        <TableCell className="text-muted-foreground">{transfer.fromLocation}</TableCell>
                        <TableCell className="text-muted-foreground">{transfer.toLocation}</TableCell>
                        <TableCell className="text-muted-foreground">{transfer.date}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              transfer.status === "completed"
                                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                : transfer.status === "in-progress"
                                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {transfer.status
                              .split("-")
                              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                              .join(" ")}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
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
