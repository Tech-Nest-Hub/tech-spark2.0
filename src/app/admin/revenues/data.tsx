export const monthlyRevenue = [
  { month: "Jan", revenue: 45000, profit: 12000, expenses: 33000, orders: 450 },
  { month: "Feb", revenue: 52000, profit: 15600, expenses: 36400, orders: 520 },
  { month: "Mar", revenue: 48000, profit: 14400, expenses: 33600, orders: 480 },
  { month: "Apr", revenue: 61000, profit: 18300, expenses: 42700, orders: 610 },
  { month: "May", revenue: 55000, profit: 16500, expenses: 38500, orders: 550 },
  { month: "Jun", revenue: 67000, profit: 20100, expenses: 46900, orders: 670 },
  { month: "Jul", revenue: 72000, profit: 21600, expenses: 50400, orders: 720 },
  { month: "Aug", revenue: 68000, profit: 20400, expenses: 47600, orders: 680 },
  { month: "Sep", revenue: 75000, profit: 22500, expenses: 52500, orders: 750 },
  { month: "Oct", revenue: 82000, profit: 24600, expenses: 57400, orders: 820 },
  { month: "Nov", revenue: 78000, profit: 23400, expenses: 54600, orders: 780 },
  { month: "Dec", revenue: 85000, profit: 25500, expenses: 59500, orders: 850 },
]

export const categoryRevenue = [
  { name: "Electronics", value: 320000, percentage: 45, color: "#0088FE" },
  { name: "Clothing", value: 180000, percentage: 25, color: "#00C49F" },
  { name: "Books", value: 108000, percentage: 15, color: "#FFBB28" },
  { name: "Home & Garden", value: 72000, percentage: 10, color: "#FF8042" },
  { name: "Others", value: 36000, percentage: 5, color: "#8884D8" },
]

export const recentTransactions = [
  {
    id: 1,
    type: "Sale",
    description: "iPhone 15 Pro - Order #12345",
    amount: 999,
    status: "Completed",
    date: "2024-01-15",
    customer: "John Doe",
  },
  {
    id: 2,
    type: "Refund",
    description: "Samsung Galaxy S24 - Order #12344",
    amount: -899,
    status: "Processed",
    date: "2024-01-14",
    customer: "Jane Smith",
  },
  {
    id: 3,
    type: "Sale",
    description: "MacBook Air M3 - Order #12343",
    amount: 1299,
    status: "Completed",
    date: "2024-01-14",
    customer: "Mike Johnson",
  },
  {
    id: 4,
    type: "Sale",
    description: "Nike Air Max - Order #12342",
    amount: 120,
    status: "Completed",
    date: "2024-01-13",
    customer: "Sarah Wilson",
  },
  {
    id: 5,
    type: "Sale",
    description: "Coffee Maker Pro - Order #12341",
    amount: 199,
    status: "Pending",
    date: "2024-01-13",
    customer: "Tom Brown",
  },
]

export const paymentMethods = [
  { method: "Credit Card", amount: 450000, percentage: 65, transactions: 2340 },
  { method: "PayPal", amount: 138000, percentage: 20, transactions: 890 },
  { method: "Bank Transfer", amount: 69000, percentage: 10, transactions: 234 },
  { method: "Digital Wallet", amount: 34500, percentage: 5, transactions: 156 },
]