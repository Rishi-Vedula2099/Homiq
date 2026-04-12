"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin, BedDouble, Bath, Maximize2, Building2, Calendar,
  Heart, Share2, Box, Brain, TrendingUp, Shield, Star,
  ChevronLeft, MessageSquare, Phone, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { formatPrice } from "@/lib/constants";
import { useState } from "react";

// Mock property detail (will be replaced with API call)
const MOCK_DETAIL = {
  id: "1",
  agent_id: "a1",
  title: "Luxury Penthouse with Panoramic Sea View",
  description: `Experience the pinnacle of luxury living in this stunning 4BHK penthouse perched high above the Arabian Sea at Worli Sea Face. This meticulously crafted residence spans 4,200 sq.ft across two levels, offering unparalleled panoramic views of the Mumbai skyline and the sea.\n\nThe open-concept living area features floor-to-ceiling windows, Italian marble flooring, and a designer modular kitchen with top-of-the-line appliances. Each bedroom is a private sanctuary with en-suite bathrooms and walk-in closets.\n\nThe private terrace — a crown jewel — offers 360° views perfect for entertaining or quiet contemplation. Smart home automation, a private elevator, and dedicated parking for 3 cars complete this extraordinary offering.`,
  listing_type: "sale" as const,
  price: 85000000,
  area_sqft: 4200,
  bedrooms: 4,
  bathrooms: 4,
  floors: 2,
  address: "Worli Sea Face, Tower A, 42nd Floor",
  city: "Mumbai",
  state: "Maharashtra",
  zip_code: "400018",
  latitude: 19.0176,
  longitude: 72.8162,
  amenities: {
    "Swimming Pool": true, "Gym": true, "Parking": true,
    "Security": true, "Power Backup": true, "Smart Home": true,
    "Club House": true, "Lift": true, "CCTV": true,
  },
  images: [],
  model_3d_url: "/models/sample.glb",
  status: "active" as const,
  listed_at: "2026-04-01T00:00:00Z",
  updated_at: "2026-04-01T00:00:00Z",
};

const MOCK_AGENT = {
  name: "Priya Sharma",
  agency: "Elite Properties Mumbai",
  rating: 4.9,
  reviews: 128,
  verified: true,
};

const AI_INSIGHTS = {
  priceAnalysis: "This property is priced 8% below the locality average for comparable penthouses, suggesting good value.",
  roiEstimate: "Estimated annual ROI: 9.2% (4% rental yield + 5.2% appreciation)",
  localityScore: 92,
  safetyScore: 88,
  connectivityScore: 95,
};

export default function PropertyDetailPage() {
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const property = MOCK_DETAIL;

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href="/properties" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
              <ChevronLeft className="h-4 w-4" />
              Back to listings
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
              >
                <div className="relative h-[400px] bg-gradient-to-br from-blue-900/30 to-purple-900/30 glass-card-strong flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-20 w-20 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                      <Building2 className="h-10 w-10 text-gold/60" />
                    </div>
                    <p className="text-muted-foreground text-sm">Property Images</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{property.city}, {property.state}</p>
                  </div>

                  {/* Overlay badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-gold/90 text-[#0a0a0f] font-semibold">
                      {property.listing_type === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                    {property.model_3d_url && (
                      <Badge className="bg-blue-accent/90 text-white">
                        <Box className="h-3 w-3 mr-1" />
                        3D Tour Available
                      </Badge>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setLiked(!liked)}
                      className="h-10 w-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-white/70"}`} />
                    </button>
                    <button className="h-10 w-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Share2 className="h-5 w-5 text-white/70" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Title & Price */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{property.title}</h1>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4 text-gold/70" />
                      {property.address}, {property.city}, {property.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gradient-gold">
                      {formatPrice(property.price, property.listing_type)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{Math.round(property.price / property.area_sqft).toLocaleString()} / sq.ft
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mt-6 p-4 rounded-xl glass-card">
                  {[
                    { icon: BedDouble, label: `${property.bedrooms} Bedrooms` },
                    { icon: Bath, label: `${property.bathrooms} Bathrooms` },
                    { icon: Maximize2, label: `${property.area_sqft.toLocaleString()} sq.ft` },
                    { icon: Building2, label: `${property.floors} Floors` },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <stat.icon className="h-5 w-5 text-gold/70" />
                      <span className="text-sm text-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 3D Viewer Button */}
              {property.model_3d_url && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <Link href={`/property/${params.id}/viewer-3d`}>
                    <div className="rounded-xl glass-card-strong p-6 cursor-pointer hover:border-gold/30 transition-all group glow-blue">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl bg-blue-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Box className="h-7 w-7 text-blue-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">3D Interactive Viewer</h3>
                            <p className="text-sm text-muted-foreground">Walk through this property in immersive 3D</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-lg font-semibold text-foreground mb-3">About this Property</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(property.amenities || {}).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="border-border/50 text-muted-foreground px-3 py-1.5">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card-strong rounded-2xl p-6 glow-gold sticky top-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-[#0a0a0f] font-bold text-lg">
                    {MOCK_AGENT.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{MOCK_AGENT.name}</h3>
                      {MOCK_AGENT.verified && (
                        <Shield className="h-4 w-4 text-blue-accent" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{MOCK_AGENT.agency}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span className="text-sm font-medium text-foreground">{MOCK_AGENT.rating}</span>
                  <span className="text-xs text-muted-foreground">({MOCK_AGENT.reviews} reviews)</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full btn-gold rounded-xl h-11">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl h-11 border-border/50 text-foreground hover:border-gold/30">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Agent
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl h-11 border-border/50 text-foreground hover:border-gold/30">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                </div>
              </motion.div>

              {/* AI Insights Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card-strong rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-gold" />
                  <h3 className="font-semibold text-foreground">AI Insights</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Price Analysis</p>
                    <p className="text-sm text-foreground">{AI_INSIGHTS.priceAnalysis}</p>
                  </div>

                  <Separator className="bg-border/50" />

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ROI Estimate</p>
                    <p className="text-sm text-gradient-gold font-medium">{AI_INSIGHTS.roiEstimate}</p>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    {[
                      { label: "Locality Score", score: AI_INSIGHTS.localityScore, color: "bg-gold" },
                      { label: "Safety Score", score: AI_INSIGHTS.safetyScore, color: "bg-emerald-500" },
                      { label: "Connectivity", score: AI_INSIGHTS.connectivityScore, color: "bg-blue-accent" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-foreground font-medium">{item.score}/100</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
