"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const warehouses = [
  { id: 1, name: "Main Warehouse", location: "Downtown", capacity: 10000, used: 7500 },
  { id: 2, name: "North Branch", location: "North District", capacity: 5000, used: 3200 },
  { id: 3, name: "South Branch", location: "South District", capacity: 8000, used: 4800 },
]

export default function SettingsPage() {
  const [showWarehouseForm, setShowWarehouseForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage warehouses and system configuration</p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Warehouse Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Warehouses</h2>
                <p className="text-muted-foreground">Manage your warehouse locations</p>
              </div>
              <Button
                onClick={() => setShowWarehouseForm(!showWarehouseForm)}
                className="bg-primary hover:bg-primary/90"
              >
                + Add Warehouse
              </Button>
            </div>

            {showWarehouseForm && (
              <Card className="border-border mb-6">
                <CardHeader>
                  <CardTitle>Add New Warehouse</CardTitle>
                  <CardDescription>Register a new warehouse location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Warehouse Name</Label>
                      <Input placeholder="e.g., Main Warehouse" />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="City/District" />
                    </div>
                    <div className="space-y-2">
                      <Label>Capacity (units)</Label>
                      <Input type="number" placeholder="10000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input placeholder="Full address" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button className="bg-primary hover:bg-primary/90">Add Warehouse</Button>
                    <Button variant="outline" onClick={() => setShowWarehouseForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-border">
                        <TableHead className="text-foreground">Warehouse Name</TableHead>
                        <TableHead className="text-foreground">Location</TableHead>
                        <TableHead className="text-right text-foreground">Capacity</TableHead>
                        <TableHead className="text-right text-foreground">Used</TableHead>
                        <TableHead className="text-right text-foreground">Available</TableHead>
                        <TableHead className="text-right text-foreground">Usage %</TableHead>
                        <TableHead className="text-right text-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warehouses.map((warehouse) => {
                        const usage = (warehouse.used / warehouse.capacity) * 100
                        return (
                          <TableRow key={warehouse.id} className="border-b border-border hover:bg-muted/50">
                            <TableCell className="font-medium">{warehouse.name}</TableCell>
                            <TableCell className="text-muted-foreground">{warehouse.location}</TableCell>
                            <TableCell className="text-right">{warehouse.capacity}</TableCell>
                            <TableCell className="text-right">{warehouse.used}</TableCell>
                            <TableCell className="text-right">{warehouse.capacity - warehouse.used}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-accent h-2 rounded-full"
                                    style={{ width: `${Math.min(usage, 100)}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold w-10 text-right">{usage.toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure general system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Low Stock Alert Threshold (%)</Label>
                <Input type="number" placeholder="20" />
                <p className="text-xs text-muted-foreground">
                  Alert when stock falls below this percentage of minimum level
                </p>
              </div>
              <div className="space-y-2">
                <Label>Default Reorder Quantity</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>System Email</Label>
                <Input type="email" placeholder="noreply@quicktrace.com" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
