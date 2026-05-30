import React, { useState, useEffect } from 'react';
import { Planet, Artifact } from '../types';
import { Gift, Lock, Timer, Zap, Sparkles, Star, ChevronRight, HelpCircle } from 'lucide-react';
import { COSMIC_MESSAGES } from '../data';

interface DailyMysteryBoxProps {
  planets: Planet[];
  artifacts: Artifact[];
  points: number;
  streak: number;
  lastMysteryClaim?: string;
  onClaimReward: (rewardPlanetId: string, rewardArtifactId: string, ptsEarned: number) => void;
}

export const DailyMysteryBox: React.FC<DailyMysteryBoxProps> = ({
  planets,
  artifacts,
  points,
  streak,
  lastMysteryClaim,
  onClaimReward,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isCooldownActive, setIsCooldownActive] = useState<boolean>(false);
  const [decryptionStage, setDecryptionStage] = useState<'idle' | 'calibrating' | 'decrypting' | 'synced' | 'unveiled'>('idle');
  const [decryptionProgress, setDecryptionProgress] = useState<number>(0);
  const [simulationPrompt, setSimulationPrompt] = useState<string>('Initiating warp sync');
  const [claimedReward, setClaimedReward] = useState<{
    planet: Planet;
    artifact: Artifact;
    message: string;
    points: number;
  } | null>(null);

  // Calculate real 24-hour countdown based on lastMysteryClaim ISO string
  useEffect(() => {
    const calculateCountdown = () => {
      if (!lastMysteryClaim) {
        setTimeRemaining('');
        setIsCooldownActive(false);
        return;
      }

      const lastClaimTime = new Date(lastMysteryClaim).getTime();
      const nextClaimTime = lastClaimTime + 24 * 60 * 60 * 1000; // 24 Hours
      const now = new Date().getTime();
      const difference = nextClaimTime - now;

      if (difference <= 0) {
        setTimeRemaining('');
        setIsCooldownActive(false);
      } else {
        setIsCooldownActive(true);
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [lastMysteryClaim]);

  const triggerDecryption = () => {
    if (isCooldownActive) return;

    setDecryptionStage('calibrating');
    setDecryptionProgress(0);

    const stages = [
      { text: 'Syncing Higgs Field Generators...', duration: 600 },
      { text: 'Calibrating Gravitational Lens...', duration: 800 },
      { text: 'Decrypting Star Coordinates...', duration: 900 },
      { text: 'Unsealing Deep Void Vessel...', duration: 700 },
    ];

    let currentIdx = 0;
    const runSequence = () => {
      if (currentIdx < stages.length) {
        setSimulationPrompt(stages[currentIdx].text);
        setDecryptionProgress(((currentIdx + 1) / stages.length) * 100);
        setTimeout(() => {
          currentIdx++;
          runSequence();
        }, stages[currentIdx].duration);
      } else {
        // Safe Reward Generation
        // Choose a random Planet (favor locked ones first to make it super exciting!)
        const lockedPlanets = planets.filter((p) => !p.unlocked);
        const sourcePlanets = lockedPlanets.length > 0 ? lockedPlanets : planets;
        const randomPlanet = sourcePlanets[Math.floor(Math.random() * sourcePlanets.length)];

        // Choose a random Artifact (favor locked ones first!)
        const lockedArtifacts = artifacts.filter((a) => !a.unlocked);
        const sourceArtifacts = lockedArtifacts.length > 0 ? lockedArtifacts : artifacts;
        const randomArtifact = sourceArtifacts[Math.floor(Math.random() * sourceArtifacts.length)];

        // Choose a beautiful random message
        const randomMsg = COSMIC_MESSAGES[Math.floor(Math.random() * COSMIC_MESSAGES.length)];
        const spReward = 350;

        setClaimedReward({
          planet: randomPlanet,
          artifact: randomArtifact,
          message: randomMsg,
          points: spReward,
        });

        setDecryptionStage('unveiled');
        // Call global save callback
        onClaimReward(randomPlanet.id, randomArtifact.id, spReward);
      }
    };

    setTimeout(runSequence, 400);
  };

  const forceSandboxReset = () => {
    // Sandbox helper to clear countdown so users of the applet can test multiple times easily
    localStorage.removeItem('cosmic_vault_last_claim');
    window.location.reload();
  };

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden space-y-6" id="mystery-box-section">
      {/* Decorative ambient rays */}
      <div className="absolute -right-24 -top-24 w-60 h-60 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full filter blur-2xl" />
      <div className="absolute -left-24 -bottom-24 w-60 h-60 bg-gradient-to-bl from-blue-400/15 to-transparent rounded-full filter blur-2xl animate-pulse" />

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Box/Chamber segment */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-cosmic-black/60 rounded-2xl border border-zinc-800/40 relative">
          <div className="absolute inset-0 space-grid opacity-10" />
          
          {/* Animated floating reactor chest */}
          <div className="relative animate-float py-4">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${isCooldownActive ? 'from-zinc-800 to-zinc-950 border-zinc-700' : 'from-blue-600 via-blue-500 to-sky-305 glow-cyan'} p-[2px] shadow-lg flex items-center justify-center relative`}>
              <div className="absolute inset-x-0 w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center">
                {isCooldownActive ? (
                  <Lock className="w-8 h-8 text-zinc-500" />
                ) : (
                  <Gift className="w-8 h-8 text-blue-400" />
                )}
              </div>
            </div>
            
            {/* Pulsing ring particles */}
            {!isCooldownActive && (
              <div className="absolute -inset-2 rounded-2xl bg-blue-500/10 border border-blue-500/30 animate-pulse-ring pointer-events-none" />
            )}
          </div>

          <div className="mt-4 space-y-1">
            <h4 className="text-base font-display font-medium text-white">Daily Mystery Vault</h4>
            <p className="text-xs text-zinc-500">Decrypts a random celestial planet & raw material node every 24h.</p>
          </div>
        </div>

        {/* Info & Countdown Control Panels */}
        <div className="lg:col-span-8 space-y-5">
          {decryptionStage === 'idle' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] uppercase font-mono tracking-wider border border-blue-500/20">
                    Temporal Station
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">Streak: {streak} Days Gold</span>
                </div>
                <h3 className="text-xl font-display font-medium text-white">
                  Unlock the Universe's Daily Artifact Cargo
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  By syncing with active solar satellites, you can download coordinates for the next locked planet in your sector, stabilize a random quantum artifact, and capture deep space thought logs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {isCooldownActive ? (
                  <div className="flex items-center gap-5 px-5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-blue-400 animate-spin-slow" />
                      <span className="text-xs font-mono text-zinc-400">Chronometer Lock:</span>
                    </div>
                    <span className="text-base font-mono font-bold text-blue-400 glow-text-cyan">
                      {timeRemaining}
                    </span>
                  </div>
                ) : (
                  <button
                    id="btn-claim-mystery"
                    onClick={triggerDecryption}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-450 text-white font-sans font-medium text-xs hover:opacity-95 transition-opacity flex items-center gap-2 glow-cyan ring-1 ring-white/10"
                  >
                    <Gift className="w-4 h-4" />
                    Sync Gravimetric Vault
                  </button>
                )}

                <button
                  id="btn-bypass-cooldown"
                  onClick={forceSandboxReset}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-xs text-zinc-400 hover:text-white transition-colors border border-zinc-800 flex items-center gap-1.5 font-sans"
                >
                  <Timer className="w-3.5 h-3.5" />
                  Bypass Lock (Sandbox Reset)
                </button>
              </div>
            </div>
          )}

          {/* Interactive loading/decrypting stage animation */}
          {(decryptionStage === 'calibrating' || decryptionStage === 'decrypting' || decryptionStage === 'synced') && (
            <div className="space-y-4 py-4" id="mystery-decrypting-state">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5 animate-pulse">
                  <Star className="w-3.5 h-3.5 fill-blue-400 animate-spin-slow" />
                  QUANTUM RECEIVER ACTIVE
                </span>
                <p className="text-sm font-mono text-zinc-300 h-6">{simulationPrompt}</p>
              </div>

              {/* Holographic progress bar */}
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300"
                  style={{ width: `${decryptionProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>Signal Strength: 98.4%</span>
                <span>Anomalies Decoded: {Math.floor(decryptionProgress / 25)} / 4</span>
              </div>
            </div>
          )}

          {/* Loot Reward Display Panel after decrypted successfully */}
          {decryptionStage === 'unveiled' && claimedReward && (
            <div className="space-y-4 py-2" id="mystery-unveiled-rewards">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-display font-medium text-white">Quantum Vault Decrypted!</span>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  +{claimedReward.points} SP Stellar Reward
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Discovered Planet Card preview */}
                <div className="bg-cosmic-black/90 rounded-2xl p-4 border border-zinc-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-blue-900 celestial-orb flex-shrink-0 animate-float" />
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Unlocked Planet</span>
                    <h4 className="text-sm font-display font-medium text-white truncate">{claimedReward.planet.name}</h4>
                    <span className="text-[10px] text-blue-400 font-mono">{claimedReward.planet.rarity} Class</span>
                  </div>
                </div>

                {/* Collected Artifact Card preview */}
                <div className="bg-cosmic-black/90 rounded-2xl p-4 border border-zinc-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 text-sky-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Salvaged Relic</span>
                    <h4 className="text-sm font-display font-medium text-white truncate">{claimedReward.artifact.name}</h4>
                    <span className="text-[10px] text-blue-400 font-mono">{claimedReward.artifact.rarity} Relic</span>
                  </div>
                </div>
              </div>

              {/* Secret thoughts text block */}
              <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl">
                <span className="text-[9px] font-mono text-blue-400 uppercase block mb-1">Secret Cosmic Message:</span>
                <p className="text-xs text-zinc-300 italic font-sans leading-relaxed">
                  {claimedReward.message}
                </p>
              </div>

              <button
                id="btn-close-reward"
                onClick={() => {
                  setDecryptionStage('idle');
                  setClaimedReward(null);
                }}
                className="w-full py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-100 rounded-xl text-xs font-sans font-medium transition-colors flex items-center justify-center gap-1"
              >
                Assemble Cargo Decks
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
