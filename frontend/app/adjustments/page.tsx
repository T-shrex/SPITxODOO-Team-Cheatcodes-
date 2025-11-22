"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adjustments = [
  {
    id: "ADJ-001",
    product: "Steel Rods",
    recordedQty: 250,
    countedQty: 248,
    adjustment: -2,
    reason: "Physical count mismatch",
    date: "2024-01-14",
  },
  {
    id: "ADJ-002",
    product: "Electrical Wire",
    recordedQty: 15,
    countedQty: 12,
    adjustment: -3,
    reason: "Damaged items found",
    date: "2024-01-15",
  },
  {
    id: "ADJ-003",
    product: "Office Chairs",
    recordedQty: 40,
    countedQty: 45,
    adjustment: +5,
    reason: "Found extra inventory",
    date: "2024-01-16",
  },
]

export default function AdjustmentsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Stock Adjustments</h1>
              <p className="text-muted-foreground mt-1">Reconcile recorded vs actual stock</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
              + New Adjustment
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Form */}
          {showForm && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Create Adjustment</CardTitle>
                <CardDescription>Adjust stock based on physical count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <Input placeholder="Select product" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Select location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Recorded Quantity</Label>
                    <Input type="number" placeholder="0" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Counted Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Reason for Adjustment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="count-mismatch">Physical count mismatch</SelectItem>
                        <SelectItem value="damaged">Damaged items</SelectItem>
                        <SelectItem value="loss">Loss/Theft</SelectItem>
                        <SelectItem value="found">Found extra inventory</SelectItem>
                        <SelectItem value="expiry">Expiry/Write-off</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Notes (Optional)</Label>
                    <Input placeholder="Add detailed notes about this adjustment" />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="bg-primary hover:bg-primary/90">Save Adjustment</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Search adjustments..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="mismatch">Count Mismatch</SelectItem>
                <SelectItem value="loss">Loss/Theft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Adjustments Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-foreground">ID</TableHead>
                      <TableHead className="text-foreground">Product</TableHead>
                      <TableHead className="text-right text-foreground">Recorded</TableHead>
                      <TableHead className="text-right text-foreground">Counted</TableHead>
                      <TableHead className="text-right text-foreground">Adjustment</TableHead>
                      <TableHead className="text-foreground">Reason</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adjustments.map((adj) => (
                      <TableRow key={adj.id} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="font-mono font-semibold">{adj.id}</TableCell>
                        <TableCell>{adj.product}</TableCell>
                        <TableCell className="text-right">{adj.recordedQty}</TableCell>
                        <TableCell className="text-right">{adj.countedQty}</TableCell>
                        <TableCell
                          className={`text-right font-semibold ${adj.adjustment > 0 ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
                        >
                          {adj.adjustment > 0 ? "+" : ""}
                          {adj.adjustment}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{adj.reason}</TableCell>
                        <TableCell className="text-muted-foreground">{adj.date}</TableCell>
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
