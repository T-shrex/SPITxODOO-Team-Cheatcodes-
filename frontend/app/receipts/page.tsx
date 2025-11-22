"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const receipts = [
  {
    id: "RCP-001",
    supplier: "Steel Supplies Inc",
    items: 5,
    totalQty: 250,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "RCP-002",
    supplier: "Office Furniture Co",
    items: 3,
    totalQty: 45,
    status: "pending",
    date: "2024-01-16",
  },
  {
    id: "RCP-003",
    supplier: "Electrical Distributors",
    items: 8,
    totalQty: 120,
    status: "processing",
    date: "2024-01-17",
  },
]

export default function ReceiptsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Receipts</h1>
              <p className="text-muted-foreground mt-1">Incoming goods from suppliers</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
              + New Receipt
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Form */}
          {showForm && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Create Receipt</CardTitle>
                <CardDescription>Register incoming goods from supplier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Supplier Name</Label>
                    <Input placeholder="Select or enter supplier" />
                  </div>
                  <div className="space-y-2">
                    <Label>Receipt Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Reference No</Label>
                    <Input placeholder="e.g., INV-2024-001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Warehouse</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="north">North Branch</SelectItem>
                        <SelectItem value="south">South Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-6 p-4 border border-border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-4">Add Items</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Product</Label>
                      <Input placeholder="Select product" />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input placeholder="kg" />
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" className="w-full bg-transparent">
                        Add Item
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="bg-primary hover:bg-primary/90">Create Receipt</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Search receipts..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Receipts Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-foreground">Receipt ID</TableHead>
                      <TableHead className="text-foreground">Supplier</TableHead>
                      <TableHead className="text-right text-foreground">Items</TableHead>
                      <TableHead className="text-right text-foreground">Total Qty</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receipts.map((receipt) => (
                      <TableRow key={receipt.id} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold">{receipt.id}</TableCell>
                        <TableCell>{receipt.supplier}</TableCell>
                        <TableCell className="text-right">{receipt.items}</TableCell>
                        <TableCell className="text-right">{receipt.totalQty}</TableCell>
                        <TableCell className="text-muted-foreground">{receipt.date}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              receipt.status === "completed"
                                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                : receipt.status === "processing"
                                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
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
