"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const deliveries = [
  {
    id: "DEL-001",
    customer: "ABC Manufacturing",
    items: 3,
    totalQty: 50,
    status: "delivered",
    date: "2024-01-14",
  },
  {
    id: "DEL-002",
    customer: "XYZ Corp",
    items: 5,
    totalQty: 120,
    status: "in-transit",
    date: "2024-01-16",
  },
  {
    id: "DEL-003",
    customer: "Tech Solutions",
    items: 2,
    totalQty: 30,
    status: "pending",
    date: "2024-01-17",
  },
]

export default function DeliveriesPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Delivery Orders</h1>
              <p className="text-muted-foreground mt-1">Outgoing shipments to customers</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
              + New Delivery
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Form */}
          {showForm && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Create Delivery Order</CardTitle>
                <CardDescription>Register outgoing shipment to customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input placeholder="Enter customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Order Reference</Label>
                    <Input placeholder="e.g., SO-2024-001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Shipping Address</Label>
                    <Input placeholder="Destination address" />
                  </div>
                </div>
                <div className="mt-6 p-4 border border-border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-4">Pick Items</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Product</Label>
                      <Input placeholder="Select product" />
                    </div>
                    <div className="space-y-2">
                      <Label>Qty to Pick</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input placeholder="pcs" disabled />
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" className="w-full bg-transparent">
                        Pick Item
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="bg-primary hover:bg-primary/90">Create Delivery Order</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Search deliveries..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deliveries Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-foreground">Delivery ID</TableHead>
                      <TableHead className="text-foreground">Customer</TableHead>
                      <TableHead className="text-right text-foreground">Items</TableHead>
                      <TableHead className="text-right text-foreground">Total Qty</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries.map((delivery) => (
                      <TableRow key={delivery.id} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold">{delivery.id}</TableCell>
                        <TableCell>{delivery.customer}</TableCell>
                        <TableCell className="text-right">{delivery.items}</TableCell>
                        <TableCell className="text-right">{delivery.totalQty}</TableCell>
                        <TableCell className="text-muted-foreground">{delivery.date}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              delivery.status === "delivered"
                                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                : delivery.status === "in-transit"
                                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {delivery.status
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
