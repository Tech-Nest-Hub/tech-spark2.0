"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  Users,
  CreditCard,
  BarChart3,
  Leaf,
  UserCheck,
  Zap,
  Shield,
  Network,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function TechspireMarketplace() {

  const router = useRouter();
  const [scrollY, setScrollY] = useState(0)
  const [cardsSpread, setCardsSpread] = useState(false)


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

  const tracks = [
    {
      title: "Startup Showcase Portal",
      description:
        "Display your innovative products and services to the campus community",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Student-Centric Marketplace",
      description:
        "Tailored shopping experience designed specifically for student needs",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Wallet & Digital Payment",
      description:
        "Secure mock payment system for seamless campus transactions",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Mentor Connect Module",
      description: "Connect with experienced mentors to grow your startup",
      icon: <Network className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Analytics Dashboard",
      description: "Track your startup's performance with detailed insights",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-teal-500 to-blue-500",
    },
    {
      title: "Sustainability Bonus",
      description:
        "Promote eco-friendly practices and sustainable business models",
      icon: <Leaf className="w-6 h-6" />,
      color: "from-green-600 to-lime-500",
    },
  ];

  const features = [
    {
      title: "Secure & Verified Student Marketplace",
      description:
        "Only verified students and startups can participate, ensuring a trusted community",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Real-time Payment Simulation",
      description:
        "Experience seamless transactions with our mock payment system",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Mentor Network for Campus Founders",
      description: "Connect with successful entrepreneurs and industry experts",
      icon: <UserCheck className="w-8 h-8" />,
    },
  ];

  const floatingCards = [
    {
      id: 1,
      rotation: -15,
      centerX: 0,
      centerY: 0,
      finalX: -300,
      finalY: 0,
      delay: 0,
    },
    {
      id: 2,
      rotation: 10,
      centerX: 0,
      centerY: 0,
      finalX: -160,
      finalY: -20,
      delay: 0.2,
    },
    {
      id: 3,
      rotation: -8,
      centerX: 0,
      centerY: 0,
      finalX: -60,
      finalY: 15,
      delay: 0.4,
    },
    {
      id: 4,
      rotation: 12,
      centerX: 0,
      centerY: 0,
      finalX: 0,
      finalY: -10,
      delay: 0.6,
    },
    {
      id: 5,
      rotation: -20,
      centerX: 0,
      centerY: 0,
      finalX: 100,
      finalY: 20,
      delay: 0.8,
    },
    {
      id: 6,
      rotation: 15,
      centerX: 0,
      centerY: 0,
      finalX: 220,
      finalY: -15,
      delay: 1.0,
    },
    {
      id: 7,
      rotation: -5,
      centerX: 0,
      centerY: 0,
      finalX: 350,
      finalY: 5,
      delay: 1.2,
    },
  ];

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
     
      <Navbar/>

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
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-2 border-gray-300 hover:border-blue-600 bg-transparent"
              >
                View Marketplace
              </Button>
            </motion.div>

            {/* Floating Cards Animation */}
            <div className="relative h-96 flex items-center justify-center">
              {floatingCards.map((card) => (
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

      {/* How It Works Section */}
      <section id="tracks" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is built around six core tracks that create a
              comprehensive ecosystem for campus commerce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${track.color} flex items-center justify-center text-white mb-4`}
                >
                  {track.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {track.title}
                </h3>
                <p className="text-gray-600">{track.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Feature Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes Techspire Marketplace the perfect platform for
              campus entrepreneurs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          style={{ y: scrollY * -0.5 }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/20 rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to Build the Future of Campus Commerce?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-blue-100 mb-8"
          >
            Join thousands of student entrepreneurs who are already transforming
            their campus communities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 font-semibold"
            >
              Join the Movement
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
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
                    href="#tracks"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
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
