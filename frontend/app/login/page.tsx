"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data.user, data.access_token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Demo login helper
  const handleDemoLogin = async (role: string) => {
    setLoading(true);
    setError("");
    try {
      const demoEmail = role === "agent" ? "agent@homiq.com" : "user@homiq.com";
      const { data } = await api.post("/auth/login", {
        email: demoEmail,
        password: "demo123456",
      });
      login(data.user, data.access_token);
      router.push("/dashboard");
    } catch {
      // If demo accounts don't exist, create them
      try {
        const demoEmail = role === "agent" ? "agent@homiq.com" : "user@homiq.com";
        const { data } = await api.post("/auth/register", {
          email: demoEmail,
          password: "demo123456",
          full_name: role === "agent" ? "Demo Agent" : "Demo User",
          role: role === "agent" ? "agent" : "customer",
        });
        login(data.user, data.access_token);
        router.push("/dashboard");
      } catch {
        setError("Unable to create demo account. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Decorative */}
      <div className="absolute top-20 left-[20%] h-64 w-64 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-20 right-[20%] h-64 w-64 rounded-full bg-blue-accent/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
            <Home className="h-6 w-6 text-[#0a0a0f]" />
          </div>
          <span className="text-2xl font-bold text-gradient-gold">Homiq</span>
        </Link>

        {/* Card */}
        <div className="glass-card-strong rounded-2xl p-8 glow-gold">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to access your Homiq dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-gold/50"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-gold rounded-xl h-11"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("customer")}
                disabled={loading}
                className="border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold"
              >
                Demo User
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("agent")}
                disabled={loading}
                className="border-border/50 text-muted-foreground hover:border-blue-accent/30 hover:text-blue-accent"
              >
                Demo Agent
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-gold hover:text-gold-light transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
