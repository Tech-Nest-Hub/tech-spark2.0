"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  ChevronRight,
  Search,
  Star,
  Heart,
  ShoppingCart,
  TrendingUp,
  Zap,
  ArrowRight,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { categories, FloatingCards, topPicks, trendingProducts } from "./data"
import Navbar from "./Navbar"

export default function TechspireMarketplace() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [cardsSpread, setCardsSpread] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsSpread(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-slide for trending carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(trendingProducts.length / 3))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(trendingProducts.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + Math.ceil(trendingProducts.length / 3)) % Math.ceil(trendingProducts.length / 3),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
     <Navbar/>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Build{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Techspire Marketplace
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">Empowering Campus Commerce</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              A digital platform for college startups to connect, showcase, and grow within a thriving campus ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 justify-center mb-16 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for products or startups..."
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Enhanced Floating Cards Animation */}
            <div className="hidden relative h-96 md:flex items-center justify-center">
              {FloatingCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: card.rotation,
                    x: cardsSpread ? card.finalX : card.centerX,
                    y: cardsSpread ? card.finalY : card.centerY,
                  }}
                  transition={{
                    duration: cardsSpread ? 0.8 : 1,
                    delay: cardsSpread ? card.delay * 0.1 : card.delay,
                    type: "spring",
                    stiffness: cardsSpread ? 120 : 100,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: card.rotation + 5,
                    transition: { duration: 0.2 },
                  }}
                  className="absolute w-32 h-20 sm:w-40 sm:h-24 rounded-xl shadow-xl cursor-pointer backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${
                      card.id % 2 === 0
                        ? "rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)"
                        : "rgba(16, 185, 129, 0.9), rgba(6, 182, 212, 0.9)"
                    })`,
                  }}
                >
                  <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <div className="text-white font-semibold text-xs sm:text-sm text-center px-2">
                      {card.id === 1 && "Startup Portal"}
                      {card.id === 2 && "Student Market"}
                      {card.id === 3 && "Digital Wallet"}
                      {card.id === 4 && "Mentor Connect"}
                      {card.id === 5 && "Analytics"}
                      {card.id === 6 && "Sustainability"}
                      {card.id === 7 && "Campus Hub"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-gray-600 mt-8"
            >
              Startups can showcase their innovations, and students can discover amazing products and services.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the hottest products from campus startups that everyone's talking about
            </p>
          </motion.div>

          {/* Trending Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(trendingProducts.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trendingProducts.slice(slideIndex * 3, slideIndex * 3 + 3).map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className="group"
                        >
                          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="relative">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <Badge
                                className={`absolute top-3 left-3 ${
                                  product.badge === "Trending"
                                    ? "bg-red-500"
                                    : product.badge === "Hot"
                                      ? "bg-orange-500"
                                      : product.badge === "New"
                                        ? "bg-green-500"
                                        : product.badge === "Popular"
                                          ? "bg-blue-500"
                                          : "bg-purple-500"
                                }`}
                              >
                                {product.badge}
                              </Badge>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{product.rating}</span>
                                <span className="text-sm text-gray-500">({product.reviews})</span>
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                              <p className="text-sm text-gray-600 mb-3">by {product.startup}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(trendingProducts.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Top Picks</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-selected premium products that deliver exceptional value for students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPicks.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {product.startup}</p>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">{product.price}</span>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of products across different categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} products</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg">
              View All Categories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
