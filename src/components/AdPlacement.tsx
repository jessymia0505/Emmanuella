import React, { useState, useEffect } from 'react';
import { Sparkles, X, Star, Zap, ShieldCheck, Cpu, ArrowUpRight, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pre-defined list of premium sponsor ads designed to blend with the app aesthetic
const SPONSORS = [
  {
    id: 'warp',
    title: 'AstroWarp Drive Co.',
    description: 'Upgrade to Sub-Light Quantum Propulsion. Experience stable warp tunnels at 99.8% light-speed.',
    tagline: 'Warp Drive Upgrades',
    cta: 'Equip Warp Engines',
    icon: Zap,
    color: 'from-blue-600 to-sky-400',
    glowColor: 'rgba(59, 130, 246, 0.45)',
  },
  {
    id: 'fusion',
    title: 'Nova Energy Technologies',
    description: 'Stellar fusion batteries crafted to power deep space scanners and decrypt heavy mystery boxes in milliseconds.',
    tagline: 'Infinite Battery Core',
    cta: 'Recharge Reactor',
    icon: Cpu,
    color: 'from-sky-500 to-indigo-500',
    glowColor: 'rgba(56, 189, 248, 0.4)',
  },
  {
    id: 'shield',
    title: 'Aegis Containment Systems',
    description: 'Protect your discovered high-value artifacts from cosmic ray degradation and temporal chronometer loops.',
    tagline: 'Quantum Force Shielding',
    cta: 'Deploy Aegis Shields',
    icon: ShieldCheck,
    color: 'from-blue-500 to-blue-700',
    glowColor: 'rgba(37, 99, 235, 0.4)',
  }
];

interface AdPlacementProps {
  type: 'top-banner' | 'in-content' | 'sidebar' | 'footer' | 'floating-mobile';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ type, className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(false);
  const [sponsorIndex, setSponsorIndex] = useState(0);

  // Pick a random sponsor for this placement instance
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SPONSORS.length);
    setSponsorIndex(randomIndex);

    // Simulate ad network loading/calibration which prevents Cumulative Layout Shift (CLS)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (closed) return null;

  const sponsor = SPONSORS[sponsorIndex];
  const SponsorIcon = sponsor.icon;

  // Render Skeleton placeholder to prevent Cumulative Layout Shift
  if (loading) {
    const getSkeletonHeight = () => {
      switch (type) {
        case 'top-banner': return 'h-[90px]';
        case 'in-content': return 'h-[180px]';
        case 'sidebar': return 'h-[250px]';
        case 'footer': return 'h-[90px]';
        case 'floating-mobile': return 'h-[100px]';
      }
    };

    return (
      <div 
        className={`w-full ${getSkeletonHeight()} glass-panel rounded-2xl p-4 border border-zinc-900 bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between animate-pulse ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-24 bg-zinc-800 rounded" />
          <div className="h-2 w-12 bg-zinc-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-zinc-800 rounded" />
          <div className="h-3 w-1/2 bg-zinc-800 rounded" />
        </div>
        <div className="h-7 w-20 bg-zinc-900 rounded-lg self-end" />
      </div>
    );
  }

  // 1. TOP BANNER AD (Thin, high-profile horizontal banner below header)
  if (type === 'top-banner') {
    return (
      <div 
        id="top-banner-ad-placement"
        className={`w-full glass-panel rounded-2xl p-4 border border-blue-900/10 min-h-[90px] relative overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-950 to-blue-950/20 shadow-md ${className}`}
      >
        <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 opacity-5 pointer-events-none">
          <SponsorIcon className="w-24 h-24 text-blue-500" />
        </div>

        {/* Outer Laser Scanner Line representing ad initialization */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 h-full relative z-10 select-none">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center text-white flex-shrink-0 shadow`}>
              <SponsorIcon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">SPONSORED PRESET SIGNAL</span>
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 uppercase">
                  Ad
                </span>
              </div>
              <h4 className="text-sm font-display font-medium text-white">{sponsor.title}</h4>
              <p className="text-xs text-zinc-400 font-sans line-clamp-1 max-w-2xl mt-0.5 leading-relaxed">
                {sponsor.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button 
              onClick={() => window.open('#', '_blank')}
              className="px-4 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/20 text-[11px] font-mono text-blue-400 rounded-lg hover:shadow-[0_0_10px_rgba(59,130,246,0.15)] transition-all flex items-center gap-1 cursor-pointer"
            >
              📊 {sponsor.cta}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. IN-CONTENT AD (Adaptive layout ideal for listing grids, cards, logs)
  if (type === 'in-content') {
    return (
      <div 
        id="in-content-ad-placement"
        className={`w-full glass-panel rounded-3xl p-6 border border-zinc-900 bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between min-h-[180px] hover:border-blue-900/20 transition-all ${className}`}
      >
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.03] pointer-events-none">
          <SponsorIcon className="w-48 h-48 text-white" />
        </div>

        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
            <Megaphone className="w-3.5 h-3.5 text-zinc-600" />
            <span>Calibrated Ad Network</span>
          </div>
          <span className="text-[10px] font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/25">
            PROMOTED REQUISITION
          </span>
        </div>

        <div className="my-4 flex gap-4 items-start">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${sponsor.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg relative`}>
            <SponsorIcon className="w-6 h-6" />
            <div className="absolute inset-0 rounded-2xl filter blur-sm opacity-50 bg-gradient-to-tr" />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-display font-medium text-white flex items-center gap-2">
              {sponsor.title}
            </h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-1">
              {sponsor.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-900/60 mt-2">
          <span className="text-[10px] font-mono text-zinc-500">{sponsor.tagline}</span>
          <button 
            onClick={() => window.open('#', '_blank')}
            className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-sans font-medium text-xs hover:bg-blue-500 transition-all shadow shadow-blue-950/50 flex items-center gap-1 hover:scale-[1.02] cursor-pointer"
          >
            {sponsor.cta}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 3. SIDEBAR AD (Vertical card layout, tailored for sidebar placement on desktop)
  if (type === 'sidebar') {
    return (
      <div 
        id="sidebar-ad-placement"
        className={`hidden md:flex w-full glass-panel rounded-2xl p-4 border border-zinc-850 bg-gradient-to-b from-zinc-950 to-zinc-950/80 hover:border-blue-900/20 transition-all flex-col justify-between aspect-[1/1] min-h-[220px] shadow-lg relative overflow-hidden ${className}`}
      >
        <div className="absolute -right-4 -bottom-4 translate-x-2 translate-y-2 opacity-5 pointer-events-none">
          <SponsorIcon className="w-24 h-24 text-sky-400" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-zinc-500 tracking-wider">COMMAND HOST SPONSOR</span>
          <span className="text-[9px] font-mono font-bold text-sky-400 uppercase bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20">
            Ad
          </span>
        </div>

        <div className="text-center py-2 space-y-2">
          <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-400 flex items-center justify-center text-white shadow-md">
            <SponsorIcon className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h5 className="font-display font-medium text-white text-xs leading-snug">{sponsor.title}</h5>
            <p className="text-[10px] text-zinc-400 font-sans line-clamp-2 leading-relaxed">
              {sponsor.description}
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.open('#', '_blank')}
          className="w-full py-1.5 text-center bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg font-mono text-[9px] uppercase border border-zinc-800 hover:border-zinc-700 tracking-wide transition-all cursor-pointer"
        >
          {sponsor.cta}
        </button>
      </div>
    );
  }

  // 4. FOOTER AD (Slim horizontal banner placed immediately above footer or inside it)
  if (type === 'footer') {
    return (
      <div 
        id="footer-ad-placement"
        className={`w-full glass-panel rounded-2xl p-4 border border-zinc-900/60 bg-zinc-950/50 min-h-[90px] relative overflow-hidden max-w-7xl mx-auto ${className}`}
      >
        <div className="absolute left-0 bottom-0 -translate-x-5 translate-y-5 opacity-5 pointer-events-none">
          <SponsorIcon className="w-24 h-24 text-zinc-600" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full relative z-10 select-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
              <SponsorIcon className="w-4.5 h-4.5" />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Sponsored System Transmitter</span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase bg-zinc-900 px-1 py-0.2 rounded border border-zinc-805">
                  Ad
                </span>
              </div>
              <h4 className="text-xs font-display font-medium text-white">{sponsor.title}</h4>
            </div>
          </div>

          <p className="hidden md:block text-[11px] text-zinc-400 font-sans max-w-xl leading-relaxed text-left">
            {sponsor.description}
          </p>

          <button 
            onClick={() => window.open('#', '_blank')}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 text-[10px] font-sans font-medium text-zinc-300 transition-all flex items-center gap-1 cursor-pointer"
          >
            {sponsor.cta}
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </button>
        </div>
      </div>
    );
  }

  // 5. FLOATING MOBILE AD (Neat, clean closable card in the bottom corner of viewports on smaller screens)
  if (type === 'floating-mobile') {
    return (
      <AnimatePresence>
        <motion.div 
          id="floating-mobile-ad-placement"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.5 }}
          className={`fixed bottom-4 right-4 z-50 w-[280px] glass-panel rounded-2xl p-4 border border-blue-900/20 bg-zinc-950/95 shadow-2xl flex flex-col justify-between min-h-[140px] md:hidden ${className}`}
        >
          {/* Custom absolute close trigger */}
          <button 
            onClick={() => setClosed(true)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-white text-zinc-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="space-y-1.5 select-none pr-6">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">PRESET STATION AD</span>
              <span className="text-[8px] font-mono text-blue-400 bg-blue-500/10 px-1 py-0 rounded uppercase font-bold border border-blue-500/10">
                Ad
              </span>
            </div>
            <h5 className="font-display font-medium text-xs text-white flex items-center gap-1.5">
              <SponsorIcon className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              {sponsor.title}
            </h5>
            <p className="text-[10px] text-zinc-400 font-sans leading-relaxed line-clamp-2">
              {sponsor.description}
            </p>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-zinc-900 mt-2">
            <span className="text-[9px] font-mono text-zinc-500">{sponsor.tagline}</span>
            <button 
              onClick={() => window.open('#', '_blank')}
              className="px-2.5 py-1 text-[10px] font-sans font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-0.5 cursor-pointer"
            >
              Learn More
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
};
