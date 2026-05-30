import React from 'react';
import { Home, Compass, Sparkles, Gift, Orbit, BookOpen, Trophy, ShieldClose, Sparkle, Eye, Star } from 'lucide-react';
import { AdPlacement } from './AdPlacement';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  planetsUnlockedCount: number;
  totalPlanetsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
  planetsUnlockedCount,
  totalPlanetsCount,
}) => {
  const menuItems = [
    { id: 'home', label: 'Main Command', icon: Home, color: 'text-zinc-400' },
    { id: 'planets', label: 'Planet Discovery', icon: Compass, color: 'text-blue-400' },
    { id: 'artifacts', label: 'Cosmic Artifacts', icon: Sparkles, color: 'text-sky-400' },
    { id: 'mystery', label: 'Mystery Chamber', icon: Gift, color: 'text-sky-300' },
    { id: 'galaxy', label: 'Galaxy Astro-Map', icon: Orbit, color: 'text-blue-500' },
    { id: 'journal', label: 'Cadet Logbook', icon: BookOpen, color: 'text-zinc-300' },
    { id: 'leaderboard', label: 'Pioneer Standings', icon: Trophy, color: 'text-white' },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <>
      {/* Mobile Drawer Backing Mask */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 glass-panel border-r border-white/10 flex flex-col justify-between p-5 transition-transform duration-300 md:translate-x-0 md:static md:h-[calc(100vh-64px)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="app-sidebar"
      >
        <div className="space-y-6">
          {/* Header area in Mobile Sidebar */}
          <div className="flex items-center justify-between md:hidden border-b border-zinc-850 pb-4">
            <div className="flex items-center gap-2">
              <Sparkl className="w-5 h-5 text-neon-cyan" />
              <span className="text-sm font-display font-bold text-white tracking-wider">NAV MATRIX</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  id={`sidebar-item-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium transition-all ${
                    isSelected
                      ? 'bg-neon-cyan/15 text-white border border-neon-cyan/20 glow-cyan'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? item.color : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global progress meter at bottom */}
        <div className="pt-4 border-t border-zinc-850/60 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>Systems Decrypted</span>
            <span>{Math.round((planetsUnlockedCount / totalPlanetsCount) * 100)}%</span>
          </div>

          <div className="flex items-center justify-between text-xs text-white">
            <span className="font-sans">Planets Map Progress</span>
            <span className="font-mono font-medium">{planetsUnlockedCount} / {totalPlanetsCount}</span>
          </div>

          {/* Micro progress indicator bar */}
          <div className="w-full bg-zinc-950/65 h-1.5 rounded-full overflow-hidden border border-zinc-900">
            <div
              className="bg-gradient-to-r from-neon-cyan to-neon-magenta h-full transition-all duration-300"
              style={{ width: `${(planetsUnlockedCount / totalPlanetsCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Ad monetization sidebar placement (desktop-only) */}
        <div className="pt-4 border-t border-zinc-850/60 hidden md:block">
          <AdPlacement type="sidebar" />
        </div>

      </aside>
    </>
  );
};

// Help fix potential import typos by supplying both mock aliases
const Sparkl = Sparkles;
