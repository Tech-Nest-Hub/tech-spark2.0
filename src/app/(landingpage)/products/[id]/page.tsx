"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Star,
  ShoppingCart,
  Heart,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckoutSidebar } from "@/components/Checkout-sidebar";
import Navbar from "../../user/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";

const reviews = [
  {
    id: 1,
    user: "John Doe",
    avatar: "/placeholder.svg",
    rating: 5,
    comment: "Amazing sound quality! The noise cancellation works perfectly.",
    date: "2024-01-15",
    likes: 12,
  },
];

const comments = [
  {
    id: 1,
    user: "Alice Brown",
    avatar: "/placeholder.svg",
    comment: "Does anyone know if these work well for gaming?",
    date: "2024-01-20",
    replies: [],
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const [rawProduct, setRawProduct] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProduct() {
      const id = params.id;
      try {
        const res = await axios(`/api/products/${id}`);
        console.log("Fetched product data:", res.data);
        setRawProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    }
    fetchProduct();
  }, []);

  const product = rawProduct
    ? {
        id: rawProduct.id,
        name: rawProduct.name,
        images: [rawProduct.photo],
        genre: rawProduct.tag || "General",
        price: rawProduct.amount || 0,
        rating: rawProduct.rating || 0,
        reviews: rawProduct.reviews || 0,
        description: "Eco friendly and high quality product.",
        features: rawProduct.ecoFriendly ? ["Eco Friendly"] : [],
        inStock: true,
      }
    : null;

  useEffect(() => {
    if (!imageRef.current || !detailsRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    )
      .fromTo(
        detailsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".review-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
      );
  }, [rawProduct]);

  const addToCart = () => {
    setShowCheckout(true);
    gsap.fromTo(".checkout-sidebar", { x: "100%" }, { x: 0, duration: 0.5 });
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <Link href="/products" className="text-primary hover:underline">
              Products
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div ref={imageRef} className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
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
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-gray-200"
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

            <div ref={detailsRef} className="space-y-6">
              <div>
                <Badge className="mb-2">{product.genre}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <p className="text-4xl font-bold text-primary mb-4">
                  ${product.price}
                </p>
                <p className="text-gray-700 mb-6">{product.description}</p>
              </div>

              {product.features.length > 0 && (
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
              )}

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={addToCart}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="review-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{review.user}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
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

          <div>
            <h2 className="text-2xl font-bold mb-6">Questions & Comments</h2>
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
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{comment.user}</h4>
                          <span className="text-sm text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{comment.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
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
  );
}
