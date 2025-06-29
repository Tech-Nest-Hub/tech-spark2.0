"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, Users, MapPin, ArrowRight, Zap, Leaf, BookOpen, Coffee, Truck, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Navbar from "../user/Navbar"

// Mock data for startups
const startups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    tagline: "Sustainable campus living made simple",
    description:
      "Revolutionary eco-friendly products designed specifically for college students. From biodegradable study supplies to solar-powered dorm accessories.",
    founder: "Alex Chen",
    category: "Sustainability",
    rating: 4.8,
    reviews: 124,
    students: 2340,
    location: "Stanford University",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=60&width=60",
    tags: ["Eco-Friendly", "Dorm Life", "Solar Tech"],
    featured: true,
    verified: true,
    color: "from-green-500 to-emerald-600",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "StudyBuddy AI",
    tagline: "Your intelligent study companion",
    description:
      "AI-powered study tools that adapt to your learning style. Smart flashcards, personalized study schedules, and collaborative learning features.",
    founder: "Sarah Johnson",
    category: "EdTech",
    rating: 4.9,
    reviews: 89,
    students: 1890,
    location: "MIT",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=60&width=60",
    tags: ["AI", "Study Tools", "Collaboration"],
    featured: true,
    verified: true,
    color: "from-blue-500 to-purple-600",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "Campus Delivery Co",
    tagline: "Fast delivery across campus",
    description:
      "Lightning-fast delivery service connecting students with local restaurants, bookstores, and essential supplies. 15-minute delivery guarantee.",
    founder: "Mike Rodriguez",
    category: "Logistics",
    rating: 4.6,
    reviews: 203,
    students: 3120,
    location: "UC Berkeley",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=60&width=60",
    tags: ["Delivery", "Food", "Essentials"],
    featured: false,
    verified: true,
    color: "from-orange-500 to-red-600",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "CampusCafe Connect",
    tagline: "Discover hidden gems on campus",
    description:
      "Social platform connecting students with the best local cafes, study spots, and food trucks. Real-time availability and student reviews.",
    founder: "Emma Wilson",
    category: "Social",
    rating: 4.7,
    reviews: 156,
    students: 2680,
    location: "Harvard University",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=60&width=60",
    tags: ["Social", "Food", "Discovery"],
    featured: false,
    verified: true,
    color: "from-amber-500 to-orange-600",
    icon: <Coffee className="w-6 h-6" />,
  },
  {
    id: 5,
    name: "TechMentor Platform",
    tagline: "Connect with industry experts",
    description:
      "Bridging the gap between students and tech professionals. One-on-one mentorship, career guidance, and networking opportunities.",
    founder: "David Park",
    category: "Career",
    rating: 4.9,
    reviews: 78,
    students: 1450,
    location: "Carnegie Mellon",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=60&width=60",
    tags: ["Mentorship", "Career", "Networking"],
    featured: true,
    verified: true,
    color: "from-purple-500 to-pink-600",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 6,
    name: "FitCampus Health",
    tagline: "Wellness made accessible",
    description:
      "Comprehensive health and fitness platform for students. Virtual workouts, mental health resources, and campus gym integration.",
    founder: "Lisa Wang",
    category: "Health",
    rating: 4.5,
    reviews: 92,
    students: 1780,
    location: "UCLA",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=60&width=60",
    tags: ["Fitness", "Mental Health", "Wellness"],
    featured: false,
    verified: true,
    color: "from-pink-500 to-rose-600",
    icon: <Heart className="w-6 h-6" />,
  },
]

const categories = ["All", "Sustainability", "EdTech", "Logistics", "Social", "Career", "Health"]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || startup.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredStartups = filteredStartups.filter((startup) => startup.featured)
  const regularStartups = filteredStartups.filter((startup) => !startup.featured)

  return (

    <>
        <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Campus Startups
              </span>
            </motion.h1>
           
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "hover:bg-blue-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Startups */}
        {featuredStartups.length > 0 && (
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
            >
              <Zap className="w-6 h-6 text-yellow-500" />
              Featured Startups
            </motion.h2>
            <div className="grid grid-cols-1 gap-8">
              {featuredStartups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(startup.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Link href={`/marketplace/${startup.id}`}>
                    <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row">
                          {/* Image Section */}
                      

                          {/* Content Section */}
                          <div className="lg:w-2/3 p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${startup.color} flex items-center justify-center text-white shadow-lg`}
                                >
                                  {startup.icon}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{startup.name}</h3>
                                  <p className="text-blue-600 font-medium">{startup.tagline}</p>
                                </div>
                              </div>
                              <motion.div
                                animate={{
                                  x: hoveredCard === startup.id ? 5 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ArrowRight className="w-6 h-6 text-gray-400" />
                              </motion.div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">{startup.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                              {startup.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold text-gray-900">{startup.rating}</span>
                                  <span className="text-gray-500">({startup.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Users className="w-4 h-4" />
                                  <span>{startup.students.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <MapPin className="w-4 h-4" />
                                  <span>{startup.location}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Founded by</p>
                                <p className="font-semibold text-gray-900">{startup.founder}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Startups */}
        {regularStartups.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              All Startups
            </motion.h2>
            <div className="grid grid-cols-1 gap-6">
              {regularStartups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (featuredStartups.length + index) * 0.1 }}
                  onHoverStart={() => setHoveredCard(startup.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Link href={`/marketplace/${startup.id}`}>
                    <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Image Section */}
                          <div className="sm:w-1/3 relative overflow-hidden">
                            <motion.div
                              animate={{
                                scale: hoveredCard === startup.id ? 1.05 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                              className="h-48 sm:h-full"
                            >
                              <img
                                src={startup.image || "/placeholder.svg"}
                                alt={startup.name}
                                className="w-full h-full object-cover"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-r ${startup.color} opacity-20`}></div>
                            </motion.div>
                            {startup.verified && (
                              <div className="absolute top-4 right-4">
                                <Badge className="bg-blue-500 text-white hover:bg-blue-500">Verified</Badge>
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="sm:w-2/3 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${startup.color} flex items-center justify-center text-white shadow-md`}
                                >
                                  {startup.icon}
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">{startup.name}</h3>
                                  <p className="text-blue-600 font-medium text-sm">{startup.tagline}</p>
                                </div>
                              </div>
                              <motion.div
                                animate={{
                                  x: hoveredCard === startup.id ? 5 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                              </motion.div>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{startup.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {startup.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold text-gray-900 text-sm">{startup.rating}</span>
                                  <span className="text-gray-500 text-sm">({startup.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600 text-sm">
                                  <Users className="w-4 h-4" />
                                  <span>{startup.students.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">by {startup.founder}</p>
                                <p className="text-xs text-gray-600">{startup.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredStartups.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No startups found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              variant="outline"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
    </>
    

  
  )
}
