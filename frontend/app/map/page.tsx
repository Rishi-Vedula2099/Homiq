"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/navbar";
import { formatPrice } from "@/lib/constants";
import Link from "next/link";
import type { Property } from "@/types";
import { useFixLeafletIcons } from "@/lib/leaflet-fix";

// Dynamic import Leaflet (SSR incompatible)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

// Mock map properties
const MAP_PROPERTIES: Property[] = [
  { id: "1", agent_id: "a1", title: "Luxury Penthouse, Worli", listing_type: "sale", price: 85000000, area_sqft: 4200, bedrooms: 4, bathrooms: 4, floors: 2, address: "Worli Sea Face", city: "Mumbai", state: "Maharashtra", zip_code: "400018", latitude: 19.0176, longitude: 72.8162, images: [], status: "active", listed_at: "2026-04-01", updated_at: "2026-04-01" },
  { id: "2", agent_id: "a1", title: "Smart Villa, Whitefield", listing_type: "sale", price: 45000000, area_sqft: 5500, bedrooms: 5, bathrooms: 5, floors: 3, address: "Whitefield", city: "Bangalore", state: "Karnataka", zip_code: "560066", latitude: 12.9698, longitude: 77.75, images: [], status: "active", listed_at: "2026-04-02", updated_at: "2026-04-02" },
  { id: "3", agent_id: "a2", title: "3BHK, Banjara Hills", listing_type: "rent", price: 75000, area_sqft: 2200, bedrooms: 3, bathrooms: 3, floors: 1, address: "Banjara Hills", city: "Hyderabad", state: "Telangana", zip_code: "500034", latitude: 17.4156, longitude: 78.4347, images: [], status: "active", listed_at: "2026-04-03", updated_at: "2026-04-03" },
  { id: "4", agent_id: "a2", title: "Heritage Haveli, Civil Lines", listing_type: "sale", price: 120000000, area_sqft: 8000, bedrooms: 6, bathrooms: 6, floors: 2, address: "Civil Lines", city: "Delhi", state: "Delhi", zip_code: "110054", latitude: 28.6814, longitude: 77.2226, images: [], status: "active", listed_at: "2026-04-04", updated_at: "2026-04-04" },
  { id: "5", agent_id: "a3", title: "Eco Apartment, Koregaon Park", listing_type: "rent", price: 45000, area_sqft: 1400, bedrooms: 2, bathrooms: 2, floors: 1, address: "Koregaon Park", city: "Pune", state: "Maharashtra", zip_code: "411001", latitude: 18.5362, longitude: 73.8939, images: [], status: "active", listed_at: "2026-04-05", updated_at: "2026-04-05" },
  { id: "6", agent_id: "a3", title: "Beachside Villa, Candolim", listing_type: "sale", price: 65000000, area_sqft: 3800, bedrooms: 4, bathrooms: 4, floors: 2, address: "Candolim Beach Road", city: "Goa", state: "Goa", zip_code: "403515", latitude: 15.5178, longitude: 73.7621, images: [], status: "active", listed_at: "2026-04-06", updated_at: "2026-04-06" },
];

export default function MapPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFixLeafletIcons();

  const filtered = MAP_PROPERTIES.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-16 h-screen flex flex-col">
        {/* Top bar */}
        <div className="px-4 py-3 glass-card-strong border-b border-border/50">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search on map..."
                className="pl-10 bg-secondary/50 border-border/50 h-9"
              />
            </div>
            <Badge variant="outline" className="text-xs border-gold/30 text-gold">
              {filtered.length} properties
            </Badge>
          </div>
        </div>

        {/* Split layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Property cards sidebar */}
          <div className="w-[380px] hidden lg:flex flex-col border-r border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filtered.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedProperty(property)}
                  onMouseEnter={() => setHoveredId(property.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`rounded-xl p-4 cursor-pointer transition-all border ${
                    selectedProperty?.id === property.id
                      ? "glass-card-strong border-gold/30 glow-gold"
                      : hoveredId === property.id
                      ? "glass-card border-border/50"
                      : "border-transparent hover:glass-card"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge className={`text-xs ${property.listing_type === "sale" ? "bg-gold/20 text-gold" : "bg-blue-accent/20 text-blue-accent"}`}>
                        {property.listing_type === "sale" ? "Buy" : "Rent"}
                      </Badge>
                    </div>
                    <span className="text-base font-bold text-gradient-gold">
                      {formatPrice(property.price, property.listing_type)}
                    </span>
                  </div>

                  <h3 className="font-medium text-sm text-foreground line-clamp-1">{property.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.city}, {property.state}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-3 w-3 text-gold/60" /> {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3 w-3 text-gold/60" /> {property.bathrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="h-3 w-3 text-gold/60" /> {property.area_sqft} sq.ft
                    </span>
                  </div>

                  {selectedProperty?.id === property.id && (
                    <Link href={`/property/${property.id}`}>
                      <Button size="sm" className="w-full mt-3 btn-gold rounded-lg text-xs">
                        View Details
                      </Button>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {filtered.map((property) => (
                property.latitude && property.longitude ? (
                  <Marker
                    key={property.id}
                    position={[property.latitude, property.longitude]}
                    eventHandlers={{
                      click: () => setSelectedProperty(property),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                        <p className="text-gold font-bold">{formatPrice(property.price, property.listing_type)}</p>
                        <p className="text-xs text-gray-400 mt-1">{property.bedrooms} bed · {property.bathrooms} bath · {property.area_sqft} sq.ft</p>
                        <Link href={`/property/${property.id}`}>
                          <button className="mt-2 w-full text-xs bg-gold/20 text-gold py-1.5 rounded-lg hover:bg-gold/30 transition-colors">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ) : null
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
