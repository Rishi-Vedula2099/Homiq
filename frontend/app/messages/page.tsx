"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send, Search, Phone, Video, MoreVertical,
  Building2, Circle, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: "agent" | "customer";
  lastMessage: string;
  time: string;
  online: boolean;
  unread: number;
  property?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  time: string;
  read: boolean;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: "c1", name: "Priya Sharma", avatar: "P", role: "agent",
    lastMessage: "I'll arrange the site visit for Saturday",
    time: "2 min ago", online: true, unread: 2,
    property: "Luxury Penthouse, Worli"
  },
  {
    id: "c2", name: "Rajesh Patel", avatar: "R", role: "agent",
    lastMessage: "The price is negotiable for immediate buyers",
    time: "1 hr ago", online: true, unread: 0,
    property: "Smart Villa, Whitefield"
  },
  {
    id: "c3", name: "Ananya Gupta", avatar: "A", role: "agent",
    lastMessage: "Here are the floor plans you requested",
    time: "3 hrs ago", online: false, unread: 1,
    property: "3BHK, Banjara Hills"
  },
  {
    id: "c4", name: "Vikram Singh", avatar: "V", role: "agent",
    lastMessage: "The society has 24/7 power backup",
    time: "Yesterday", online: false, unread: 0,
    property: "Garden Villa, Jubilee Hills"
  },
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", senderId: "c1", content: "Hello! I saw you're interested in the Worli penthouse.", time: "10:30 AM", read: true },
    { id: "m2", senderId: "me", content: "Yes! Can you share more details about the sea view?", time: "10:32 AM", read: true },
    { id: "m3", senderId: "c1", content: "The penthouse has a 270° sea view from the private terrace. It's on the 42nd floor with floor-to-ceiling windows.", time: "10:35 AM", read: true },
    { id: "m4", senderId: "c1", content: "Would you like to schedule a visit? I can arrange one this weekend.", time: "10:35 AM", read: true },
    { id: "m5", senderId: "me", content: "That sounds amazing. Saturday afternoon works for me.", time: "10:40 AM", read: true },
    { id: "m6", senderId: "c1", content: "I'll arrange the site visit for Saturday at 3 PM. I'll send you the exact details.", time: "10:42 AM", read: false },
    { id: "m7", senderId: "c1", content: "Also, just to let you know — the society has a private pool, gym, and concierge service. The maintenance is ₹25,000/month.", time: "10:43 AM", read: false },
  ],
  c2: [
    { id: "m1", senderId: "me", content: "Hi Rajesh, is the Whitefield villa still available?", time: "Yesterday", read: true },
    { id: "m2", senderId: "c2", content: "Yes, it is! It's one of our premium listings with smart home features.", time: "Yesterday", read: true },
    { id: "m3", senderId: "c2", content: "The price is negotiable for immediate buyers. Were you looking at it as an investment or for self-use?", time: "Yesterday", read: true },
  ],
};

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(MOCK_CONTACTS[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
  const [contactSearch, setContactSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedContact]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: "me",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));
    setMessageInput("");
  };

  const filteredContacts = MOCK_CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.property?.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const currentMessages = selectedContact ? (messages[selectedContact.id] || []) : [];

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-16 h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Contacts sidebar */}
          <div className="w-[360px] border-r border-border/50 flex flex-col bg-background/50 backdrop-blur-sm">
            {/* Search */}
            <div className="p-4 border-b border-border/50">
              <h2 className="text-lg font-bold text-foreground mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-10 bg-secondary/50 border-border/50 h-9"
                />
              </div>
            </div>

            {/* Contact list */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-secondary/30 transition-colors text-left border-b border-border/20 ${
                    selectedContact?.id === contact.id ? "bg-gold/5 border-l-2 border-l-gold" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold/80 to-gold-dark flex items-center justify-center text-[#0a0a0f] font-bold text-sm">
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <Circle className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{contact.name}</span>
                      <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                    </div>
                    {contact.property && (
                      <p className="text-[10px] text-gold/70 flex items-center gap-1 mt-0.5">
                        <Building2 className="h-2.5 w-2.5" /> {contact.property}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="bg-gold text-[#0a0a0f] text-[10px] h-5 w-5 flex items-center justify-center rounded-full p-0">
                      {contact.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          {selectedContact ? (
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="h-16 px-6 flex items-center justify-between border-b border-border/50 glass-card-strong">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-[#0a0a0f] font-bold text-sm">
                      {selectedContact.avatar}
                    </div>
                    {selectedContact.online && (
                      <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-emerald-500 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{selectedContact.name}</h3>
                    <p className="text-[10px] text-muted-foreground">
                      {selectedContact.online ? "Online" : "Last seen " + selectedContact.time}
                      {selectedContact.property && ` · ${selectedContact.property}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderId === "me" ? "justify-end" : ""}`}
                  >
                    <div
                      className={`max-w-[65%] rounded-2xl px-4 py-2.5 ${
                        msg.senderId === "me"
                          ? "bg-gold/15 border border-gold/20"
                          : "glass-card"
                      }`}
                    >
                      <p className="text-sm text-foreground">{msg.content}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 text-right">{msg.time}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-secondary/50 border-border/50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="btn-gold rounded-xl px-4"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
