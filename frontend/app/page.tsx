"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Brain,
  Box,
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  Star,
  Sparkles,
  Shield,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PropertyCard } from "@/components/property/property-card";
import { CITIES, formatPrice } from "@/lib/constants";
import { useState, useRef } from "react";
import type { Property } from "@/types";

// Property images mapping
const PROPERTY_IMAGES = [
  "/property-1.png",
  "/property-2.png",
  "/property-3.png",
  "/property-4.png",
  "/property-5.png",
  "/property-1.png",
];

// Mock featured properties for initial display
const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    agent_id: "a1",
    title: "Luxury Penthouse with Panoramic Sea View",
    description: "Exquisite 4BHK penthouse in Worli with breathtaking Arabian Sea views",
    listing_type: "sale",
    price: 85000000,
    area_sqft: 4200,
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    address: "Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    zip_code: "400018",
    latitude: 19.0176,
    longitude: 72.8162,
    amenities: { pool: true, gym: true, parking: true },
    images: ["/property-1.png"],
    status: "active",
    listed_at: "2026-04-01T00:00:00Z",
    updated_at: "2026-04-01T00:00:00Z",
  },
  {
    id: "2",
    agent_id: "a1",
    title: "Modern Smart Villa in Whitefield",
    description: "AI-integrated 5BHK villa with home automation",
    listing_type: "sale",
    price: 45000000,
    area_sqft: 5500,
    bedrooms: 5,
    bathrooms: 5,
    floors: 3,
    address: "Whitefield Main Road",
    city: "Bangalore",
    state: "Karnataka",
    zip_code: "560066",
    latitude: 12.9698,
    longitude: 77.7500,
    amenities: { pool: true, garden: true, smart_home: true },
    images: ["/property-3.png"],
    model_3d_url: "/models/sample.glb",
    status: "active",
    listed_at: "2026-04-02T00:00:00Z",
    updated_at: "2026-04-02T00:00:00Z",
  },
  {
    id: "3",
    agent_id: "a2",
    title: "Premium 3BHK in Banjara Hills",
    description: "Spacious apartment with club house access",
    listing_type: "rent",
    price: 75000,
    area_sqft: 2200,
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    address: "Banjara Hills Road No. 12",
    city: "Hyderabad",
    state: "Telangana",
    zip_code: "500034",
    latitude: 17.4156,
    longitude: 78.4347,
    amenities: { gym: true, parking: true, security: true },
    images: ["/property-2.png"],
    status: "active",
    listed_at: "2026-04-03T00:00:00Z",
    updated_at: "2026-04-03T00:00:00Z",
  },
  {
    id: "4",
    agent_id: "a2",
    title: "Heritage Haveli in Civil Lines",
    description: "Restored heritage property with modern amenities",
    listing_type: "sale",
    price: 120000000,
    area_sqft: 8000,
    bedrooms: 6,
    bathrooms: 6,
    floors: 2,
    address: "Civil Lines",
    city: "Delhi",
    state: "Delhi",
    zip_code: "110054",
    latitude: 28.6814,
    longitude: 77.2226,
    amenities: { garden: true, parking: true, security: true },
    images: ["/property-4.png"],
    status: "active",
    listed_at: "2026-04-04T00:00:00Z",
    updated_at: "2026-04-04T00:00:00Z",
  },
  {
    id: "5",
    agent_id: "a3",
    title: "Eco-Friendly Apartment in Koregaon Park",
    description: "Green certified 2BHK with rainwater harvesting",
    listing_type: "rent",
    price: 45000,
    area_sqft: 1400,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    address: "Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    zip_code: "411001",
    latitude: 18.5362,
    longitude: 73.8939,
    amenities: { gym: true, garden: true },
    images: ["/property-5.png"],
    status: "active",
    listed_at: "2026-04-05T00:00:00Z",
    updated_at: "2026-04-05T00:00:00Z",
  },
  {
    id: "6",
    agent_id: "a3",
    title: "Beachside Villa in Candolim",
    description: "Stunning 4BHK villa steps from the beach",
    listing_type: "sale",
    price: 65000000,
    area_sqft: 3800,
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    address: "Candolim Beach Road",
    city: "Goa",
    state: "Goa",
    zip_code: "403515",
    latitude: 15.5178,
    longitude: 73.7621,
    amenities: { pool: true, garden: true, parking: true },
    images: ["/property-3.png"],
    model_3d_url: "/models/sample.glb",
    status: "active",
    listed_at: "2026-04-06T00:00:00Z",
    updated_at: "2026-04-06T00:00:00Z",
  },
];

