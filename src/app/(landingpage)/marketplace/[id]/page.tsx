"use client"

import { useState } from "react"
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

const startup = {
  id: 1,
  name: "EcoTech Solutions",
  tagline: "Sustainable campus living made simple",
  description:
    "Revolutionary eco-friendly products designed specifically for college students...",
  longDescription:
    "EcoTech Solutions was born from a simple observation: college students want to live sustainably...",
  founder: {
    name: "Alex Chen",
    title: "Founder & CEO",
    bio: "Environmental Engineering student at Stanford with a passion for sustainable innovation...",
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
}

export default function StartupDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Rest of your JSX remains unchanged... */}

      {/* Just remember to update one line inside the header gradient badge: */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${startup.color} flex items-center justify-center text-white shadow-lg`}
      >
        <Star className="w-5 h-5" />
      </div>
    </div>
  )
}
