"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const products = [
  {
    id: 1,
    name: "Steel Rods",
    sku: "SR-001",
    category: "Materials",
    stock: 250,
    minStock: 50,
    location: "Rack A1",
    uom: "kg",
  },
  {
    id: 2,
    name: "Office Chairs",
    sku: "OC-002",
    category: "Furniture",
    stock: 45,
    minStock: 20,
    location: "Section B",
    uom: "pcs",
  },
  {
    id: 3,
    name: "Electrical Wire",
    sku: "EW-003",
    category: "Supplies",
    stock: 15,
    minStock: 30,
    location: "Rack C2",
    uom: "meter",
    status: "low",
  },
  {
    id: 4,
    name: "Laptop Stand",
    sku: "LS-004",
    category: "Accessories",
    stock: 0,
    minStock: 10,
    location: "Out of Stock",
    uom: "pcs",
    status: "out",
  },
]

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Products</h1>
              <p className="text-muted-foreground mt-1">Manage your product inventory</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
              + Add Product
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Form */}
          {showForm && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Create New Product</CardTitle>
                <CardDescription>Add a new product to your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU / Code</Label>
                    <Input placeholder="e.g., SR-001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="materials">Materials</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="supplies">Supplies</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Unit of Measure</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="meter">Meter</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Initial Stock (Optional)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Stock Level</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button className="bg-primary hover:bg-primary/90">Save Product</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Search Products</Label>
              <Input placeholder="Search by name or SKU..." />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="materials">Materials</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>

          {/* Products Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-foreground">Name</TableHead>
                      <TableHead className="text-foreground">SKU</TableHead>
                      <TableHead className="text-foreground">Category</TableHead>
                      <TableHead className="text-right text-foreground">Stock</TableHead>
                      <TableHead className="text-right text-foreground">Min Level</TableHead>
                      <TableHead className="text-foreground">Location</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {product.stock} {product.uom}
                        </TableCell>
                        <TableCell className="text-right">{product.minStock}</TableCell>
                        <TableCell className="text-muted-foreground">{product.location}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              product.status === "out"
                                ? "bg-destructive/20 text-destructive"
                                : product.status === "low"
                                  ? "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                                  : "bg-green-500/20 text-green-600 dark:text-green-400"
                            }`}
                          >
                            {product.status === "out"
                              ? "Out of Stock"
                              : product.status === "low"
                                ? "Low Stock"
                                : "In Stock"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
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
