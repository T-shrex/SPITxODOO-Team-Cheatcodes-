"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const dashboardData = [
  { month: "Jan", receipts: 40, deliveries: 24, transfers: 15 },
  { month: "Feb", receipts: 30, deliveries: 13, transfers: 18 },
  { month: "Mar", receipts: 20, deliveries: 29, transfers: 12 },
  { month: "Apr", receipts: 50, deliveries: 19, transfers: 24 },
  { month: "May", receipts: 40, deliveries: 25, transfers: 20 },
  { month: "Jun", receipts: 60, deliveries: 35, transfers: 30 },
]

const stockDistribution = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food", value: 20 },
  { name: "Other", value: 20 },
]

export default function DashboardPage() {
  const [warehouse, setWarehouse] = useState("all")

  const kpis = [
    {
      label: "Total Products in Stock",
      value: "1,245",
      change: "+12%",
      icon: "📦",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Low Stock Items",
      value: "43",
      change: "-8%",
      icon: "⚠️",
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Pending Receipts",
      value: "15",
      change: "+4",
      icon: "📥",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Pending Deliveries",
      value: "8",
      change: "-2",
      icon: "📤",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Transfers Scheduled",
      value: "12",
      change: "+3",
      icon: "🔄",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Real-time inventory overview</p>
            </div>
            <Select value={warehouse} onValueChange={setWarehouse}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="north">North Branch</SelectItem>
                <SelectItem value="south">South Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {kpis.map((kpi, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                      <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">{kpi.change}</p>
                    </div>
                    <div className="text-3xl">{kpi.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Operations Chart */}
            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle>Operations Activity</CardTitle>
                <CardDescription>Last 6 months trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="receipts" fill="var(--color-chart-1)" />
                    <Bar dataKey="deliveries" fill="var(--color-chart-2)" />
                    <Bar dataKey="transfers" fill="var(--color-chart-3)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Stock Distribution */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Stock Distribution</CardTitle>
                <CardDescription>By category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stockDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stockDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "var(--color-chart-1)",
                              "var(--color-chart-2)",
                              "var(--color-chart-3)",
                              "var(--color-chart-4)",
                            ][index % 4]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Filters Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Operations</CardTitle>
              <CardDescription>Filter and manage inventory operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="receipts">Receipts</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="adjustments">Adjustments</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-primary hover:bg-primary/90">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
