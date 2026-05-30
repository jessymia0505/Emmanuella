import React from 'react';
import { LeaderboardUser, Planet } from '../types';
import { Trophy, Medal, Star, Target, Compass, Globe, Sparkles } from 'lucide-react';

interface LeaderboardProps {
  leaderboardUsers: LeaderboardUser[];
  planetList: Planet[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardUsers, planetList }) => {
  // Sort leaderboardUsers by point rank
  const sortedExplorers = [...leaderboardUsers].sort((a, b) => b.points - a.points);
  
  // Calculate top discoveries: rarest planets that are currently unlocked
  const unlockedPlanets = planetList.filter((p) => p.unlocked);
  const cosmicAndLegendary = unlockedPlanets.filter((p) => p.rarity === 'Cosmic' || p.rarity === 'Legendary');
  const highlightedDiscoveries = cosmicAndLegendary.length > 0 ? cosmicAndLegendary : unlockedPlanets;

  // Most planets unlocked stats helper
  const maxPlanetsUser = sortedExplorers.reduce((prev, current) => {
    return (prev.planetsUnlockedCount > current.planetsUnlockedCount) ? prev : current;
  });

  return (
    <div className="space-y-6" id="leaderboard-section">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400 animate-pulse" />
          Galactic Standings Array
        </h2>
        <p className="text-sm text-zinc-400 font-sans mt-1">
          Monitor competitive exploration logs. Synchronized directly with active deep space receiver nodes.
        </p>
      </div>

      {/* Stats Cards Row (Bento Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-4 border border-zinc-900 bg-zinc-950/50 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10">
            <Trophy className="w-20 h-20 text-blue-500" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-550/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-500">Master Pioneer</span>
            <h4 className="text-sm font-display font-medium text-white">{sortedExplorers[0]?.name || 'N/A'}</h4>
            <span className="text-[11px] font-mono text-zinc-400">{sortedExplorers[0]?.points || 0} SP Total</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-zinc-900 bg-zinc-950/50 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10">
            <Globe className="w-20 h-20 text-blue-500" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Globe className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-500">Most Planets Logged</span>
            <h4 className="text-sm font-display font-medium text-white">{maxPlanetsUser?.name || 'N/A'}</h4>
            <span className="text-[11px] font-mono text-blue-400 font-bold">
              {maxPlanetsUser?.planetsUnlockedCount || 0} Planets
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-zinc-900 bg-zinc-950/50 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10">
            <Sparkles className="w-20 h-20 text-blue-400" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-500">Rarest Planet Discovered</span>
            <h4 className="text-sm font-display font-medium text-white">
              {highlightedDiscoveries[0]?.name || 'Unknown Log'}
            </h4>
            <span className="text-[10px] uppercase font-mono text-blue-450 font-medium">
              {highlightedDiscoveries[0]?.rarity || 'Common'} Class Anomaly
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Explorer Standings List (Col span 8) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-5 border border-zinc-800 space-y-4">
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-450" />
            Galactic Explorer Standings
          </h3>

          <div className="divide-y divide-zinc-905 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase border-b border-zinc-900">
                  <th className="pb-3 text-center w-12">Rank</th>
                  <th className="pb-3">Cadet Name</th>
                  <th className="pb-3 text-center">Planets</th>
                  <th className="pb-3 text-center">Relics</th>
                  <th className="pb-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 font-sans text-xs">
                {sortedExplorers.map((explorer) => {
                  const isCurrentUser = explorer.id === 'usr_explorer';
                  
                  return (
                    <tr
                      key={explorer.id}
                      className={`group transition-colors ${
                        isCurrentUser
                          ? 'bg-blue-600/5 border-y border-blue-500/15 text-white'
                          : 'text-zinc-300 hover:bg-zinc-950/40'
                      }`}
                    >
                      {/* Rank Indicator */}
                      <td className="py-3 text-center font-mono font-bold font-display text-sm">
                        {explorer.rank === 1 ? (
                          <span className="inline-block text-yellow-400 font-mono" title="First Place Gold">
                            ★ 1
                          </span>
                        ) : explorer.rank === 2 ? (
                          <span className="inline-block text-zinc-300 font-mono" title="Second Place Silver">
                            ☆ 2
                          </span>
                        ) : explorer.rank === 3 ? (
                          <span className="inline-block text-amber-600 font-mono" title="Third Place Bronze">
                            🥉 3
                          </span>
                        ) : (
                          explorer.rank
                        )}
                      </td>

                      {/* Avatar & Name */}
                      <td className="py-3 font-sans">
                        <div className="flex items-center gap-2.5">
                          <img
                            referrerPolicy="no-referrer"
                            src={explorer.avatar}
                            alt={explorer.name}
                            className="w-7 h-7 rounded-full border border-zinc-800 flex-shrink-0"
                          />
                          <div>
                            <span className="font-medium text-white">
                              {explorer.name}
                            </span>
                            <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                              {explorer.badge}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Planets count */}
                      <td className="py-3 text-center font-mono font-medium text-zinc-300">
                        {explorer.planetsUnlockedCount}
                      </td>

                      {/* Artifacts count */}
                      <td className="py-3 text-center font-mono font-medium text-zinc-300">
                        {explorer.artifactsCollectedCount}
                      </td>

                      {/* Point totals */}
                      <td className="py-3 text-right font-mono text-blue-400 font-bold pr-1">
                        {explorer.points} SP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* server discoveries (Col span 4) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-5 border border-zinc-800 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-display font-medium text-white flex items-center gap-1.5">
              <Compass className="w-4.5 h-4.5 text-blue-450 animate-spin-slow" />
              Rarest Logs Registered
            </h3>
            
            <div className="space-y-3">
              {highlightedDiscoveries.slice(0, 3).map((disc) => (
                <div key={disc.id} className="p-3 rounded-xl bg-cosmic-black/85 border border-zinc-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-blue-950 celestial-orb flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-display font-medium text-white truncate">{disc.name}</h4>
                    <span className="text-[10px] font-mono text-blue-400 capitalize bg-blue-950/20 px-1.5 py-0.5 rounded">
                      {disc.rarity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-[11px] text-zinc-400 font-sans leading-relaxed mt-4">
            Standings and server metadata synchronize with localized solar broadcast rays every 3 seconds. Earn Stellar Points by deciphering signals and claim daily chest codes.
          </div>
        </div>
      </div>
    </div>
  );
};
