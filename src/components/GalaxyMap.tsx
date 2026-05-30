import React, { useState } from 'react';
import { Galaxy } from '../types';
import { Compass, ShieldAlert, CheckCircle2, Star, Zap, Info } from 'lucide-react';

interface GalaxyMapProps {
  galaxies: Galaxy[];
  points: number;
  onUnlockGalaxy: (galaxyId: string) => void;
  planetsCountByGalaxy: Record<string, { total: number; unlocked: number }>;
}

export const GalaxyMap: React.FC<GalaxyMapProps> = ({
  galaxies,
  points,
  onUnlockGalaxy,
  planetsCountByGalaxy,
}) => {
  const [selectedGalaxy, setSelectedGalaxy] = useState<Galaxy | null>(galaxies[0] || null);

  const handleNodeClick = (galaxy: Galaxy) => {
    setSelectedGalaxy(galaxy);
  };

  return (
    <div className="space-y-6" id="galaxy-map-section">
      {/* Narrative block */}
      <div>
        <h2 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2">
          <Compass className="w-6 h-6 text-neon-cyan animate-pulse" />
          Astrocartography Schematics
        </h2>
        <p className="text-sm text-zinc-400 font-sans mt-1">
          Holographic telemetry grid of physical galaxy clusters. Click coordinates to redirect ship scanner arrays.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Schematic Canvas representation (LG col span 8) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-4 overflow-hidden border border-zinc-800 relative min-h-[350px] flex flex-col justify-between">
          {/* Spatial mesh network layout */}
          <div className="absolute inset-0 space-grid opacity-25 pointer-events-none" />

          {/* Star particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse-ring" />
            <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-blue-500/55 rounded-full animate-pulse" />
            <div className="absolute bottom-1/5 left-1/5 w-1 h-1 bg-blue-400/40 rounded-full" />
            <div className="absolute top-1/5 right-1/3 w-1.5 h-1.5 bg-blue-350/35 rounded-full animate-float" />
          </div>

          {/* Interactive SVG layer */}
          <div className="relative w-full aspect-[4/3] max-w-full flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              id="galactic-svg-canvas"
            >
              {/* Grid background orbit lines */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="0.5" />
              
              {/* Linked gravity hyper-lanes connecting systems */}
              {galaxies.map((gal, idx) => {
                const nextGal = galaxies[idx + 1];
                if (!nextGal) return null;
                return (
                  <line
                    key={`line-${gal.id}-${nextGal.id}`}
                    x1={gal.x}
                    y1={gal.y}
                    x2={nextGal.x}
                    y2={nextGal.y}
                    stroke={gal.unlocked && nextGal.unlocked ? '#3b82f6' : 'rgba(255, 255, 255, 0.07)'}
                    strokeWidth={gal.unlocked && nextGal.unlocked ? '0.75' : '0.4'}
                    strokeDasharray={(!gal.unlocked || !nextGal.unlocked) ? '3,3' : undefined}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Pulsing ring emitters under selected galaxy */}
              {selectedGalaxy && (
                <circle
                  cx={selectedGalaxy.x}
                  cy={selectedGalaxy.y}
                  r="6"
                  fill="none"
                  stroke={selectedGalaxy.unlocked ? '#3b82f6' : '#1e3a8a'}
                  strokeWidth="0.5"
                  className="animate-ping origin-center"
                  style={{ transformOrigin: `${selectedGalaxy.x}% ${selectedGalaxy.y}%` }}
                />
              )}
            </svg>

            {/* Render HTML Node buttons positioned absolutely on the SVG coordinate space */}
            {galaxies.map((gal) => {
              const stats = planetsCountByGalaxy[gal.id] || { total: 0, unlocked: 0 };
              const isSelected = selectedGalaxy?.id === gal.id;
              
              return (
                <button
                  key={gal.id}
                  id={`galaxy-node-${gal.id}`}
                  onClick={() => handleNodeClick(gal)}
                  className="absolute group -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-all duration-300 hover:scale-110 z-20"
                  style={{ left: `${gal.x}%`, top: `${gal.y}%` }}
                >
                  <div className="relative">
                    {/* Glowing outer core */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                        gal.unlocked
                          ? isSelected
                            ? 'bg-blue-600/25 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.35)]'
                            : 'bg-zinc-950 border-blue-500/50 hover:border-blue-500'
                          : isSelected
                          ? 'bg-blue-900/20 border-blue-900 shadow-[0_0_12px_rgba(37,99,235,0.2)]'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-650'
                      }`}
                    >
                      {gal.unlocked ? (
                        <Star className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400 fill-blue-400' : 'text-blue-400/70'}`} />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
                      )}
                    </div>

                    {/* Simple badge name on hover or selected */}
                    <div
                      className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cosmic-dark/95 border border-zinc-800 rounded px-2 py-0.5 text-[9px] font-mono text-zinc-200 transition-all ${
                        isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 pointer-events-none'
                      }`}
                    >
                      {gal.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Coordinate system visual markers */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mt-2">
            <span>GRID ZONE: AND-MK9</span>
            <span>POLAR SECTOR RAD: 420.50</span>
            <span>AUTO-GRID SYNCED</span>
          </div>
        </div>

        {/* Selected Galaxy Detail Panel (LG col span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between" id="galaxy-detail-panel">
          {selectedGalaxy ? (
            <div className="glass-panel rounded-3xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {selectedGalaxy.unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-mono text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/15">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      Clearance Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-mono text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/15">
                      <ShieldAlert className="w-3 h-3" />
                      Sector Locked
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-zinc-500">
                    X-Y: {selectedGalaxy.x}, {selectedGalaxy.y}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-display font-medium text-white flex items-center gap-2">
                    {selectedGalaxy.name}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {selectedGalaxy.description}
                  </p>
                </div>

                {/* Sub regional planet counts inside galaxy */}
                <div className="bg-cosmic-black/60 rounded-xl p-3 border border-zinc-850 space-y-2.5">
                  <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider block">
                    Stellar Density Metrics
                  </span>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-sans">Identified Planet Signals</span>
                    <span className="font-mono text-white font-semibold">
                      {planetsCountByGalaxy[selectedGalaxy.id]?.total || 0} Orbs
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-sans">Explored / Unlocked</span>
                    <span className="font-mono text-blue-400 font-bold">
                      {planetsCountByGalaxy[selectedGalaxy.id]?.unlocked || 0} Discovered
                    </span>
                  </div>

                  {/* Little micro percentage bar */}
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{
                        width: `${
                          (((planetsCountByGalaxy[selectedGalaxy.id]?.unlocked || 0) /
                            (planetsCountByGalaxy[selectedGalaxy.id]?.total || 1)) *
                            100) || 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Unlock controls if quadrant is locked */}
              {!selectedGalaxy.unlocked ? (
                <div className="mt-4 pt-4 border-t border-zinc-900 space-y-3">
                  <div className="p-3 rounded-xl bg-blue-600/5 border border-blue-600/15 space-y-1">
                    <h4 className="text-xs font-display font-medium text-white flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-500" />
                      Expand Star Cartography
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      Clearance is requested. Spending Stellar points will synchronize warp fields and reveal locked planets.
                    </p>
                  </div>
                  
                  <button
                    id="btn-unlock-galaxy-trigger"
                    onClick={() => onUnlockGalaxy(selectedGalaxy.id)}
                    disabled={points < 500}
                    className={`w-full py-2.5 rounded-xl font-sans font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
                      points >= 500
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow glow-cyan cursor-pointer'
                        : 'bg-zinc-900 text-zinc-500 border border-zinc-850 cursor-not-allowed'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                    Acquire Galactic License (500 SP)
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-blue-600/5 border border-blue-600/15 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    This spatial cluster is fully decrypted. Scan the <strong>Planet Discovery Center</strong> to decipher locked planet signals in this sector.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 border border-zinc-850 text-center flex flex-col justify-center items-center h-full">
              <Compass className="w-8 h-8 text-zinc-600 animate-spin-slow mb-2" />
              <p className="text-xs text-zinc-500 font-sans">Choose any coordinates coordinate node on the grid to start mapping.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
