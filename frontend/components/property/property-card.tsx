"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Bath, BedDouble, Maximize2, MapPin, Heart } from "lucide-react";
import { formatPrice, formatArea } from "@/lib/constants";
import type { Property } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);

  // Generate placeholder gradient based on property id
  const gradients = [
    "from-blue-900/40 to-purple-900/40",
    "from-emerald-900/40 to-teal-900/40",
    "from-amber-900/40 to-orange-900/40",
    "from-rose-900/40 to-pink-900/40",
    "from-indigo-900/40 to-blue-900/40",
    "from-cyan-900/40 to-sky-900/40",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/property/${property.id}`}>
        <div className="rounded-xl overflow-hidden glass-card-strong hover:border-gold/30 transition-all duration-300">
          {/* Image Section */}
          <div className={`relative h-52 bg-gradient-to-br ${gradient} overflow-hidden`}>
            {property.images && property.images.length > 0 ? (
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-2">
                    <MapPin className="h-8 w-8 text-gold/60" />
                  </div>
                  <span className="text-xs text-white/40">{property.city}</span>
                </div>
              </div>
            )}

            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-gold/90 text-[#0a0a0f] font-semibold text-xs hover:bg-gold">
                {property.listing_type === "sale" ? "For Sale" : "For Rent"}
              </Badge>
              {property.model_3d_url && (
                <Badge className="bg-blue-accent/90 text-white text-xs hover:bg-blue-accent">
                  3D Tour
                </Badge>
              )}
            </div>

            {/* Like button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className="absolute top-3 right-3 h-8 w-8 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  liked ? "fill-red-500 text-red-500" : "text-white/70"
                }`}
              />
            </button>

            {/* Price overlay */}
            <div className="absolute bottom-3 left-3">
              <span className="text-lg font-bold text-white drop-shadow-lg">
                {formatPrice(property.price, property.listing_type)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-gold transition-colors">
              {property.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {property.address}, {property.city}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <BedDouble className="h-3.5 w-3.5 text-gold/70" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Bath className="h-3.5 w-3.5 text-gold/70" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Maximize2 className="h-3.5 w-3.5 text-gold/70" />
                <span>{formatArea(property.area_sqft)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
