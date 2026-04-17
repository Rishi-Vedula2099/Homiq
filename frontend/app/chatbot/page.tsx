"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, Brain, Sparkles, Home, Building2,
  TrendingUp, MapPin, Loader2, ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: string[];
}

const SUGGESTIONS = [
  "What properties are available in Mumbai under ₹2 Cr?",
  "Compare rental yields: Bangalore vs Hyderabad",
  "What's the price trend for 3BHK in Pune?",
  "Recommend properties for a family of 4 in Gurgaon",
];

// Mock AI responses
function getMockResponse(query: string): { content: string; sources: string[] } {
  const q = query.toLowerCase();

  if (q.includes("mumbai") || q.includes("worli")) {
    return {
      content: `Based on our current listings and market analysis for **Mumbai**:\n\n📊 **Market Overview:**\n- Average price for premium apartments: ₹1.8 - 3.5 Cr\n- YoY appreciation: 8.2%\n- Rental yield: 3.5 - 4.2%\n\n🏠 **Matching Properties:**\n1. **Luxury Penthouse, Worli** — ₹8.50 Cr (4 BHK, 4200 sq.ft)\n2. **Sea-view Apartment, Bandra** — ₹3.2 Cr (3 BHK, 1800 sq.ft)\n\n💡 **AI Insight:** Worli Sea Face areas have shown 12% appreciation in the last year, making them excellent for long-term investment. The area's connectivity via the Coastal Road project is expected to further boost values by 2027.`,
      sources: ["Market Analysis Report Q1 2026", "Homiq Price Index"],
    };
  }

  if (q.includes("rental") || q.includes("yield") || q.includes("compare")) {
    return {
      content: `📊 **Rental Yield Comparison — Bangalore vs Hyderabad:**\n\n| Metric | Bangalore | Hyderabad |\n|--------|-----------|----------|\n| Avg Rental Yield | 3.8% | 4.2% |\n| Avg Monthly Rent (3BHK) | ₹35,000 | ₹28,000 |\n| YoY Rent Growth | 6.5% | 8.1% |\n| Vacancy Rate | 5.2% | 4.8% |\n\n💡 **AI Insight:** Hyderabad currently offers better rental yields due to the IT corridor expansion in HITEC City and Gachibowli. However, Bangalore's Whitefield and Electronic City remain strong for consistent occupancy.\n\n**Recommendation:** For pure rental income, Hyderabad offers better ROI. For capital appreciation + rental, Bangalore's northern corridor is recommended.`,
      sources: ["Rental Market Report 2026", "City Comparison Analytics"],
    };
  }

  if (q.includes("trend") || q.includes("price")) {
    return {
      content: `📈 **Price Trend Analysis — 3BHK in Pune:**\n\n**Current Average:** ₹85 Lakh\n**6-month change:** +5.3%\n**1-year change:** +11.2%\n\n🏘️ **Top Localities by Growth:**\n1. **Hinjawadi** — ₹72L avg (↑14% YoY)\n2. **Kharadi** — ₹78L avg (↑12% YoY)\n3. **Baner** — ₹95L avg (↑9% YoY)\n4. **Wakad** — ₹68L avg (↑11% YoY)\n\n💡 **AI Prediction:** Based on infrastructure development (Metro Phase 2, Ring Road), Hinjawadi and Kharadi are projected to see 15-18% appreciation in the next 12 months.\n\n⚡ **Best Time to Buy:** Current market conditions favor buyers in the ₹60-80L range.`,
      sources: ["Pune Market Analytics", "Infrastructure Impact Report"],
    };
  }

  if (q.includes("recommend") || q.includes("family") || q.includes("suggest")) {
    return {
      content: `🏠 **Family-Friendly Recommendations in Gurgaon:**\n\nBased on your needs (family of 4), I recommend:\n\n1. **DLF Phase 5 Penthouse** — ₹9.50 Cr\n   - 5 BHK, 6000 sq.ft, Private terrace\n   - Schools nearby: DPS, Pathways World\n   - Safety Score: 92/100\n\n2. **Suncity Township Villa** — ₹4.5 Cr\n   - 4 BHK, 3200 sq.ft, Garden\n   - Kids play area, Swimming pool\n   - Connectivity Score: 88/100\n\n3. **M3M Golf Estate** — ₹6.8 Cr\n   - 4 BHK, 4500 sq.ft, Golf course view\n   - Premium clubhouse, 24/7 security\n   - Locality Score: 95/100\n\n💡 **AI Insight:** For families, we prioritize safety scores, proximity to schools, and amenities like parks and play areas. DLF Phase 5 has the highest overall family livability index in Gurgaon.`,
      sources: ["Family Living Index", "School Proximity Analysis"],
    };
  }

  return {
    content: `I can help you with:\n\n🏠 **Property Search** — Find listings by city, budget, or requirements\n📊 **Market Analysis** — Price trends, rental yields, area comparison\n💡 **AI Insights** — Investment recommendations, ROI predictions\n🗺️ **Location Intelligence** — Safety scores, connectivity, schools\n\nTry asking me something like:\n- *"Properties in Bangalore under ₹1 Cr"*\n- *"Compare rental yields in Mumbai vs Pune"*\n- *"Best areas for investment in Hyderabad"*\n\nI'm powered by Homiq's AI engine and can analyze across 12,500+ listings!`,
    sources: [],
  };
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm **HomiqAI**, your intelligent real estate assistant. 🏠\n\nI can help you find properties, analyze market trends, compare areas, and provide investment insights — all powered by AI.\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const response = getMockResponse(query);
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.content,
      timestamp: new Date(),
      sources: response.sources,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#16171d] flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col pt-20 max-w-4xl mx-auto w-full px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <Brain className="h-6 w-6 text-[#16171d]" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-gold font-serif-display tracking-wide">HomiqAI</h1>
          </div>
          <p className="text-sm text-[#a0a0b0] font-light">
            Your AI real estate assistant — powered by market intelligence
          </p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-5 pb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-[#16171d]" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl p-5 ${
                    msg.role === "user"
                      ? "bg-gold/10 border border-gold/15 text-foreground"
                      : "glass-card-strong text-foreground"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                          part.startsWith('**') && part.endsWith('**') ? (
                            <strong key={j} className="text-gold font-semibold">
                              {part.slice(2, -2)}
                            </strong>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                      {msg.sources.map((source, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[10px] border-gold/15 text-gold/60 rounded-full"
                        >
                          📄 {source}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="h-9 w-9 rounded-xl bg-blue-accent/15 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4 text-blue-accent" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-[#16171d]" />
              </div>
              <div className="glass-card-strong rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm text-[#a0a0b0]">
                  <Loader2 className="h-4 w-4 animate-spin text-gold" />
                  Analyzing your query...
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5"
          >
            {SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSend(suggestion)}
                className="text-left p-4 rounded-xl glass-card text-xs text-[#a0a0b0] hover:text-foreground hover:border-gold/15 transition-all duration-300"
              >
                <Sparkles className="h-3 w-3 text-gold inline mr-2" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <div className="pb-8">
          <div className="rounded-2xl p-2.5 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] focus-within:border-gold/20 focus-within:glow-gold transition-all duration-500">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about properties, market trends, or investment advice..."
                disabled={isTyping}
                className="border-0 bg-transparent text-foreground placeholder:text-[#a0a0b0]/60 focus-visible:ring-0 text-sm h-11"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="btn-gold rounded-xl px-5 h-10 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-center text-[10px] text-[#a0a0b0]/40 mt-3">
            HomiqAI provides estimates based on market data. Always verify with licensed professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
