"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    license_number: "",
    agency_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        role,
        ...(role !== "agent" && { license_number: undefined, agency_name: undefined }),
      };
      const { data } = await api.post("/auth/register", payload);
      login(data.user, data.access_token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="absolute top-20 right-[20%] h-64 w-64 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-20 left-[20%] h-64 w-64 rounded-full bg-blue-accent/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
            <Home className="h-6 w-6 text-[#0a0a0f]" />
          </div>
          <span className="text-2xl font-bold text-gradient-gold">Homiq</span>
        </Link>

        <div className="glass-card-strong rounded-2xl p-8 glow-gold">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join the future of real estate</p>
          </div>

          {/* Role Tabs */}
          <Tabs value={role} onValueChange={setRole} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
              <TabsTrigger value="customer" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <User className="h-4 w-4 mr-2" />
                Buyer
              </TabsTrigger>
              <TabsTrigger value="agent" className="data-[state=active]:bg-blue-accent/20 data-[state=active]:text-blue-accent">
                <Building className="h-4 w-4 mr-2" />
                Agent
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Full Name</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  placeholder="John Doe"
                  required
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-gold/50"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-gold/50"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Phone</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-gold/50"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                  className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-gold/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {role === "agent" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 pt-2"
              >
                <div>
                  <Label className="text-sm text-muted-foreground">License Number</Label>
                  <Input
                    value={formData.license_number}
                    onChange={(e) => update("license_number", e.target.value)}
                    placeholder="RERA License"
                    className="mt-1.5 bg-secondary/50 border-border/50 focus:border-gold/50"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Agency Name</Label>
                  <Input
                    value={formData.agency_name}
                    onChange={(e) => update("agency_name", e.target.value)}
                    placeholder="Your Agency"
                    className="mt-1.5 bg-secondary/50 border-border/50 focus:border-gold/50"
                  />
                </div>
              </motion.div>
            )}

            <Button type="submit" disabled={loading} className="w-full btn-gold rounded-xl h-11">
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:text-gold-light font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
