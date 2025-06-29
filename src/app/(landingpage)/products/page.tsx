"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Search, Filter, Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "../user/Navbar"

const genres = ["All", "Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Beauty"]

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    genre: "Electronics",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    genre: "Clothing",
    rating: 4.2,
    reviews: 89,
  },
  {
    id: 3,
    name: "JavaScript Guide",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    genre: "Books",
    rating: 4.8,
    reviews: 256,
  },
  {
    id: 4,
    name: "Garden Tools Set",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    genre: "Home & Garden",
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    genre: "Sports",
    rating: 4.6,
    reviews: 194,
  },
  {
    id: 6,
    name: "Face Cream",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    genre: "Beauty",
    rating: 4.4,
    reviews: 112,
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Loading Animation
    const tl = gsap.timeline()

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    ).fromTo(
      ".product-card",
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4",
    )
  }, [])

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === "All" || product.genre === selectedGenre
      return matchesSearch && matchesGenre
    })
    setFilteredProducts(filtered)

    // Animate filtered results
    gsap.fromTo(".product-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 })
  }, [searchTerm, selectedGenre])

  return (
    <>
    <Navbar/>
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <p className="text-gray-600">Discover amazing products across all categories</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Genre Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 right-2 bg-white text-black">{product.genre}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">${product.price}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <Button className="w-full bg-transparent" variant="outline">
                    View Details
                  </Button>
                </Link>
                <Button size="icon">
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
