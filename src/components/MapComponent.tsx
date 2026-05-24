"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapPin, Navigation, Compass, Shield, Zap, Sparkles } from 'lucide-react';

interface MapComponentProps {
  interactive?: boolean;
  onSelectLocations?: (pickup: string, dropoff: string, distance: number) => void;
  showHeatmap?: boolean;
}

export default function MapComponent({ interactive = true, onSelectLocations, showHeatmap = false }: MapComponentProps) {
  const { theme, ridePhase, driverCoords, distanceRemaining, activeRide } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Locations metadata
  const locations = [
    { name: "Thamel, Kathmandu", x: 220, y: 120, isHub: true },
    { name: "Patan Durbar Square, Lalitpur", x: 250, y: 340, isHub: true },
    { name: "Baneshwor, Kathmandu", x: 380, y: 220, isHub: false },
    { name: "Kalanki, Kathmandu", x: 80, y: 240, isHub: false },
    { name: "Tribhuvan Int'l Airport", x: 450, y: 170, isHub: true },
    { name: "Boudhanath Stupa", x: 420, y: 70, isHub: false },
    { name: "Swayambhunath (Monkey Temple)", x: 100, y: 110, isHub: false },
    { name: "Dharahara (Sundhara)", x: 230, y: 200, isHub: false }
  ];

  const [pickupSelect, setPickupSelect] = useState<string>("Thamel, Kathmandu");
  const [destSelect, setDestSelect] = useState<string>("Patan Durbar Square, Lalitpur");

  // Redraw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particleOffset = 0;

    // Standard high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const drawMap = () => {
      // 1. Clear background
      if (theme === 'dark') {
        ctx.fillStyle = "#0A0F1D"; // Obsidian Dark Blue
      } else {
        ctx.fillStyle = "#F1F5F9"; // Premium Light Slate
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw modern digital grid lines
      ctx.strokeStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3. Draw Water Bodies (Bagmati River vector pathway)
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.4);
      ctx.bezierCurveTo(
        canvas.width * 0.3, canvas.height * 0.35, 
        canvas.width * 0.4, canvas.height * 0.6, 
        canvas.width * 0.7, canvas.height * 0.65
      );
      ctx.bezierCurveTo(
        canvas.width * 0.85, canvas.height * 0.68,
        canvas.width * 0.9, canvas.height * 0.8,
        canvas.width, canvas.height * 0.85
      );
      ctx.strokeStyle = theme === 'dark' ? "rgba(37, 99, 235, 0.15)" : "rgba(37, 99, 235, 0.22)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.stroke();

      // 4. Draw road networks (sleek glowing paths connecting landmarks)
      ctx.strokeStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 3;
      
      // Ring Road circle mockup
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.38, 0, 2 * Math.PI);
      ctx.stroke();

      // Inner connecting streets
      locations.forEach((loc, i) => {
        locations.forEach((otherLoc, j) => {
          // Draw roads between nearest neighbours
          const dist = Math.hypot(loc.x - otherLoc.x, loc.y - otherLoc.y);
          if (dist < 150 && i !== j) {
            ctx.beginPath();
            ctx.moveTo(loc.x, loc.y);
            ctx.lineTo(otherLoc.x, otherLoc.y);
            ctx.stroke();
          }
        });
      });

      // 5. Draw Passenger Demand Heatmap (if enabled)
      if (showHeatmap) {
        const heatmapBlobs = [
          { x: 220, y: 120, r: 50, intensity: 0.3 }, // Thamel
          { x: 380, y: 220, r: 60, intensity: 0.25 }, // Baneshwor
          { x: 80, y: 240, r: 45, intensity: 0.2 }, // Kalanki
          { x: 250, y: 340, r: 55, intensity: 0.35 } // Patan
        ];

        heatmapBlobs.forEach(blob => {
          const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
          grad.addColorStop(0, `rgba(225, 29, 72, ${blob.intensity})`); // Crimson center
          grad.addColorStop(0.5, `rgba(245, 158, 11, ${blob.intensity * 0.5})`); // Saffron shell
          grad.addColorStop(1, 'rgba(225, 29, 72, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.r, 0, 2 * Math.PI);
          ctx.fill();
        });
      }

      // 6. Draw Landmark Pins & Labels
      locations.forEach(loc => {
        // Dot marker
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, loc.isHub ? 5 : 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = loc.isHub ? "#E11D48" : "#2563EB";
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Label text
        ctx.fillStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.4)" : "rgba(30, 41, 59, 0.6)";
        ctx.font = "bold 9px Outfit";
        ctx.fillText(loc.name.split(',')[0], loc.x + 8, loc.y + 3);
      });

      // 7. Draw Active Ride Route Path & Moving Vehicle
      const pLoc = locations.find(l => l.name === pickupSelect) || locations[0];
      const dLoc = locations.find(l => l.name === destSelect) || locations[1];

      if (ridePhase !== 'idle') {
        // Draw pickup pin
        ctx.fillStyle = "#2563EB"; // Royal blue
        ctx.beginPath();
        ctx.arc(pLoc.x, pLoc.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 8px Inter";
        ctx.textAlign = "center";
        ctx.fillText("P", pLoc.x, pLoc.y + 3);

        // Draw destination pin
        ctx.fillStyle = "#E11D48"; // Crimson Red
        ctx.beginPath();
        ctx.arc(dLoc.x, dLoc.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 8px Inter";
        ctx.textAlign = "center";
        ctx.fillText("D", dLoc.x, dLoc.y + 3);

        // Route Path Line (glowing dash line)
        ctx.beginPath();
        ctx.moveTo(pLoc.x, pLoc.y);
        // Slightly curved path for aesthetic look
        const midX = (pLoc.x + dLoc.x) / 2 + 30;
        const midY = (pLoc.y + dLoc.y) / 2 - 40;
        ctx.quadraticCurveTo(midX, midY, dLoc.x, dLoc.y);
        
        ctx.strokeStyle = theme === 'dark' ? "rgba(245, 158, 11, 0.4)" : "rgba(245, 158, 11, 0.6)";
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.lineDashOffset = -particleOffset;
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // 8. Draw Simulated Moving Driver Vehicle
        if (['arriving', 'in_trip', 'completed'].includes(ridePhase)) {
          particleOffset += 0.5;

          // Interpolate coordinate positions on the quadratic curve
          let tValue = 0;
          let vehicleColor = "#2563EB"; // Default

          if (ridePhase === 'arriving') {
            // Driver is driving towards the pickup point (started from Thamel area offset)
            const driverStart = { x: 220, y: 120 }; // Thamel
            const ratio = 1 - Math.min(1, Math.max(0, distanceRemaining));
            tValue = ratio;

            // Animate vehicle towards pickup
            const currentX = driverStart.x + (pLoc.x - driverStart.x) * tValue;
            const currentY = driverStart.y + (pLoc.y - driverStart.y) * tValue;

            drawVehicleMarker(ctx, currentX, currentY, "arriving", "#F59E0B"); // Saffron for arriving
          } else if (ridePhase === 'in_trip') {
            // Passenger is inside the vehicle moving towards destination
            const totalD = activeRide?.distanceKm || 5.4;
            const currentRem = Math.max(0, Math.min(totalD, distanceRemaining));
            tValue = 1 - (currentRem / totalD);

            // Compute quadratic Bezier point
            const currentX = (1 - tValue) * (1 - tValue) * pLoc.x + 2 * (1 - tValue) * tValue * midX + tValue * tValue * dLoc.x;
            const currentY = (1 - tValue) * (1 - tValue) * pLoc.y + 2 * (1 - tValue) * tValue * midY + tValue * tValue * dLoc.y;

            const isEcoEV = activeRide?.isEV || activeRide?.vehicleType === 'scooter';
            drawVehicleMarker(ctx, currentX, currentY, "in_trip", isEcoEV ? "#10B981" : "#E11D48"); // Green if EV, Red otherwise
          } else if (ridePhase === 'completed') {
            // At Destination
            drawVehicleMarker(ctx, dLoc.x, dLoc.y, "completed", "#10B981");
          }
        }
      }

      animationId = requestAnimationFrame(drawMap);
    };

    const drawVehicleMarker = (ctx: CanvasRenderingContext2D, x: number, y: number, phase: string, color: string) => {
      // Outer glow pulse
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, 2 * Math.PI);
      ctx.fillStyle = `${color}22`;
      ctx.fill();

      // Shadow border
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Core white spot
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // Draw vehicle indicator symbol/flag based on category
      ctx.fillStyle = theme === 'dark' ? "#FFFFFF" : "#0A0F1D";
      ctx.font = "bold 8px Outfit";
      ctx.textAlign = "center";
      
      let initial = "V";
      if (activeRide?.vehicleType === 'auto') initial = "A";
      else if (activeRide?.vehicleType === 'bike') initial = "B";
      else if (activeRide?.vehicleType === 'taxi') initial = "C";
      else if (activeRide?.vehicleType === 'scooter') initial = "E"; // EV

      ctx.fillText(initial, x, y - 11);
    };

    drawMap();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [theme, ridePhase, driverCoords, distanceRemaining, activeRide, pickupSelect, destSelect, showHeatmap]);

  const handleLocationsChange = (p: string, d: string) => {
    setPickupSelect(p);
    setDestSelect(d);
    
    // Simulate some distances
    const hash = (p + d).length;
    const distanceKm = Math.max(1.5, parseFloat((2.5 + (hash % 12) * 1.1).toFixed(1)));
    
    if (onSelectLocations) {
      onSelectLocations(p, d, distanceKm);
    }
  };

  return (
    <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border ${
      theme === 'dark' ? 'border-white/10' : 'border-slate-200'
    }`}>
      
      {/* Canvas viewport */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating control card overlay */}
      {interactive && ridePhase === 'idle' && (
        <div className={`absolute top-4 left-4 p-5 rounded-2xl glass-card-dark max-w-sm w-[90%] space-y-4 border ${
          theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-800/10 text-slate-800 bg-white/90'
        }`}>
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-saffron animate-spin-slow" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Kathmandu Interactive Navigator</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Pickup Spot (पिकअप)</label>
              <select 
                id="map-pickup-select"
                value={pickupSelect}
                onChange={(e) => handleLocationsChange(e.target.value, destSelect)}
                className={`w-full text-xs p-2.5 rounded-lg border focus:ring-1 focus:ring-primary outline-none font-semibold ${
                  theme === 'dark' ? 'bg-dark-card border-white/15' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {locations.filter(l => l.name !== destSelect).map(loc => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Destination (गन्तव्य)</label>
              <select 
                id="map-destination-select"
                value={destSelect}
                onChange={(e) => handleLocationsChange(pickupSelect, e.target.value)}
                className={`w-full text-xs p-2.5 rounded-lg border focus:ring-1 focus:ring-primary outline-none font-semibold ${
                  theme === 'dark' ? 'bg-dark-card border-white/15' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {locations.filter(l => l.name !== pickupSelect).map(loc => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-white/5 pt-2">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-saffron" /> AI routing optimized
            </span>
            <span className="text-secondary font-black">No API key required</span>
          </div>
        </div>
      )}

      {/* Floating status details on active rides */}
      {ridePhase !== 'idle' && (
        <div className="absolute bottom-4 right-4 bg-dark-bg/90 border border-white/10 rounded-2xl p-4 text-white text-xs max-w-xs shadow-2xl flex flex-col gap-2 backdrop-blur-md">
          <div className="flex items-center justify-between font-bold border-b border-white/10 pb-1.5">
            <span className="uppercase text-saffron tracking-widest text-[9px]">Sajilo Radar GPS</span>
            <span className="bg-primary/20 text-primary text-[9px] px-2 py-0.5 rounded-full font-black animate-pulse">LIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary animate-bounce" />
            <div>
              <span className="block font-semibold">Active Booking Tracking</span>
              <span className="block text-[10px] text-slate-400">
                {ridePhase === 'matching' && 'Matching with nearby vehicles...'}
                {ridePhase === 'arriving' && `Driver approaching: ${distanceRemaining} km away`}
                {ridePhase === 'in_trip' && `En-route to dropoff: ${distanceRemaining} km remaining`}
                {ridePhase === 'completed' && 'Trip completed safely! Namaste.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
