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
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"


export const track = [
  {
    "title": "Startup Showcase Portal",
    "description": "Display your innovative products and services to the campus community",
    "icon": "Sparkles",
    "color": "from-blue-500 to-cyan-500"
  },
  {
    "title": "Student-Centric Marketplace",
    "description": "Tailored shopping experience designed specifically for student needs",
    "icon": "Users",
    "color": "from-green-500 to-emerald-500"
  },
  {
    "title": "Wallet & Digital Payment",
    "description": "Secure mock payment system for seamless campus transactions",
    "icon": "CreditCard",
    "color": "from-purple-500 to-violet-500"
  },
  {
    "title": "Mentor Connect Module",
    "description": "Connect with experienced mentors to grow your startup",
    "icon": "Network",
    "color": "from-orange-500 to-red-500"
  },
  {
    "title": "Analytics Dashboard",
    "description": "Track your startup's performance with detailed insights",
    "icon": "BarChart3",
    "color": "from-teal-500 to-blue-500"
  },
  {
    "title": "Sustainability Bonus",
    "description": "Promote eco-friendly practices and sustainable business models",
    "icon": "Leaf",
    "color": "from-green-600 to-lime-500"
  }
]

export const feature = [
    {
      title: "Secure & Verified Student Marketplace",
      description: "Only verified students and startups can participate, ensuring a trusted community",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Real-time Payment Simulation",
      description: "Experience seamless transactions with our mock payment system",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Mentor Network for Campus Founders",
      description: "Connect with successful entrepreneurs and industry experts",
      icon: <UserCheck className="w-8 h-8" />,
    },
  ]
