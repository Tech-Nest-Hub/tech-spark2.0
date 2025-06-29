"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Target,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { websiteTraffic, competitorAnalysis, customerSegments, marketingChannels, productPerformance, salesFunnel, } from "./data"



export default function AnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  // Calculate key metrics
  const totalVisitors = websiteTraffic.reduce((sum, day) => sum + day.visitors, 0)
  const totalPageViews = websiteTraffic.reduce((sum, day) => sum + day.pageViews, 0)
  const avgBounceRate = websiteTraffic.reduce((sum, day) => sum + day.bounceRate, 0) / websiteTraffic.length
  const avgConversionRate = websiteTraffic.reduce((sum, day) => sum + day.conversionRate, 0) / websiteTraffic.length

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Analysis</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Business Analysis</h1>
            <p className="text-muted-foreground">Comprehensive insights and analytics for data-driven decisions</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Avg: {(totalPageViews / totalVisitors).toFixed(1)} per visitor
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgBounceRate.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Industry avg: 2.1%</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="traffic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="sales">Sales Funnel</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Website Traffic Trends</CardTitle>
                  <CardDescription>Daily visitors and page views over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={websiteTraffic}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="Visitors"
                      />
                      <Area
                        type="monotone"
                        dataKey="pageViews"
                        stackId="2"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        name="Page Views"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Bounce rate and conversion rate trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={websiteTraffic}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="bounceRate"
                        stroke="#ff7c7c"
                        name="Bounce Rate (%)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="conversionRate"
                        stroke="#82ca9d"
                        name="Conversion Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Funnel Analysis</CardTitle>
                <CardDescription>Customer journey from visitor to purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesFunnel.map((stage, index) => (
                    <div key={stage.stage} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stage.stage}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{stage.count.toLocaleString()}</span>
                          <Badge variant="outline">{stage.percentage}%</Badge>
                        </div>
                      </div>
                      <Progress value={stage.percentage} className="h-2" />
                      {index < salesFunnel.length - 1 && (
                        <p className="text-xs text-muted-foreground">
                          Drop-off:{" "}
                          {(
                            ((salesFunnel[index].count - salesFunnel[index + 1].count) / salesFunnel[index].count) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Distribution of customer types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ segment, percentage }) => `${segment} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segment Performance</CardTitle>
                  <CardDescription>Revenue and order value by segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegments.map((segment) => (
                      <div key={segment.segment} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{segment.segment}</p>
                          <p className="text-sm text-muted-foreground">{segment.count.toLocaleString()} customers</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${segment.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Avg: ${segment.avgOrder}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance Analysis</CardTitle>
                <CardDescription>Sales, revenue, and profitability by product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance.map((product) => (
                    <div key={product.product} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.product}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Sales: {product.sales}</span>
                          <span>Rating: {product.rating}⭐</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.revenue.toLocaleString()}</p>
                        <p className="text-sm text-green-600">Profit: ${product.profit.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Channel Performance</CardTitle>
                <CardDescription>Traffic, conversions, and ROI by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketingChannels.map((channel) => (
                    <div key={channel.channel} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{channel.channel}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Visitors: {channel.visitors.toLocaleString()}</span>
                          <span>Conversions: {channel.conversions}</span>
                          <span>Cost: ${channel.cost.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={channel.roi === "∞" ? "default" : "outline"}>ROI: {channel.roi}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          CVR: {((channel.conversions / channel.visitors) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>Performance comparison with key competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={competitorAnalysis}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Our Company" dataKey="us" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Radar
                      name="Competitor 1"
                      dataKey="competitor1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Competitor 2"
                      dataKey="competitor2"
                      stroke="#ffc658"
                      fill="#ffc658"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insights and Recommendations */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <p className="text-sm">Conversion rate improved by 0.8% this period, exceeding industry average</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm">Email marketing shows highest ROI at 600% among all channels</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                <p className="text-sm">VIP customers generate 30% of revenue despite being only 13% of customer base</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <p className="text-sm">Focus on reducing bounce rate through improved landing page optimization</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <p className="text-sm">Increase investment in email marketing given its exceptional ROI performance</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <p className="text-sm">
                  Develop VIP customer retention programs to maximize high-value segment revenue
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
