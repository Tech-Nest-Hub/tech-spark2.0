"use client";

import { useState } from "react";
import { X, Plus, Minus, CreditCard, Truck } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  inStock: boolean;
}

interface CheckoutSidebarProps {
  product: Product;
  quantity: number;
  onClose: () => void;
  onQuantityChange: (quantity: number) => void;
}

export function CheckoutSidebar({
  product,
  quantity,
  onClose,
  onQuantityChange,
}: CheckoutSidebarProps) {
  const [shippingMethod, setShippingMethod] = useState("standard");
  console.log("CheckoutSidebar product:", product);
  const subtotal = product.price * quantity;
  const shipping = shippingMethod === "express" ? 15.99 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const handleEsewaPay = async (productId: string) => {
    console.log("Initiating eSewa payment for product ID:", productId);
    const res = await fetch("/api/esewa/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    window.location.href = data.redirect;
  };

  return (
    <div className="checkout-sidebar fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Checkout</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Product Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-primary">
                  ${product.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-3">
                  <Label>Qty:</Label>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onQuantityChange(Math.max(1, quantity - 1))
                      }
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="px-3 py-1 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onQuantityChange(quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Options */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Shipping Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={shippingMethod} onValueChange={setShippingMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  Standard Shipping - $5.99 (5-7 days)
                </SelectItem>
                <SelectItem value="express">
                  Express Shipping - $15.99 (2-3 days)
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({quantity} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={() => handleEsewaPay(product.id.toString())}
          className="w-full"
          size="lg"
        >
          Complete Purchase - ${total.toFixed(2)}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure checkout powered by Stripe. Your payment information is
          encrypted and secure.
        </p>
      </div>
    </div>
  );
}
