"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Store, ShoppingBag, Users, TrendingUp, Package, CreditCard, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "../user/Navbar"

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
             
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                How would you like to
                <br />
                <span className="text-gray-700">join Techspire?</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're looking to sell your innovative products or discover amazing student-made solutions, we
                have the perfect experience for you.
              </p>
            </motion.div>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Seller Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href="/sign-in?role=admin">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full cursor-pointer">
                    {/* Animated Icon Area */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Store className="w-10 h-10 text-white" />
                      </div>

                      {/* Floating Elements */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
                      >
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
                      >
                        <Package className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">I'm a Seller</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Showcase your startup, sell your products, and connect with the campus community. Perfect for
                        student entrepreneurs ready to grow their business.
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8 text-left">
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Create your storefront</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Manage inventory & orders</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Access analytics & insights</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Connect with mentors</span>
                        </div>
                      </div>

                      <Button className="w-full hover:cursor-pointer bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-semibold group-hover:bg-gray-800 transition-colors">
                        Start Selling
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Buyer Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href="/sign-in?role=user">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full cursor-pointer">
                    {/* Animated Icon Area */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <ShoppingBag className="w-10 h-10 text-white" />
                      </div>

                      {/* Floating Elements */}
                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          rotate: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-2 -left-2 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 text-purple-600" />
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -6, 0],
                          rotate: [0, 8, 0],
                        }}
                        transition={{
                          duration: 3.2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 0.8,
                        }}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"
                      >
                        <CreditCard className="w-4 h-4 text-orange-600" />
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">I'm a Buyer</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Discover innovative products from student entrepreneurs. Support campus startups and find unique
                        solutions made by your peers.
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8 text-left">
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Browse student startups</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Secure payment system</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Track orders & reviews</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">Support student innovation</span>
                        </div>
                      </div>

                      <Button className="w-full hover:cursor-pointer bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-semibold group-hover:bg-gray-800 transition-colors">
                        Start Shopping
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Bottom Section */}
       
          </div>
        </section>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-32 h-32 border border-gray-300 rounded-full"
          />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-24 h-24 border border-gray-300 rounded-full"
          />
        </div>
      </div>
    </>
  )
}