const STATS = [
  { icon: Building2, value: "12,500+", label: "Properties Listed" },
  { icon: Users, value: "8,200+", label: "Happy Clients" },
  { icon: TrendingUp, value: "₹2,400 Cr", label: "Total Transactions" },
  { icon: Star, value: "4.9/5", label: "Client Rating" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Get intelligent price predictions, ROI estimates, and locality analysis powered by machine learning.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: MapPin,
    title: "Smart Map Search",
    description:
      "Explore properties on interactive maps with radius search, price bubbles, and instant preview cards.",
    color: "from-blue-accent/20 to-blue-accent/5",
    iconColor: "text-blue-accent",
  },
  {
    icon: Box,
    title: "3D Property Viewer",
    description:
      "Walk through properties in immersive 3D with furniture toggle, lighting simulation, and room exploration.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Verified Agents",
    description:
      "Connect with certified real estate agents, schedule visits, and book securely with integrated payments.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
];

const SUGGESTION_CHIPS = [
  "2BHK under ₹1Cr",
  "Near metro",
  "Luxury villas in Mumbai",
  "Sea-facing apartments",
  "Gated communities",
];

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-[#16171d]">
      <Navbar />

      {/* ─── CINEMATIC HERO SECTION ───────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
          <Image
            src="/hero-bg.png"
            alt="Luxury villa at night"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </motion.div>

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Subtle gold light reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0a0a0f] to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mb-8 bg-gold/10 text-gold border-gold/20 px-5 py-2 text-sm tracking-wide backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              AI-Powered Luxury Real Estate
            </Badge>

            <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
              <span className="text-foreground">Find Your</span>
              <br />
              <span className="text-gradient-gold">Perfect Home</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-[#a0a0b0] max-w-2xl mx-auto leading-relaxed font-light">
              Discover curated properties powered by AI insights.
              <br className="hidden sm:block" />
              Premium living, intelligently matched.
            </p>
          </motion.div>

          {/* Glassmorphism Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative rounded-2xl p-2 bg-white/5 backdrop-blur-xl border border-white/10 focus-within:border-gold/30 focus-within:glow-gold-strong transition-all duration-500">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="h-5 w-5 text-gold/60 shrink-0" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city, locality, or property type..."
                    className="border-0 bg-transparent text-foreground placeholder:text-[#a0a0b0]/60 focus-visible:ring-0 text-base h-12"
                  />
                </div>
                <Link href={`/properties${searchQuery ? `?city=${searchQuery}` : ""}`}>
                  <Button className="btn-gold rounded-xl px-8 h-12 text-sm font-semibold tracking-wide">
                    Search
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating suggestion chips */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTION_CHIPS.map((chip) => (
                <Link key={chip} href={`/properties?city=${chip}`}>
                  <button className="suggestion-chip rounded-full px-4 py-2 text-xs text-[#a0a0b0] hover:text-gold cursor-pointer">
                    {chip}
                  </button>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <stat.icon className="h-5 w-5 mx-auto mb-3 text-gold/50" />
                <div className="text-2xl sm:text-3xl font-bold text-gradient-gold font-serif-display">
                  {stat.value}
                </div>
                <div className="text-xs text-[#a0a0b0] mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ─── FEATURES SECTION ───────────────────────────── */}
      <section className="py-28 sm:py-36 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Why Homiq?
            </p>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              The Future of{" "}
              <span className="text-gradient-gold">Real Estate</span>
            </h2>
            <p className="mt-6 text-[#a0a0b0] max-w-lg mx-auto text-lg font-light">
              More than a listing platform — Homiq is your intelligent real
              estate companion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="rounded-2xl glass-card-strong p-8 lg:p-10 hover:border-gold/20 transition-all duration-500 h-full relative overflow-hidden">
                  <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 font-serif-display">
                      {feature.title}
                    </h3>
                    <p className="text-[#a0a0b0] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ─── FEATURED PROPERTIES ─────────────────────────── */}
      <section className="py-28 sm:py-36 relative">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-gold/3 blur-[200px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                Featured Listings
              </p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-foreground">
                Premium{" "}
                <span className="text-gradient-gold">Properties</span>
              </h2>
            </div>
            <Link href="/properties">
              <Button
                variant="ghost"
                className="text-gold hover:text-gold hover:bg-gold/10 tracking-wide"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {MOCK_PROPERTIES.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ─── AI INSIGHT SECTION ───────────────────────────── */}
      <section className="py-28 sm:py-36 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-blue-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                AI Intelligence
              </p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                Smarter Decisions,{" "}
                <span className="text-gradient-blue">Powered by AI</span>
              </h2>
              <p className="text-[#a0a0b0] text-lg leading-relaxed mb-8 font-light">
                Our AI analyzes market trends, property values, and neighborhood
                data to give you insights that help you make confident real
                estate decisions.
              </p>
              <Link href="/chatbot">
                <Button className="btn-gold rounded-full px-8 h-12 text-sm font-semibold tracking-wide">
                  <Brain className="h-4 w-4 mr-2" />
                  Try AI Assistant
                </Button>
              </Link>
            </motion.div>

            {/* Right - AI Insight Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {/* ROI Card */}
              <div className="ai-insight-glow rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-accent/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">ROI Analysis</p>
                    <p className="text-xs text-[#a0a0b0]">Worli, Mumbai</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gradient-blue font-serif-display">9.2%</span>
                  <span className="text-sm text-emerald-400">↑ Annual ROI</span>
                </div>
                <p className="text-xs text-[#a0a0b0]">4% rental yield + 5.2% appreciation</p>
              </div>

              {/* Undervalued Card */}
              <div className="ai-insight-glow rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Market Insight</p>
                    <p className="text-xs text-[#a0a0b0]">Whitefield, Bangalore</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                  Undervalued by 10%
                </Badge>
                <p className="text-xs text-[#a0a0b0] mt-2">
                  Based on 45 comparable properties in the area
                </p>
              </div>

              {/* Trend Card */}
              <div className="ai-insight-glow rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Price Trend</p>
                    <p className="text-xs text-[#a0a0b0]">DLF Phase 5, Gurgaon</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-[#a0a0b0]">6 Month</p>
                    <p className="text-sm font-semibold text-emerald-400">+12.4%</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-xs text-[#a0a0b0]">1 Year</p>
                    <p className="text-sm font-semibold text-gold">+18.7%</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-xs text-[#a0a0b0]">Forecast</p>
                    <p className="text-sm font-semibold text-blue-accent">Bullish</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ─── CTA SECTION ─────────────────────────────────── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/property-3.png"
                alt="Luxury property"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-[#0a0a0f]/60" />
            </div>

            <div className="relative p-12 sm:p-20 lg:p-24">
              <div className="max-w-xl">
                <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Ready to Find Your{" "}
                  <span className="text-gradient-gold">Perfect Home</span>?
                </h2>
                <p className="text-[#a0a0b0] mb-10 text-lg font-light leading-relaxed">
                  Join thousands of happy homeowners who found their dream
                  property through Homiq&apos;s intelligent platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/properties">
                    <Button className="btn-gold rounded-full px-10 h-14 text-base font-semibold tracking-wide">
                      <Search className="h-5 w-5 mr-2" />
                      Explore Properties
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className="rounded-full px-10 h-14 text-base border-white/20 text-foreground hover:bg-white/5 hover:border-gold/30 tracking-wide"
                    >
                      List Your Property
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
