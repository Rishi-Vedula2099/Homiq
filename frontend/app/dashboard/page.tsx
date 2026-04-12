"use client";

import { motion } from "framer-motion";
import {
  Building2, Calendar, MessageSquare, TrendingUp, Brain,
  Eye, Star, Clock, ArrowUpRight, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

const STATS = [
  { icon: Building2, label: "Listed Properties", value: "24", change: "+3 this week", color: "text-gold" },
  { icon: Eye, label: "Total Views", value: "1,847", change: "+12%", color: "text-blue-accent" },
  { icon: Calendar, label: "Bookings", value: "8", change: "3 upcoming", color: "text-emerald-400" },
  { icon: MessageSquare, label: "Messages", value: "15", change: "4 unread", color: "text-purple-400" },
];

const RECENT_BOOKINGS = [
  { id: 1, property: "Luxury Penthouse, Worli", customer: "Rahul Mehta", date: "Apr 12, 2026", time: "10:00 AM", status: "confirmed" },
  { id: 2, property: "Smart Villa, Whitefield", customer: "Ananya Singh", date: "Apr 13, 2026", time: "2:30 PM", status: "pending" },
  { id: 3, property: "3BHK, Banjara Hills", customer: "Vikram Rao", date: "Apr 14, 2026", time: "11:00 AM", status: "confirmed" },
];

const AI_RECOMMENDATIONS = [
  { title: "Optimize listing pricing", description: "3 of your listings are priced 10% above market average", icon: TrendingUp },
  { title: "Add 3D tours", description: "Properties with 3D tours get 2.5x more engagement", icon: Brain },
  { title: "Respond faster", description: "Your avg response time is 4 hrs. Top agents respond in 30 min", icon: Clock },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAgent = user?.role === "agent";

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, <span className="text-gradient-gold">{user?.full_name || "User"}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAgent ? "Manage your listings and bookings" : "Track your saved properties and bookings"}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-strong rounded-xl p-5 hover:border-gold/20 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className={`h-10 w-10 rounded-lg bg-secondary/50 flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-foreground mt-3">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass-card-strong rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gold" />
                  Upcoming Bookings
                </h2>
                <Button variant="ghost" size="sm" className="text-gold hover:text-gold hover:bg-gold/10">
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {RECENT_BOOKINGS.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 rounded-lg glass-card hover:border-border/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{booking.property}</p>
                        <p className="text-xs text-muted-foreground">{booking.customer} · {booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <Badge className={
                      booking.status === "confirmed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-gold/10 text-gold"
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card-strong rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-gold" />
                <h2 className="font-semibold text-foreground">AI Suggestions</h2>
              </div>

              <div className="space-y-3">
                {AI_RECOMMENDATIONS.map((rec, i) => (
                  <div key={i} className="p-3 rounded-lg glass-card hover:border-border/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <rec.icon className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{rec.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          {isAgent && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6">
              <div className="flex gap-3">
                <Button className="btn-gold rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
                <Link href="/properties">
                  <Button variant="outline" className="rounded-xl border-border/50 text-foreground hover:border-gold/30">
                    <Building2 className="h-4 w-4 mr-2" />
                    Manage Listings
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
