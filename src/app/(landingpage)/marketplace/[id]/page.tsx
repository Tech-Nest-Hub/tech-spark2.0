"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Star,
  Users,
  MapPin,
  Globe,
  Mail,
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  Calendar,
  Award,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock startup data (in a real app, this would come from an API)
const startupData = {
  1: {
    id: 1,
    name: "EcoTech Solutions",
    tagline: "Sustainable campus living made simple",
    description:
      "Revolutionary eco-friendly products designed specifically for college students. From biodegradable study supplies to solar-powered dorm accessories, we're making sustainability accessible and affordable for the next generation.",
    longDescription:
      "EcoTech Solutions was born from a simple observation: college students want to live sustainably, but existing eco-friendly products are often too expensive or impractical for dorm life. Our mission is to bridge this gap by creating innovative, affordable, and student-focused sustainable products.\n\nOur product line includes solar-powered desk lamps, biodegradable notebooks made from agricultural waste, reusable water bottles with smart hydration tracking, and modular storage solutions made from recycled materials. Each product is designed with the unique constraints and needs of student life in mind.",
    founder: {
      name: "Alex Chen",
      title: "Founder & CEO",
      bio: "Environmental Engineering student at Stanford with a passion for sustainable innovation. Previously interned at Tesla's energy division.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    category: "Sustainability",
    rating: 4.8,
    reviews: 124,
    students: 2340,
    location: "Stanford University",
    founded: "2023",
    website: "https://ecotech-solutions.com",
    email: "hello@ecotech-solutions.com",
    phone: "+1 (555) 123-4567",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=100",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    tags: ["Eco-Friendly", "Dorm Life", "Solar Tech", "Sustainable"],
    featured: true,
    verified: true,
    color: "from-green-500 to-emerald-600",
    products: [
      {
        id: 1,
        name: "Solar Study Lamp",
        price: "$49.99",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.9,
        reviews: 45,
      },
      {
        id: 2,
        name: "Eco Notebook Set",
        price: "$24.99",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        reviews: 32,
      },
      {
        id: 3,
        name: "Smart Water Bottle",
        price: "$34.99",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        reviews: 28,
      },
    ],
    achievements: [
      "Winner - Stanford Sustainability Challenge 2023",
      "Featured in TechCrunch",
      "1000+ Products Sold",
      "Carbon Neutral Certified",
    ],
    stats: {
      totalSales: "2,340",
      monthlyGrowth: "+23%",
      customerSatisfaction: "98%",
      productsLaunched: "12",
    },
  },
  // Add more startup data as needed
}

export default function StartupDetailPage() {
  const params = useParams()
  const startupId = Number.parseInt(params.id as string)
  const [startup, setStartup] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    const data = startupData[startupId]
    setStartup(data || null)
  }, [startupId])

  if (!startup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading startup details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/marketplace">
              <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${startup.color} flex items-center justify-center text-white shadow-lg`}
              >
               
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
                <p className="text-blue-600 font-medium">{startup.tagline}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-200 bg-red-50" : ""}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-0">
                
                <div className="p-4">
                 
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>About {startup.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{startup.longDescription}</p>

                    <div className="flex flex-wrap gap-2">
                      {startup.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {startup.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                          <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {startup.products.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4">
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Reviews will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Startup Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Startup Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{startup.rating}</span>
                  </div>
                  <span className="text-gray-600">({startup.reviews} reviews)</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{startup.students.toLocaleString()} students served</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{startup.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Founded in {startup.founded}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={startup.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={`mailto:${startup.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Founder Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Meet the Founder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="w-16 h-16 ring-2 ring-white shadow-lg">
                  
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      {startup.founder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{startup.founder.name}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-2">{startup.founder.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{startup.founder.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{startup.stats.totalSales}</p>
                    <p className="text-xs text-gray-600">Total Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{startup.stats.monthlyGrowth}</p>
                    <p className="text-xs text-gray-600">Monthly Growth</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{startup.stats.customerSatisfaction}</p>
                    <p className="text-xs text-gray-600">Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{startup.stats.productsLaunched}</p>
                    <p className="text-xs text-gray-600">Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
