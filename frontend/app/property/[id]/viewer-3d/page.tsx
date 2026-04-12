"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import Link from "next/link";
import {
  ChevronLeft, Sun, Moon, Lamp, Sofa, LayoutGrid,
  RotateCcw, ZoomIn, ZoomOut, Maximize2, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PropertyModel({ showFurniture }: { showFurniture: boolean }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1a1a28" />
      </mesh>

      {/* Walls */}
      <mesh position={[-6, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 12]} />
        <meshStandardMaterial color="#2a2a3a" transparent opacity={0.6} />
      </mesh>
      <mesh position={[6, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 12]} />
        <meshStandardMaterial color="#2a2a3a" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1.5, -6]}>
        <boxGeometry args={[12, 3, 0.1]} />
        <meshStandardMaterial color="#2a2a3a" transparent opacity={0.6} />
      </mesh>

      {/* Room divider */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.08, 3, 5]} />
        <meshStandardMaterial color="#3a3a4a" transparent opacity={0.4} />
      </mesh>

      {/* Furniture (toggleable) */}
      {showFurniture && (
        <group>
          {/* Living room - Sofa */}
          <mesh position={[-3, 0.4, 2]} castShadow>
            <boxGeometry args={[3, 0.8, 1]} />
            <meshStandardMaterial color="#4a3520" />
          </mesh>
          {/* Sofa back */}
          <mesh position={[-3, 0.8, 2.4]} castShadow>
            <boxGeometry args={[3, 0.6, 0.2]} />
            <meshStandardMaterial color="#4a3520" />
          </mesh>
          {/* Coffee table */}
          <mesh position={[-3, 0.25, 0.5]} castShadow>
            <boxGeometry args={[1.5, 0.5, 0.8]} />
            <meshStandardMaterial color="#2a2015" />
          </mesh>
          {/* TV Stand */}
          <mesh position={[-3, 0.3, -1.5]} castShadow>
            <boxGeometry args={[2, 0.6, 0.4]} />
            <meshStandardMaterial color="#1a1a28" />
          </mesh>
          {/* TV */}
          <mesh position={[-3, 1.2, -1.5]}>
            <boxGeometry args={[1.8, 1, 0.05]} />
            <meshStandardMaterial color="#0a0a0f" />
          </mesh>

          {/* Bedroom - Bed */}
          <mesh position={[3, 0.3, -2]} castShadow>
            <boxGeometry args={[2.5, 0.6, 3]} />
            <meshStandardMaterial color="#8B7355" />
          </mesh>
          {/* Headboard */}
          <mesh position={[3, 0.8, -3.4]}>
            <boxGeometry args={[2.5, 1, 0.15]} />
            <meshStandardMaterial color="#5a4a30" />
          </mesh>
          {/* Nightstand */}
          <mesh position={[4.5, 0.25, -3]} castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#3a2a15" />
          </mesh>

          {/* Dining - Table */}
          <mesh position={[3, 0.4, 3]} castShadow>
            <boxGeometry args={[2, 0.05, 1.2]} />
            <meshStandardMaterial color="#5a4530" />
          </mesh>
          {/* Table legs */}
          {[-0.8, 0.8].map((x) =>
            [-0.5, 0.5].map((z) => (
              <mesh key={`${x}-${z}`} position={[3 + x, 0.2, 3 + z]} castShadow>
                <boxGeometry args={[0.05, 0.4, 0.05]} />
                <meshStandardMaterial color="#3a2a15" />
              </mesh>
            ))
          )}
        </group>
      )}
    </group>
  );
}

export default function Viewer3DPage() {
  const [showFurniture, setShowFurniture] = useState(true);
  const [lighting, setLighting] = useState<"day" | "evening" | "night">("day");
  const [showWalls, setShowWalls] = useState(true);

  const lightConfig = {
    day: { intensity: 1.2, color: "#ffffff", ambient: 0.6, env: "sunset" as const },
    evening: { intensity: 0.6, color: "#ffa040", ambient: 0.3, env: "sunset" as const },
    night: { intensity: 0.2, color: "#4060ff", ambient: 0.15, env: "night" as const },
  };

  const current = lightConfig[lighting];

  return (
    <div className="h-screen flex flex-col gradient-bg">
      {/* Top bar */}
      <div className="h-14 glass-card-strong border-b border-border/50 flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <Link href="/property/1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <div className="h-5 w-px bg-border/50" />
          <h1 className="text-sm font-medium text-foreground">3D Property Viewer</h1>
          <Badge className="bg-blue-accent/10 text-blue-accent text-xs">Interactive</Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5" />
          Drag to rotate · Scroll to zoom
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas
          shadows
          camera={{ position: [10, 8, 10], fov: 50 }}
          className="bg-[#0a0a0f]"
        >
          <ambientLight intensity={current.ambient} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={current.intensity}
            color={current.color}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-3, 2.5, 2]} intensity={lighting === "night" ? 0.5 : 0} color="#d4a853" distance={5} />
          <pointLight position={[3, 2.5, -2]} intensity={lighting === "night" ? 0.3 : 0} color="#d4a853" distance={5} />

          <Suspense fallback={
            <Html center>
              <div className="text-gold animate-pulse">Loading 3D Model...</div>
            </Html>
          }>
            <PropertyModel showFurniture={showFurniture} />
            <ContactShadows opacity={0.4} scale={20} blur={2} far={10} position={[0, -0.01, 0]} />
            <Environment preset={current.env} background={false} />
          </Suspense>

          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={3}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2.1}
          />

          {/* Grid helper */}
          <gridHelper args={[20, 20, "#1a1a28", "#1a1a28"]} position={[0, -0.005, 0]} />
        </Canvas>

        {/* Controls panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-6 left-6 glass-card-strong rounded-xl p-4 space-y-3 w-56"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Controls</h3>

          {/* Lighting */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Lighting</label>
            <div className="flex gap-1">
              {[
                { key: "day", icon: Sun, label: "Day" },
                { key: "evening", icon: Lamp, label: "Eve" },
                { key: "night", icon: Moon, label: "Night" },
              ].map(({ key, icon: Icon, label }) => (
                <Button
                  key={key}
                  size="sm"
                  variant={lighting === key ? "default" : "outline"}
                  onClick={() => setLighting(key as "day" | "evening" | "night")}
                  className={`flex-1 text-xs ${
                    lighting === key
                      ? "bg-gold/20 text-gold border-gold/30 hover:bg-gold/30"
                      : "border-border/50"
                  }`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Furniture toggle */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Furniture</label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowFurniture(!showFurniture)}
              className={`w-full text-xs ${
                showFurniture
                  ? "bg-gold/20 text-gold border-gold/30"
                  : "border-border/50 text-muted-foreground"
              }`}
            >
              <Sofa className="h-3 w-3 mr-1.5" />
              {showFurniture ? "Hide Furniture" : "Show Furniture"}
            </Button>
          </div>

          {/* Layout toggle */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Layout</label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowWalls(!showWalls)}
              className={`w-full text-xs ${
                showWalls
                  ? "bg-blue-accent/20 text-blue-accent border-blue-accent/30"
                  : "border-border/50 text-muted-foreground"
              }`}
            >
              <LayoutGrid className="h-3 w-3 mr-1.5" />
              {showWalls ? "Hide Walls" : "Show Walls"}
            </Button>
          </div>
        </motion.div>

        {/* Room labels */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 right-6 glass-card-strong rounded-xl p-4 w-48"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Rooms</h3>
          <div className="space-y-1">
            {["Living Room", "Master Bedroom", "Dining Area", "Balcony"].map((room) => (
              <div
                key={room}
                className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                {room}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
