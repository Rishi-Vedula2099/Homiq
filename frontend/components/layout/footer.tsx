"use client";

import Link from "next/link";
import { Home, Globe, Send, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Home className="h-4 w-4 text-[#0a0a0f]" />
              </div>
              <span className="text-lg font-bold text-gradient-gold">Homiq</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered real estate platform with 3D property walkthroughs,
              smart recommendations, and intelligent market insights.
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, Send, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="h-9 w-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              {["Properties", "Map Search", "AI Insights", "3D Viewer"].map((item) => (
                <li key={item}>
                  <Link href="/properties" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Contact", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Homiq. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using Next.js, FastAPI & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
