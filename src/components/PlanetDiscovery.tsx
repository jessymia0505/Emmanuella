import React, { useState } from 'react';
import { Planet, RarityType } from '../types';
import { Search, Compass, AlertCircle, Lock, Eye, CheckCircle2, Zap } from 'lucide-react';

interface PlanetDiscoveryProps {
  planets: Planet[];
  galaxyNames: Record<string, string>;
  points: number;
  onUnlockPlanet: (planetId: string) => void;
}

export const PlanetDiscovery: React.FC<PlanetDiscoveryProps> = ({
  planets,
  galaxyNames,
  points,
  onUnlockPlanet,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('All');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Discovered' | 'Locked'>('All');
  const [activePlanet, setActivePlanet] = useState<Planet | null>(null);

  const rarities: (RarityType | 'All')[] = ['All', 'Common', 'Rare', 'Epic', 'Legendary', 'Cosmic'];

  const filteredPlanets = planets.filter((planet) => {
    const matchesSearch =
      planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (planet.mysteryFact && planet.mysteryFact.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRarity = selectedRarity === 'All' || planet.rarity === selectedRarity;

    const matchesTab =
      selectedTab === 'All' ||
      (selectedTab === 'Discovered' && planet.unlocked) ||
      (selectedTab === 'Locked' && !planet.unlocked);

    return matchesSearch && matchesRarity && matchesTab;
  });

  const getPlanetGradient = (imageId: string) => {
    switch (imageId) {
      case 'vespera_purple':
        return 'from-blue-900 via-blue-700 to-slate-950';
      case 'pyri_burning':
        return 'from-blue-600 via-slate-800 to-black';
      case 'aethel_crystal':
        return 'from-sky-400 via-blue-600 to-indigo-900';
      case 'chronos_gold':
        return 'from-zinc-400 via-zinc-200 to-white';
      case 'xenon_glowing':
        return 'from-blue-400 via-blue-600 to-slate-900';
      case 'kalliope_cosmic':
        return 'from-blue-950 via-blue-800 to-black';
      case 'erebos_dark':
        return 'from-zinc-700 via-slate-800 to-black';
      default:
        return 'from-blue-900 to-slate-950';
    }
  };

  const getRarityBadgeColor = (rarity: RarityType) => {
    switch (rarity) {
      case 'Common':
        return 'bg-zinc-950/90 text-zinc-300 border-zinc-800';
      case 'Rare':
        return 'bg-blue-950/95 text-blue-300 border-blue-900';
      case 'Epic':
        return 'bg-indigo-950/95 text-sky-300 border-indigo-900';
      case 'Legendary':
        return 'bg-white/10 text-white border-white/20';
      case 'Cosmic':
        return 'bg-blue-600/20 text-blue-200 border-blue-400';
    }
  };

  return (
    <div className="space-y-6" id="planet-discovery-section">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-neon-cyan animate-spin-slow" />
            Planet Discovery Center
          </h2>
          <p className="text-sm text-zinc-400 font-sans mt-1">
            Analyze spatial readings, query alien gravity anomalies, and expand your celestial map.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 self-start sm:self-auto text-xs font-mono text-neon-cyan">
          <Zap className="w-3.5 h-3.5 fill-neon-cyan" />
          <span>Stellar Bank: {points} SP</span>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
          <input
            type="text"
            id="planet-search"
            placeholder="Search planets, mysteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel bg-cosmic-dark/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-sans"
          />
        </div>

        <div className="md:col-span-4 flex rounded-xl glass-panel p-1 text-xs">
          {(['All', 'Discovered', 'Locked'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-${tab.toLowerCase()}`}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-1.5 rounded-lg font-sans font-medium transition-all text-center ${
                selectedTab === tab
                  ? 'bg-neon-cyan/15 text-neon-cyan'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 flex items-center gap-2">
          <select
            id="rarity-filter"
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl glass-panel bg-cosmic-dark/90 text-xs text-zinc-300 focus:outline-none focus:border-neon-cyan/50 font-sans"
          >
            {rarities.map((r) => (
              <option key={r} value={r} className="bg-cosmic-purple text-white">
                {r === 'All' ? 'All Rarities' : `${r} Rarity`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Planet Cards */}
      {filteredPlanets.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <AlertCircle className="w-10 h-10 text-zinc-500" />
          <h3 className="text-lg font-display text-zinc-300">No celestial objects logged</h3>
          <p className="text-xs text-zinc-500 max-w-md">
            No items match your active coordinate parameters. Broaden your search query or reset filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlanets.map((planet) => (
            <div
              key={planet.id}
              id={`planet-card-${planet.id}`}
              className={`glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between glass-card-hover group border ${
                planet.unlocked ? 'border-zinc-800' : 'border-blue-900/30'
              }`}
            >
              {/* Orb visual preview container */}
              <div className="relative h-32 flex items-center justify-center mb-4">
                {/* Background stars sparkle effect */}
                <div className="absolute inset-0 space-grid opacity-25" />
                
                {/* Visual Orb */}
                <div
                  className={`w-20 h-20 celestial-orb bg-gradient-to-tr ${getPlanetGradient(
                    planet.imageId
                  )} ${planet.unlocked ? 'animate-float' : 'scale-90 opacity-60 filter blur-[1px]'}`}
                >
                  {!planet.unlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center rounded-full">
                      <Lock className="w-5 h-5 text-blue-450" />
                    </div>
                  )}
                </div>

                {/* Ambient glow behind orb */}
                <div
                  className={`absolute w-24 h-24 rounded-full filter blur-xl opacity-40 mix-blend-screen transition-all ${
                    planet.unlocked
                      ? planet.rarity === 'Cosmic' || planet.rarity === 'Legendary'
                        ? 'bg-blue-500'
                        : 'bg-blue-600'
                      : 'bg-transparent'
                  }`}
                />
              </div>

              {/* Rarity & Galaxy header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 capitalize">
                  {galaxyNames[planet.galaxyId] || 'Deep Void'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-medium border ${getRarityBadgeColor(planet.rarity)}`}>
                  {planet.rarity}
                </span>
              </div>

              {/* Identity & Stats */}
              <div className="space-y-1">
                <h3 className="text-base font-display font-medium text-white group-hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  {planet.unlocked ? planet.name : 'Unknown Singularity Signal'}
                  {planet.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 min-h-[2.5rem]">
                  {planet.unlocked
                    ? planet.description
                    : 'A cosmic signal has been intercepted at this coordinate sector, but is heavily encrypted.'}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-zinc-800/50 flex items-center justify-between gap-2">
                {planet.unlocked ? (
                  <>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Discovered: {planet.discoveryDate}
                    </span>
                    <button
                      id={`btn-view-${planet.id}`}
                      onClick={() => setActivePlanet(planet)}
                      className="px-2.5 py-1 text-[11px] font-sans rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Decks
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-mono text-blue-400 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      300 SP Required
                    </span>
                    <button
                      id={`btn-unlock-${planet.id}`}
                      onClick={() => onUnlockPlanet(planet.id)}
                      disabled={points < 300}
                      className={`px-3 py-1 text-[11px] font-sans rounded-lg transition-all flex items-center gap-1 ${
                        points >= 300
                          ? 'bg-blue-600 font-medium text-white hover:bg-blue-500 cursor-pointer shadow-sm glow-cyan'
                          : 'bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                      }`}
                    >
                      <Zap className="w-2.5 h-2.5" />
                      Decipher
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Planetary Details Modal overlay */}
      {activePlanet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 relative overflow-hidden" id="planet-detail-modal">
            {/* Ambient decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-cyan/20 to-transparent rounded-full filter blur-xl" />
            
            {/* Close button */}
            <button
              onClick={() => setActivePlanet(null)}
              className="absolute top-4 right-4 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
            >
              ✕
            </button>

            {/* Orb Section in Modal */}
            <div className="flex flex-col items-center text-center space-y-4 pt-4">
              <div className={`w-28 h-28 celestial-orb bg-gradient-to-tr ${getPlanetGradient(activePlanet.imageId)} animate-float`} />
              
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-medium border ${getRarityBadgeColor(activePlanet.rarity)}`}>
                  {activePlanet.rarity} Classification
                </span>
                <h3 className="text-2xl font-display font-medium text-white mt-2.5">{activePlanet.name}</h3>
                <p className="text-xs text-neon-cyan font-mono tracking-wider mt-1 uppercase">
                  {galaxyNames[activePlanet.galaxyId]} Sector Coordinates
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed max-w-md">
                {activePlanet.description}
              </p>
            </div>

            {/* Planet Stats */}
            <div className="grid grid-cols-3 gap-3 bg-cosmic-black/80 border border-zinc-800 rounded-2xl p-4 mt-6">
              <div className="text-center">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Planet Mass</span>
                <span className="text-xs font-mono font-medium text-zinc-300">{activePlanet.mass}</span>
              </div>
              <div className="text-center border-x border-zinc-800">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Temperature</span>
                <span className="text-xs font-mono font-medium text-zinc-300">{activePlanet.temperature}</span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Distance</span>
                <span className="text-xs font-mono font-medium text-zinc-300">{activePlanet.distance}</span>
              </div>
            </div>

            {/* Locked Secret Fact */}
            {activePlanet.mysteryFact && (
              <div className="mt-5 p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-2xl">
                <h4 className="text-xs font-display font-medium text-neon-cyan flex items-center gap-1.5 mb-1">
                  <Compass className="w-3.5 h-3.5 text-neon-cyan" />
                  Decrypted Transmission Log
                </h4>
                <p className="text-xs text-zinc-300 italic font-sans leading-relaxed">
                  {activePlanet.mysteryFact}
                </p>
              </div>
            )}

            <button
              onClick={() => setActivePlanet(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 font-sans font-medium text-xs text-white hover:opacity-95 transition-opacity"
            >
              Align Transcept Receivers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
