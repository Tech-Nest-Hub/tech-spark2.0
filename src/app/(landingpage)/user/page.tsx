"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Search,
} from "lucide-react";

import axios from "axios";
import { useClerk, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { FloatingCards, } from "./data";


export default function TechspireMarketplace() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cardsSpread, setCardsSpread] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsSpread(true);
    }, 2000); // Wait 2 seconds after initial animation
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    async function syncUser() {
      try {
        await axios.post("/api/sync-user?role=USER");
      } catch (error) {
        console.log("failed to sync");
      }
    }
    syncUser();
  }, []);

  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Techspire</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="./"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </a>

              <a
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Products
              </a>
              <a
                href="#tracks"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pages
              </a>
            </div>
            {user ? (
              <Button
                onClick={() => handleLogout()}
                className=" hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Log out
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/roles")}
                className=" hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
              </Button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-2">
              <a
                href="#home"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </a>
              <a
                href="#features"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#tracks"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                About
              </a>
              <Button
                onClick={() => router.push("/roles")}
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
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
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                Empowering Campus Commerce
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              A digital platform for college startups to connect, showcase, and
              grow within a thriving campus ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 justify-center mb-16"
            >
             

              <Input
                type="text"
                placeholder="Search for products or startups..."
                className="w-full sm:w-80 bg-white border border-gray-300 rounded-lg px-4 py-4  focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              />

              <button className="border border-slate-500 cursor-pointer rounded-full p-2"><Search className="w-5 h-4 " /></button>

              

            </motion.div>

            {/* Floating Cards Animation */}
            <div className=" hidden relative h-96 md:flex items-center justify-center">
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
                    scale: 1.05,
                    rotate: card.rotation + 5,
                    transition: { duration: 0.2 },
                  }}
                  className="absolute w-32 h-20 sm:w-40 sm:h-24 rounded-lg shadow-lg cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${
                      card.id % 2 === 0
                        ? "rgb(59, 130, 246), rgb(147, 51, 234)"
                        : "rgb(16, 185, 129), rgb(6, 182, 212)"
                    })`,
                  }}
                >
                  <div className="w-full h-full rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
              Startups can showcase their innovations, and students can discover
              amazing products and services.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold">Techspire Marketplace</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering campus commerce through innovative digital solutions
                for student entrepreneurs.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Techspire Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
