"use client"

import { useState } from "react"
import { Star, Search, MoreVertical, TrendingUp, TrendingDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock data for products with feedback
const products = [
  {
    id: 1,
    name: "EcoSmart Water Bottle",
    image: "/placeholder.svg?height=60&width=60",
    category: "Sustainability",
    totalFeedback: 24,
    averageRating: 4.8,
    newFeedback: 3,
    trend: "up",
  },
  {
    id: 2,
    name: "StudyBuddy Planner",
    image: "/placeholder.svg?height=60&width=60",
    category: "Education",
    totalFeedback: 18,
    averageRating: 4.6,
    newFeedback: 2,
    trend: "up",
  },
  {
    id: 3,
    name: "Campus Delivery Service",
    image: "/placeholder.svg?height=60&width=60",
    category: "Logistics",
    totalFeedback: 31,
    averageRating: 4.2,
    newFeedback: 1,
    trend: "down",
  },
  {
    id: 4,
    name: "GreenCampus Kit",
    image: "/placeholder.svg?height=60&width=60",
    category: "Sustainability",
    totalFeedback: 15,
    averageRating: 4.9,
    newFeedback: 0,
    trend: "up",
  },
  {
    id: 5,
    name: "TechMentor Sessions",
    image: "/placeholder.svg?height=60&width=60",
    category: "Education",
    totalFeedback: 42,
    averageRating: 4.7,
    newFeedback: 5,
    trend: "up",
  },
]

// Mock feedback data for products
const productFeedback = {
  1: [
    {
      id: 1,
      sender: "Emma Thompson",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      message:
        "Absolutely love this water bottle! The temperature control is amazing and it's helped me stay hydrated throughout my long study sessions. The design is sleek and fits perfectly in my backpack. 💧",
      timestamp: "2 hours ago",
      verified: true,
    },
    {
      id: 2,
      sender: "James Wilson",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      message:
        "Best purchase I've made this semester! The eco-friendly materials make me feel good about my environmental impact. Plus, it keeps my drinks cold for hours.",
      timestamp: "1 day ago",
      verified: true,
    },
    {
      id: 3,
      sender: "Sofia Martinez",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      message:
        "Great product overall. The only minor issue is that it's a bit heavy when full, but the quality makes up for it. Would definitely recommend to other students!",
      timestamp: "3 days ago",
      verified: false,
    },
    {
      id: 4,
      sender: "Alex Chen",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      message:
        "This bottle has been a game-changer for my campus life. The smart features are intuitive and the battery life is excellent. Worth every penny! 🌟",
      timestamp: "1 week ago",
      verified: true,
    },
  ],
  2: [
    {
      id: 1,
      sender: "Rachel Green",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      message:
        "The StudyBuddy Planner has completely transformed how I organize my academic life. The layout is perfect and the goal-tracking features keep me motivated! 📚",
      timestamp: "4 hours ago",
      verified: true,
    },
    {
      id: 2,
      sender: "Michael Brown",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      message:
        "Really helpful for keeping track of assignments and deadlines. The design is clean and user-friendly. Would love to see more customization options in future updates.",
      timestamp: "2 days ago",
      verified: true,
    },
    {
      id: 3,
      sender: "Lisa Wang",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      message:
        "As a grad student, this planner has been essential for managing my research schedule and coursework. The habit tracker is my favorite feature!",
      timestamp: "5 days ago",
      verified: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "David Kim",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      message:
        "The delivery service is generally reliable and fast. Had one delayed order last week, but customer service was quick to resolve it. Overall satisfied with the service.",
      timestamp: "6 hours ago",
      verified: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      message:
        "Super convenient for getting food delivered between classes. The app is easy to use and delivery times are usually accurate. Great for busy students! 🚚",
      timestamp: "1 day ago",
      verified: true,
    },
    {
      id: 3,
      sender: "Tom Anderson",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      message:
        "Service is okay but could be improved. Sometimes the delivery takes longer than expected, especially during peak hours. The food quality is good though.",
      timestamp: "4 days ago",
      verified: false,
    },
  ],
}

export default function FeedbackPage() {
  const [selectedProduct, setSelectedProduct] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const selectedProductData = products.find((p) => p.id === selectedProduct)
  const currentFeedback = productFeedback[selectedProduct] || []

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin" className="text-blue-600 hover:text-blue-800">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Product Feedback</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Products List */}
     

        {/* Feedback Area */}
        <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
          {selectedProductData ? (
            <>
              {/* Product Header */}
              {/* <div className="p-4 border-b bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProductData.image || "/placeholder.svg"}
                      alt={selectedProductData.name}
                      className="w-12 h-12 rounded-lg object-cover ring-2 ring-white shadow-sm"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedProductData.name}</h2>
                      <p className="text-sm text-blue-600 font-medium">{selectedProductData.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {renderStars(Math.floor(selectedProductData.averageRating))}
                        </div>
                        <span className={`text-sm font-semibold ${getRatingColor(selectedProductData.averageRating)}`}>
                          {selectedProductData.averageRating}
                        </span>
                        <span className="text-xs text-gray-500">({selectedProductData.totalFeedback} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-gray-600 hover:text-blue-600">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div> */}

              {/* Feedback Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/20 to-blue-50/20">
                {currentFeedback.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                        <AvatarImage src={feedback.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {feedback.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{feedback.sender}</h3>
                            {feedback.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700 hover:bg-green-100"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{feedback.timestamp}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">{renderStars(feedback.rating)}</div>
                          <span className={`text-sm font-semibold ${getRatingColor(feedback.rating)}`}>
                            {feedback.rating}.0
                          </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white/40 to-blue-50/40">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a product</h3>
                <p className="text-gray-600">Choose a product from the list to view customer feedback</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
