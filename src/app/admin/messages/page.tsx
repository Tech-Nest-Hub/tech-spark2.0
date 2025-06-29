"use client"

import { useState } from "react"
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Alex Chen",
    startup: "EcoTech Solutions",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great! Let's schedule a meeting to discuss the partnership.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    startup: "StudyBuddy App",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd love to collaborate on the student marketplace integration.",
    timestamp: "1 hour ago",
    unread: 0,
    online: true,
    verified: true,
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    startup: "Campus Delivery",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback on our delivery service proposal.",
    timestamp: "3 hours ago",
    unread: 1,
    online: false,
    verified: false,
  },
  {
    id: 4,
    name: "Emma Wilson",
    startup: "GreenCampus Initiative",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The sustainability metrics look promising. When can we meet?",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    verified: true,
  },
  {
    id: 5,
    name: "David Park",
    startup: "TechMentor Platform",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have some experienced mentors who might be interested.",
    timestamp: "2 days ago",
    unread: 0,
    online: true,
    verified: true,
  },
]

// Mock messages for selected conversation
const mockMessages = {
  1: [
    {
      id: 1,
      sender: "Alex Chen",
      message: "Hi! I saw your startup showcase on TechNest. Really impressive work! 🚀",
      timestamp: "10:30 AM",
      isOwn: false,
      status: "read",
    },
    {
      id: 2,
      sender: "You",
      message: "Thank you! I checked out EcoTech Solutions too. Love the sustainability focus.",
      timestamp: "10:32 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: 3,
      sender: "Alex Chen",
      message:
        "Thanks! I think there could be some great synergy between our platforms. Would you be interested in exploring a partnership?",
      timestamp: "10:35 AM",
      isOwn: false,
      status: "read",
    },
    {
      id: 4,
      sender: "You",
      message: "I've been looking for partners in the sustainability space. Let's discuss this further.",
      timestamp: "10:37 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: 5,
      sender: "Alex Chen",
      message: "Great! Let's schedule a meeting to discuss the partnership. Are you free this week?",
      timestamp: "10:40 AM",
      isOwn: false,
      status: "delivered",
    },
  ],
  2: [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hey! I love what you're building with Techspire Marketplace. 💡",
      timestamp: "Yesterday 3:20 PM",
      isOwn: false,
      status: "read",
    },
    {
      id: 2,
      sender: "You",
      message: "Thank you Sarah! StudyBuddy looks amazing too. The student engagement features are brilliant.",
      timestamp: "Yesterday 3:25 PM",
      isOwn: true,
      status: "read",
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      message: "I'd love to collaborate on the student marketplace integration. When would be a good time to chat?",
      timestamp: "Yesterday 3:30 PM",
      isOwn: false,
      status: "delivered",
    },
  ],
  3: [
    {
      id: 1,
      sender: "Mike Rodriguez",
      message: "Hi there! I wanted to get your thoughts on our campus delivery integration.",
      timestamp: "2 days ago 2:15 PM",
      isOwn: false,
      status: "read",
    },
    {
      id: 2,
      sender: "You",
      message: "Hi Mike! I think it's a great idea. The logistics could really benefit students.",
      timestamp: "2 days ago 2:20 PM",
      isOwn: true,
      status: "read",
    },
    {
      id: 3,
      sender: "Mike Rodriguez",
      message: "Thanks for the feedback on our delivery service proposal. Really appreciate it! 🙏",
      timestamp: "2 days ago 2:25 PM",
      isOwn: false,
      status: "delivered",
    },
  ],
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        status: "sent",
      }

      setMessages((prev) => ({
        ...prev,
        [selectedConversation as 1 | 2 | 3]: [...(prev[selectedConversation as 1 | 2 | 3] || []), newMsg],
      }))
    }

    const selectedConv = conversations.find((c) => c.id === selectedConversation)
    const currentMessages = messages[selectedConversation as 1 | 2 | 3] || []

    return (
      <div className="flex flex-1 flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin" className="text-blue-600 hover:text-blue-800">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Messages</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r bg-white/60 backdrop-blur-sm flex flex-col shadow-sm">
            <div className="p-4 border-b bg-white/80">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-blue-50/50 ${selectedConversation === conversation.id
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500"
                      : ""
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-semibold text-sm text-gray-900 truncate">{conversation.name}</h3>
                          {conversation.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-blue-600 font-medium mb-1">{conversation.startup}</p>
                      <p className="text-sm text-gray-600 truncate leading-relaxed">{conversation.lastMessage}</p>
                    </div>

                    {conversation.unread > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white/80 backdrop-blur-sm shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
                          <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {selectedConv.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-gray-900">{selectedConv.name}</h2>
                          {selectedConv.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-blue-600 font-medium">{selectedConv.startup}</p>
                        <p className="text-xs text-gray-500">
                          {selectedConv.online ? "Active now" : "Last seen recently"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-gray-600 hover:text-blue-600">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-gray-600 hover:text-blue-600">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-gray-600 hover:text-blue-600">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/20 to-blue-50/20">
                  {currentMessages.map((message, index) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-end gap-2 max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse" : ""}`}
                      >
                        {!message.isOwn && (
                          <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm">
                            <AvatarImage src={selectedConv?.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                              {selectedConv?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-sm ${message.isOwn
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                              : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                            }`}
                        >
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <div
                            className={`flex items-center gap-1 mt-2 ${message.isOwn ? "justify-end" : "justify-start"}`}
                          >
                            <p className={`text-xs ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                              {message.timestamp}
                            </p>
                            {message.isOwn && (
                              <div className="text-blue-100">
                                {message.status === "sent" && <Check className="w-3 h-3" />}
                                {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
                                {message.status === "read" && <CheckCheck className="w-3 h-3 text-blue-200" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white/80 backdrop-blur-sm ">
                  <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm p-2">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 text-gray-500 rounded-full">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none"
                    />
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 text-gray-500 rounded-full">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white/40 to-blue-50/40">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
