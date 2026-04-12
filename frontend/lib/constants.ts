export const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
  "Chandigarh", "Goa", "Noida", "Gurgaon", "Kochi",
];

export const AMENITIES = [
  "Swimming Pool", "Gym", "Parking", "Garden", "Security",
  "Power Backup", "Lift", "Club House", "Children\'s Play Area",
  "Jogging Track", "Indoor Games", "Intercom", "Fire Safety",
  "CCTV", "Water Supply 24/7", "Gas Pipeline", "Smart Home",
];

export const LISTING_TYPES = [
  { value: "sale", label: "Buy" },
  { value: "rent", label: "Rent" },
];

export const PRICE_RANGES = {
  sale: [
    { label: "Under ₹50L", min: 0, max: 5000000 },
    { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr - ₹3Cr", min: 10000000, max: 30000000 },
    { label: "₹3Cr - ₹5Cr", min: 30000000, max: 50000000 },
    { label: "Above ₹5Cr", min: 50000000, max: undefined },
  ],
  rent: [
    { label: "Under ₹10K", min: 0, max: 10000 },
    { label: "₹10K - ₹25K", min: 10000, max: 25000 },
    { label: "₹25K - ₹50K", min: 25000, max: 50000 },
    { label: "₹50K - ₹1L", min: 50000, max: 100000 },
    { label: "Above ₹1L", min: 100000, max: undefined },
  ],
};

export const formatPrice = (price: number, type: string = "sale"): string => {
  if (type === "rent") {
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L/mo`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K/mo`;
    return `₹${price}/mo`;
  }
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price}`;
};

export const formatArea = (sqft: number): string => {
  if (sqft >= 1000) return `${(sqft / 1000).toFixed(1)}K sq.ft`;
  return `${sqft} sq.ft`;
};
