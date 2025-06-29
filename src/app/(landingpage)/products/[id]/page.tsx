"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Star, ShoppingCart, Heart, MessageCircle, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckoutSidebar } from "@/components/Checkout-sidebar"
import Navbar from "../../user/Navbar"


const productData = {
    1: {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        images: [
            "/placeholder.svg?height=500&width=500",
            "/placeholder.svg?height=500&width=500",
            "/placeholder.svg?height=500&width=500",
        ],
        genre: "Electronics",
        rating: 4.5,
        reviews: 128,
        description:
            "Premium wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.",
        features: ["Noise Cancellation", "30-hour battery", "Bluetooth 5.0", "Quick charge"],
        inStock: true,
    },
}

const reviews = [
    {
        id: 1,
        user: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Amazing sound quality! The noise cancellation works perfectly.",
        date: "2024-01-15",
        likes: 12,
    },
    {
        id: 2,
        user: "Sarah Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment: "Great headphones, but the price is a bit high. Overall satisfied with the purchase.",
        date: "2024-01-10",
        likes: 8,
    },
    {
        id: 3,
        user: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Best headphones I've ever owned. The battery life is incredible!",
        date: "2024-01-05",
        likes: 15,
    },
]

const comments = [
    {
        id: 1,
        user: "Alice Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        comment: "Does anyone know if these work well for gaming?",
        date: "2024-01-20",
        replies: [
            {
                id: 1,
                user: "Bob Wilson",
                avatar: "/placeholder.svg?height=40&width=40",
                comment: "Yes! I use them for gaming and they're fantastic.",
                date: "2024-01-21",
            },
        ],
    },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [newComment, setNewComment] = useState("")
    const [showCheckout, setShowCheckout] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const detailsRef = useRef<HTMLDivElement>(null)

    const product = productData[params.id as unknown as keyof typeof productData] || productData[1]

    useEffect(() => {
        // GSAP Loading Animation
        const tl = gsap.timeline()

        tl.fromTo(imageRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
            .fromTo(
                detailsRef.current,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6",
            )
            .fromTo(
                ".review-card",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                "-=0.4",
            )
    }, [])

    const addToCart = () => {
        setShowCheckout(true)
        gsap.fromTo(".checkout-sidebar", { x: "100%" }, { x: 0, duration: 0.5, ease: "power2.out" })
    }

    return (
        <>
        <Navbar/>
            <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Link href="/products" className="text-primary hover:underline">
                            Products
                        </Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <span className="text-gray-700">{product.name}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-12">
                        {/* Product Images */}
                        <div ref={imageRef} className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
                                <Image
                                    src={product.images[selectedImage] || "/placeholder.svg"}
                                    alt={product.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-gray-200"
                                            }`}
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.name} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div ref={detailsRef} className="space-y-6">
                            <div>
                                <Badge className="mb-2">{product.genre}</Badge>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">({product.reviews} reviews)</span>
                                </div>
                                <p className="text-4xl font-bold text-primary mb-4">${product.price}</p>
                                <p className="text-gray-700 mb-6">{product.description}</p>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="font-semibold mb-3">Key Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Add to Cart */}
                            <div className="flex gap-4">
                                <Button size="lg" onClick={addToCart} className="flex-1" disabled={!product.inStock}>
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                                </Button>
                                <Button size="lg" variant="outline">
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <Card key={review.id} className="review-card">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                                <AvatarFallback>{review.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-semibold">{review.user}</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">{review.date}</span>
                                                </div>
                                                <p className="text-gray-700 mb-2">{review.comment}</p>
                                                <Button variant="ghost" size="sm">
                                                    <ThumbsUp className="w-4 h-4 mr-1" />
                                                    {review.likes}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Questions & Comments</h2>

                        {/* Add Comment */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <Textarea
                                    placeholder="Ask a question or leave a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="mb-4"
                                />
                                <Button>
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Post Comment
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <Card key={comment.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                                <AvatarFallback>{comment.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-semibold">{comment.user}</h4>
                                                    <span className="text-sm text-gray-500">{comment.date}</span>
                                                </div>
                                                <p className="text-gray-700 mb-4">{comment.comment}</p>

                                                {/* Replies */}
                                                {comment.replies && comment.replies.length > 0 && (
                                                    <div className="ml-8 space-y-3">
                                                        <Separator />
                                                        {comment.replies.map((reply) => (
                                                            <div key={reply.id} className="flex items-start gap-3">
                                                                <Avatar className="w-8 h-8">
                                                                    <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                                                    <AvatarFallback>{reply.user[0]}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <h5 className="font-medium text-sm">{reply.user}</h5>
                                                                        <span className="text-xs text-gray-500">{reply.date}</span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700">{reply.comment}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Checkout Sidebar */}
                {showCheckout && (
                    <CheckoutSidebar
                        product={product}
                        quantity={quantity}
                        onClose={() => setShowCheckout(false)}
                        onQuantityChange={setQuantity}
                    />
                )}
            </div>
        </>
    )
}
