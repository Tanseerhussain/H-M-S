"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Users,
  Building,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react"

// ---------- Types ----------
type Occupancy = { name: string; occupied: number; total: number; percentage: number }
type Revenue = { month: string; revenue: number; expenses: number }
type Complaint = { category: string; count: number; color: string }
type Student = { year: string; count: number; color: string }

// ---------- Data ----------
const occupancyData: Occupancy[] = [
  { name: "Green Valley", occupied: 38, total: 50, percentage: 76 },
  { name: "Gilgit-Baltistan Paradise Hostel", occupied: 32, total: 40, percentage: 80 },
  { name: "Campus Heights", occupied: 55, total: 60, percentage: 92 },
  { name: "Heritage Block", occupied: 0, total: 30, percentage: 0 },
]

const revenueData: Revenue[] = [
  { month: "Aug", revenue: 1200000, expenses: 800000 },
  { month: "Sep", revenue: 1350000, expenses: 850000 },
  { month: "Oct", revenue: 1400000, expenses: 900000 },
  { month: "Nov", revenue: 1450000, expenses: 920000 },
  { month: "Dec", revenue: 1500000, expenses: 950000 },
  { month: "Jan", revenue: 1550000, expenses: 980000 },
]

const complaintsData: Complaint[] = [
  { category: "Food Quality", count: 15, color: "#ef4444" },
  { category: "Maintenance", count: 8, color: "#f97316" },
  { category: "WiFi Issues", count: 12, color: "#eab308" },
  { category: "Cleanliness", count: 6, color: "#22c55e" },
  { category: "Others", count: 4, color: "#6366f1" },
]

const studentDistribution: Student[] = [
  { year: "1st Year", count: 45, color: "#3b82f6" },
  { year: "2nd Year", count: 38, color: "#10b981" },
  { year: "3rd Year", count: 32, color: "#f59e0b" },
  { year: "4th Year", count: 25, color: "#ef4444" },
]

// ---------- Component ----------
export default function Analytics() {
  const totalStudents = studentDistribution.reduce((sum, item) => sum + item.count, 0)

  const lastRecord = revenueData[revenueData.length - 1]! // non-null assertion
  const totalRevenue = lastRecord.revenue
  const totalExpenses = lastRecord.expenses
  const netProfit = totalRevenue - totalExpenses

  const totalComplaints = complaintsData.reduce((sum, item) => sum + item.count, 0)
  const averageOccupancy = Math.round(
    occupancyData.reduce((sum, item) => sum + item.percentage, 0) /
      occupancyData.length,
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of hostel management metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalStudents}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      +12% from last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Occupancy
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageOccupancy}%
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      +5% from last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₨{(totalRevenue / 100000).toFixed(1)}L
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      +8% from last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Complaints
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalComplaints}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">
                      -3% from last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Hostel Occupancy */}
          <Card>
            <CardHeader>
              <CardTitle>Hostel Occupancy Rates</CardTitle>
              <CardDescription>
                Current occupancy across all hostels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "occupied"
                        ? `${value} occupied`
                        : `${value} total`,
                      name === "occupied" ? "Occupied Rooms" : "Total Rooms",
                    ]}
                  />
                  <Bar dataKey="occupied" fill="#3b82f6" name="occupied" />
                  <Bar dataKey="total" fill="#e5e7eb" name="total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue vs Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>Monthly financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) =>
                      `₨${(value / 100000).toFixed(1)}L`
                    }
                  />
                  <Tooltip
                    formatter={(value) => [
                      `₨${(Number(value) / 100000).toFixed(1)}L`,
                      "",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Complaints + Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complaints Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
              <CardDescription>Distribution of complaint types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={complaintsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {complaintsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {complaintsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">
                        {item.category}
                      </span>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Student Distribution by Year</CardTitle>
              <CardDescription>
                Academic year-wise student count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {studentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {studentDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.year}</span>
                      <Badge variant="outline">{item.count} students</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>
              Current month financial overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-green-700">
                  ₨{(totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-700">
                  ₨{(totalExpenses / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">
                  Net Profit
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  ₨{(netProfit / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
