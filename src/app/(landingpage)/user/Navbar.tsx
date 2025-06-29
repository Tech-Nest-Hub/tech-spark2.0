'use client'
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from "react"

const Navbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
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

                        <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </a>

                        <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Products
                        </a>
                        <a href="#tracks" className="text-gray-700 hover:text-blue-600 transition-colors">
                            MarketPlace
                        </a>

                    </div>

                    <Button onClick={() => router.push('/roles')} className=" hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get Started
                    </Button>

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
                            onClick={() => router.push('/roles')}
                            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600"
                        >
                            Get Started
                        </Button>


                    </div>
                </motion.div>
            )}
        </nav>
    )
}

export default Navbar