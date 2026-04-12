"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
import { useState } from "react";
import type { Property } from "@/types";

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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    description: "Get intelligent price predictions, ROI estimates, and locality analysis powered by machine learning.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: MapPin,
    title: "Smart Map Search",
    description: "Explore properties on interactive maps with radius search, price bubbles, and instant preview cards.",
    color: "from-blue-accent/20 to-blue-accent/5",
    iconColor: "text-blue-accent",
  },
  {
    icon: Box,
    title: "3D Property Viewer",
    description: "Walk through properties in immersive 3D with furniture toggle, lighting simulation, and room exploration.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Verified Agents",
    description: "Connect with certified real estate agents, schedule visits, and book securely with integrated payments.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
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

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      {/* ─── HERO SECTION ───────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-gold/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-blue-accent/5 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gold/3 blur-[200px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gold/10 text-gold border-gold/20 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              AI-Powered Real Estate Platform
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Find Your</span>
              <br />
              <span className="text-gradient-gold">Dream Home</span>
              <br />
              <span className="text-foreground">with Intelligence</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover premium properties across India with AI insights,
              interactive 3D walkthroughs, and smart recommendations
              tailored to your lifestyle.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <div className="relative glass-card-strong rounded-2xl p-2 glow-gold">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-4">
                  <Search className="h-5 w-5 text-gold/70 shrink-0" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city, locality, or property type..."
                    className="border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-base"
                  />
                </div>
                <Link href={`/properties${searchQuery ? `?city=${searchQuery}` : ""}`}>
                  <Button className="btn-gold rounded-xl px-6 h-11">
                    Search
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick city links */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {CITIES.slice(0, 6).map((city) => (
                <Link key={city} href={`/properties?city=${city}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold transition-colors text-xs"
                  >
                    {city}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-gold/70" />
                <div className="text-2xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ───────────────────────────── */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-accent/10 text-blue-accent border-blue-accent/20">
              Why Homiq?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              The Future of <span className="text-gradient-gold">Real Estate</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              More than a listing platform — Homiq is your intelligent real estate companion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl glass-card-strong p-6 hover:border-gold/20 transition-all duration-300 h-full">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-gold/3 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">
                Featured Listings
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Premium <span className="text-gradient-gold">Properties</span>
              </h2>
            </div>
            <Link href="/properties">
              <Button variant="ghost" className="text-gold hover:text-gold hover:bg-gold/10">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden glass-card-strong p-12 sm:p-16 text-center glow-gold"
          >
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-gold/5 to-blue-accent/5" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Find Your <span className="text-gradient-gold">Perfect Home</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of happy homeowners who found their dream property through Homiq.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/properties">
                  <Button className="btn-gold rounded-xl px-8 h-12 text-base">
                    <Search className="h-5 w-5 mr-2" />
                    Explore Properties
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="rounded-xl px-8 h-12 text-base border-gold/30 text-gold hover:bg-gold/10"
                  >
                    List Your Property
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
