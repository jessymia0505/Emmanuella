import React, { useState } from 'react';
import { Artifact, RarityType } from '../types';
import { Sparkles, HelpCircle, ShieldAlert, Cpu, Orbit, Zap, Star } from 'lucide-react';

interface CosmicArtifactsProps {
  artifacts: Artifact[];
  points: number;
  onUnlockArtifact: (artifactId: string) => void;
}

export const CosmicArtifacts: React.FC<CosmicArtifactsProps> = ({
  artifacts,
  points,
  onUnlockArtifact,
}) => {
  const [activeStoryArtifact, setActiveStoryArtifact] = useState<Artifact | null>(null);
  const [syncedState, setSyncedState] = useState<Record<string, 'idle' | 'syncing' | 'completed'>>({});

  const triggerSync = (artId: string) => {
    setSyncedState((prev) => ({ ...prev, [artId]: 'syncing' }));
    
    // Simulate interactive quantum sync stabilization
    setTimeout(() => {
      setSyncedState((prev) => ({ ...prev, [artId]: 'completed' }));
      onUnlockArtifact(artId);
    }, 1800);
  };

  const getArtifactIcon = (imageId: string) => {
    switch (imageId) {
      case 'glass_crystal':
        return <Sparkles className="w-10 h-10 text-sky-300" />;
      case 'gear_compass':
        return <Orbit className="w-10 h-10 text-zinc-300 rotate-45" />;
      case 'gold_sphere':
        return <Cpu className="w-10 h-10 text-blue-400" />;
      case 'key_star':
        return <Star className="w-10 h-10 text-blue-500" />;
      case 'gadget_dial':
        return <Zap className="w-10 h-10 text-zinc-100" />;
      default:
        return <HelpCircle className="w-10 h-10 text-zinc-400" />;
    }
  };

  const getRarityGlow = (rarity: RarityType) => {
    switch (rarity) {
      case 'Common':
        return 'border-zinc-800 hover:border-zinc-700/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]';
      case 'Rare':
        return 'border-blue-900/40 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]';
      case 'Epic':
        return 'border-blue-800/40 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]';
      case 'Legendary':
        return 'border-zinc-700/40 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]';
      case 'Cosmic':
        return 'border-blue-800/40 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]';
    }
  };

  const getRarityBadgeText = (rarity: RarityType) => {
    switch (rarity) {
      case 'Common':
        return 'text-zinc-400';
      case 'Rare':
        return 'text-blue-400';
      case 'Epic':
        return 'text-sky-300';
      case 'Legendary':
        return 'text-white';
      case 'Cosmic':
        return 'text-blue-200';
    }
  };

  return (
    <div className="space-y-6" id="cosmic-artifacts-section">
      {/* Narrative Intro */}
      <div>
        <h2 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-450 animate-pulse" />
          Quantum Artifact Sarcophagus
        </h2>
        <p className="text-sm text-zinc-400 font-sans mt-1">
          Each artifact represents a localized tear in the galactic timeline. Stabilize their fields to read their logs.
        </p>
      </div>

      {/* Artifact Deck Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {artifacts.map((art) => {
          const currentSync = syncedState[art.id] || 'idle';
          return (
            <div
              key={art.id}
              className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${getRarityGlow(
                art.rarity
              )}`}
            >
              {/* Starry matrix backdrop inside card */}
              <div className="absolute inset-0 space-grid opacity-15 pointer-events-none" />

              {/* Rarity Label and Energy */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className={`text-[10px] font-mono tracking-wider ${getRarityBadgeText(art.rarity)} font-semibold uppercase`}>
                  {art.rarity} Relic
                </span>
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/60 px-2 py-0.5 rounded-full">
                  Energy: {art.energyLevel}
                </span>
              </div>

              {/* Visual Artifact Orb Graphic */}
              <div className="flex flex-col items-center justify-center py-6 mb-4 relative">
                <div className="absolute w-16 h-16 rounded-full filter blur-xl opacity-30 mix-blend-screen bg-blue-500 group-hover:opacity-40 transition-opacity" />
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-900/80 border border-zinc-800/80 shadow-md ${
                    art.unlocked ? 'animate-float ring-1 ring-white/10' : 'opacity-40 filter grayscale'
                  }`}
                >
                  {getArtifactIcon(art.imageId)}
                </div>
              </div>

              {/* Story summary */}
              <div className="space-y-1.5 relative z-10">
                <h3 className="text-base font-display font-medium text-white transition-colors group-hover:text-blue-400">
                  {art.unlocked ? art.name : 'Scrambled Particle Signal'}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 min-h-[3.3rem]">
                  {art.unlocked
                    ? art.story
                    : 'A dense cloud of chronal radiation is blocking local scanners. Unlock this spatial anomaly to analyze its physical composition.'}
                </p>
              </div>

              {/* Actions segment */}
              <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-between gap-2 relative z-10">
                {art.unlocked ? (
                  <>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Scanned: {art.unlockDate || '2026-05-30'}
                    </span>
                    <button
                      id={`btn-artifact-story-${art.id}`}
                      onClick={() => setActiveStoryArtifact(art)}
                      className="text-[11px] px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors font-sans"
                    >
                      Read Logs
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-mono">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Unstabilized Relic
                    </div>

                    <button
                      id={`btn-artifact-stabilize-${art.id}`}
                      onClick={() => triggerSync(art.id)}
                      disabled={currentSync !== 'idle' || points < 200}
                      className={`text-[11px] px-3 py-1 rounded-lg transition-all font-sans font-medium flex items-center gap-1 ${
                        currentSync === 'syncing'
                          ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                          : points >= 200
                          ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm glow-cyan'
                          : 'bg-zinc-950 text-zinc-600 border border-zinc-800/80 cursor-not-allowed'
                      }`}
                    >
                      {currentSync === 'syncing' ? (
                        <>
                          <span className="w-2.5 h-2.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin inline-block" />
                          Phasing...
                        </>
                      ) : (
                        <>
                          Resonate (200 SP)
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Artifact Lore Log Modal */}
      {activeStoryArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 relative overflow-hidden" id="artifact-lore-modal">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full filter blur-xl" />
            
            <button
              onClick={() => setActiveStoryArtifact(null)}
              className="absolute top-4 right-4 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center space-y-4 pt-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-900 border border-zinc-805 shadow-lg animate-float">
                {getArtifactIcon(activeStoryArtifact.imageId)}
              </div>

              <div>
                <span className={`text-[10px] font-mono tracking-wider ${getRarityBadgeText(activeStoryArtifact.rarity)} font-bold uppercase`}>
                  {activeStoryArtifact.rarity} Classification Item
                </span>
                <h3 className="text-xl font-display font-medium text-white mt-1.5">{activeStoryArtifact.name}</h3>
                <span className="text-[11px] font-mono text-zinc-500">Signal Resonance Energy: {activeStoryArtifact.energyLevel}</span>
              </div>

              <div className="w-full h-px bg-zinc-850" />

              <div className="text-sm text-zinc-300 leading-relaxed text-left space-y-3 font-sans">
                <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-1 first-letter:float-left">
                  {activeStoryArtifact.story}
                </p>
                <p className="text-xs text-zinc-400 italic bg-cosmic-black/60 p-3 rounded-xl border border-zinc-800/40">
                  Trans-space sensors suggest this item is related to ancient gravimetric engineers who mapped the space-time rift before the first galaxies collapsed. Keep it energized in your locker to harness potential future rifts.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveStoryArtifact(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-sans font-medium text-xs text-white transition-colors"
            >
              Close Ledger Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
