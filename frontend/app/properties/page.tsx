"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Grid3X3, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PropertyCard } from "@/components/property/property-card";
import { CITIES } from "@/lib/constants";
import type { Property } from "@/types";

// Extended mock data for browsing
const ALL_PROPERTIES: Property[] = [
  { id: "1", agent_id: "a1", title: "Luxury Penthouse with Panoramic Sea View", listing_type: "sale", price: 85000000, area_sqft: 4200, bedrooms: 4, bathrooms: 4, floors: 2, address: "Worli Sea Face", city: "Mumbai", state: "Maharashtra", zip_code: "400018", latitude: 19.0176, longitude: 72.8162, amenities: {}, images: [], status: "active", listed_at: "2026-04-01T00:00:00Z", updated_at: "2026-04-01T00:00:00Z" },
  { id: "2", agent_id: "a1", title: "Modern Smart Villa in Whitefield", listing_type: "sale", price: 45000000, area_sqft: 5500, bedrooms: 5, bathrooms: 5, floors: 3, address: "Whitefield Main Road", city: "Bangalore", state: "Karnataka", zip_code: "560066", latitude: 12.9698, longitude: 77.75, amenities: {}, images: [], model_3d_url: "/models/sample.glb", status: "active", listed_at: "2026-04-02T00:00:00Z", updated_at: "2026-04-02T00:00:00Z" },
  { id: "3", agent_id: "a2", title: "Premium 3BHK in Banjara Hills", listing_type: "rent", price: 75000, area_sqft: 2200, bedrooms: 3, bathrooms: 3, floors: 1, address: "Banjara Hills Road No. 12", city: "Hyderabad", state: "Telangana", zip_code: "500034", latitude: 17.4156, longitude: 78.4347, amenities: {}, images: [], status: "active", listed_at: "2026-04-03T00:00:00Z", updated_at: "2026-04-03T00:00:00Z" },
  { id: "4", agent_id: "a2", title: "Heritage Haveli in Civil Lines", listing_type: "sale", price: 120000000, area_sqft: 8000, bedrooms: 6, bathrooms: 6, floors: 2, address: "Civil Lines", city: "Delhi", state: "Delhi", zip_code: "110054", latitude: 28.6814, longitude: 77.2226, amenities: {}, images: [], status: "active", listed_at: "2026-04-04T00:00:00Z", updated_at: "2026-04-04T00:00:00Z" },
  { id: "5", agent_id: "a3", title: "Eco-Friendly Apartment in Koregaon Park", listing_type: "rent", price: 45000, area_sqft: 1400, bedrooms: 2, bathrooms: 2, floors: 1, address: "Koregaon Park", city: "Pune", state: "Maharashtra", zip_code: "411001", latitude: 18.5362, longitude: 73.8939, amenities: {}, images: [], status: "active", listed_at: "2026-04-05T00:00:00Z", updated_at: "2026-04-05T00:00:00Z" },
  { id: "6", agent_id: "a3", title: "Beachside Villa in Candolim", listing_type: "sale", price: 65000000, area_sqft: 3800, bedrooms: 4, bathrooms: 4, floors: 2, address: "Candolim Beach Road", city: "Goa", state: "Goa", zip_code: "403515", latitude: 15.5178, longitude: 73.7621, amenities: {}, images: [], model_3d_url: "/models/sample.glb", status: "active", listed_at: "2026-04-06T00:00:00Z", updated_at: "2026-04-06T00:00:00Z" },
  { id: "7", agent_id: "a1", title: "Luxury Apartment in Indiranagar", listing_type: "rent", price: 85000, area_sqft: 1800, bedrooms: 3, bathrooms: 2, floors: 1, address: "100 Feet Road, Indiranagar", city: "Bangalore", state: "Karnataka", zip_code: "560038", latitude: 12.978, longitude: 77.6408, amenities: {}, images: [], status: "active", listed_at: "2026-04-07T00:00:00Z", updated_at: "2026-04-07T00:00:00Z" },
  { id: "8", agent_id: "a2", title: "Penthouse in DLF Phase 5", listing_type: "sale", price: 95000000, area_sqft: 6000, bedrooms: 5, bathrooms: 5, floors: 2, address: "DLF Phase 5", city: "Gurgaon", state: "Haryana", zip_code: "122002", latitude: 28.443, longitude: 77.102, amenities: {}, images: [], status: "active", listed_at: "2026-04-08T00:00:00Z", updated_at: "2026-04-08T00:00:00Z" },
  { id: "9", agent_id: "a3", title: "Garden Villa in Jubilee Hills", listing_type: "sale", price: 55000000, area_sqft: 4500, bedrooms: 4, bathrooms: 4, floors: 2, address: "Jubilee Hills", city: "Hyderabad", state: "Telangana", zip_code: "500033", latitude: 17.432, longitude: 78.407, amenities: {}, images: [], model_3d_url: "/models/sample.glb", status: "active", listed_at: "2026-04-09T00:00:00Z", updated_at: "2026-04-09T00:00:00Z" },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = ALL_PROPERTIES;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }

    if (listingType !== "all") {
      result = result.filter((p) => p.listing_type === listingType);
    }

    if (city !== "all") {
      result = result.filter((p) => p.city === city);
    }

    if (bedrooms !== "any") {
      result = result.filter((p) => p.bedrooms >= parseInt(bedrooms));
    }

    if (sortBy === "price_low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "area") result.sort((a, b) => b.area_sqft - a.area_sqft);

    return result;
  }, [search, listingType, city, bedrooms, sortBy]);

  const activeFilterCount = [
    listingType !== "all",
    city !== "all",
    bedrooms !== "any",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Explore <span className="text-gradient-gold">Properties</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              {filtered.length} properties found
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card-strong rounded-xl p-4 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search properties, cities..."
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>

              <div className="flex gap-2">
                <Select value={listingType} onValueChange={(v) => v && setListingType(v)}>
                  <SelectTrigger className="w-[120px] bg-secondary/50 border-border/50">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sale">Buy</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={city} onValueChange={(v) => v && setCity(v)}>
                  <SelectTrigger className="w-[140px] bg-secondary/50 border-border/50">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={bedrooms} onValueChange={(v) => v && setBedrooms(v)}>
                  <SelectTrigger className="w-[110px] bg-secondary/50 border-border/50">
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Beds</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => v && setSortBy(v)}>
                  <SelectTrigger className="w-[130px] bg-secondary/50 border-border/50">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="price_low">Price: Low</SelectItem>
                    <SelectItem value="price_high">Price: High</SelectItem>
                    <SelectItem value="area">Largest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">Active:</span>
                {listingType !== "all" && (
                  <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                    {listingType === "sale" ? "Buy" : "Rent"}
                    <button onClick={() => setListingType("all")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {city !== "all" && (
                  <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                    {city}
                    <button onClick={() => setCity("all")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {bedrooms !== "any" && (
                  <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                    {bedrooms}+ Beds
                    <button onClick={() => setBedrooms("any")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </motion.div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No properties found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
