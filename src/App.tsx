/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Compass, 
  Trophy, 
  BookOpen, 
  Orbit, 
  Gift, 
  Zap, 
  Globe, 
  Heart, 
  Star, 
  AlertCircle,
  Eye,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PlanetDiscovery } from './components/PlanetDiscovery';
import { CosmicArtifacts } from './components/CosmicArtifacts';
import { DailyMysteryBox } from './components/DailyMysteryBox';
import { GalaxyMap } from './components/GalaxyMap';
import { CosmicJournal } from './components/CosmicJournal';
import { Leaderboard } from './components/Leaderboard';

import { 
  Planet, 
  Artifact, 
  Galaxy, 
  JournalEntry, 
  LeaderboardUser, 
  NotificationItem, 
  UserProfile 
} from './types';

import { 
  INITIAL_USER, 
  GALAXIES, 
  PLANETS, 
  ARTIFACTS, 
  NOTIFICATIONS, 
  LEADERBOARD 
} from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ id: string; title: string; desc: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Initialize all states from localStorage or data defaults
  useEffect(() => {
    const cachedUser = localStorage.getItem('cosmic_vault_user');
    const cachedPlanets = localStorage.getItem('cosmic_vault_planets');
    const cachedArtifacts = localStorage.getItem('cosmic_vault_artifacts');
    const cachedGalaxies = localStorage.getItem('cosmic_vault_galaxies');
    const cachedNotifs = localStorage.getItem('cosmic_vault_notifications');
    const cachedJournal = localStorage.getItem('cosmic_vault_journal');
    const cachedLeaderboard = localStorage.getItem('cosmic_vault_leaderboard');

    if (cachedUser) {
      setUserProfile(JSON.parse(cachedUser));
    } else {
      setUserProfile(INITIAL_USER);
      localStorage.setItem('cosmic_vault_user', JSON.stringify(INITIAL_USER));
    }

    if (cachedPlanets) {
      setPlanets(JSON.parse(cachedPlanets));
    } else {
      setPlanets(PLANETS);
      localStorage.setItem('cosmic_vault_planets', JSON.stringify(PLANETS));
    }

    if (cachedArtifacts) {
      setArtifacts(JSON.parse(cachedArtifacts));
    } else {
      setArtifacts(ARTIFACTS);
      localStorage.setItem('cosmic_vault_artifacts', JSON.stringify(ARTIFACTS));
    }

    if (cachedGalaxies) {
      setGalaxies(JSON.parse(cachedGalaxies));
    } else {
      setGalaxies(GALAXIES);
      localStorage.setItem('cosmic_vault_galaxies', JSON.stringify(GALAXIES));
    }

    if (cachedNotifs) {
      setNotifications(JSON.parse(cachedNotifs));
    } else {
      setNotifications(NOTIFICATIONS);
      localStorage.setItem('cosmic_vault_notifications', JSON.stringify(NOTIFICATIONS));
    }

    if (cachedLeaderboard) {
      setLeaderboard(JSON.parse(cachedLeaderboard));
    } else {
      setLeaderboard(LEADERBOARD);
      localStorage.setItem('cosmic_vault_leaderboard', JSON.stringify(LEADERBOARD));
    }

    // Default pre-populated journal entries logging current default discoveries
    if (cachedJournal) {
      setJournalEntries(JSON.parse(cachedJournal));
    } else {
      const initialJournal: JournalEntry[] = [
        {
          id: 'jou_1',
          title: 'Decoded Signal of Vespera Prime',
          type: 'planet',
          name: 'Vespera Prime',
          rarity: 'Common',
          date: '2026-05-25',
          notes: 'Atmospheric scan reports nitrogen clouds reflecting purple auroras of glowing neon isotopes.'
        },
        {
          id: 'jou_2',
          title: 'Salvaged ancient Quantum Crystal',
          type: 'artifact',
          name: 'Quantum Crystal',
          rarity: 'Cosmic',
          date: '2026-05-26',
          notes: 'Found hovering inside the gravity field of Andromeda core anomaly. Resonates at roughly 1,200 QK cycles.'
        },
        {
          id: 'jou_3',
          title: 'Acquired Cosmic License',
          type: 'milestone',
          name: 'Andromeda Nexus Sector',
          date: '2026-05-24',
          notes: 'Astral Command granted permission to warp across custom spiral core avenues safely.'
        }
      ];
      setJournalEntries(initialJournal);
      localStorage.setItem('cosmic_vault_journal', JSON.stringify(initialJournal));
    }
  }, []);

  // Sync callbacks
  const saveUserState = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('cosmic_vault_user', JSON.stringify(newProfile));
  };

  const savePlanetsState = (newPlanets: Planet[]) => {
    setPlanets(newPlanets);
    localStorage.setItem('cosmic_vault_planets', JSON.stringify(newPlanets));
  };

  const saveArtifactsState = (newArtifacts: Artifact[]) => {
    setArtifacts(newArtifacts);
    localStorage.setItem('cosmic_vault_artifacts', JSON.stringify(newArtifacts));
  };

  const saveGalaxiesState = (newGalaxies: Galaxy[]) => {
    setGalaxies(newGalaxies);
    localStorage.setItem('cosmic_vault_galaxies', JSON.stringify(newGalaxies));
  };

  const saveNotificationsState = (newNotifs: NotificationItem[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('cosmic_vault_notifications', JSON.stringify(newNotifs));
  };

  const saveJournalState = (newJournal: JournalEntry[]) => {
    setJournalEntries(newJournal);
    localStorage.setItem('cosmic_vault_journal', JSON.stringify(newJournal));
  };

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, title, desc, type });
    setTimeout(() => {
      setToast(prev => prev?.id === id ? null : prev);
    }, 4000);
  };

  // Callback: spend points to decrypt a planet
  const handleUnlockPlanet = (id: string) => {
    if (!userProfile) return;
    if (userProfile.points < 300) {
      showToast('Insufficient Stellar Points', 'You need 300 SP to decipher this planetary signature.', 'error');
      return;
    }

    const planetToUnlock = planets.find(p => p.id === id);
    if (!planetToUnlock) return;

    // Deduct points
    const updatedUser = {
      ...userProfile,
      points: userProfile.points - 300,
    };
    saveUserState(updatedUser);

    // Set planet unlocked
    const updatedPlanets = planets.map(p => {
      if (p.id === id) {
        return {
          ...p,
          unlocked: true,
          discoveryDate: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    });
    savePlanetsState(updatedPlanets);

    // Create journal entry
    const newJournal: JournalEntry = {
      id: `jou_unlock_${Date.now()}`,
      title: `Decrypted Coordinate Signal: ${planetToUnlock.name}`,
      type: 'planet',
      name: planetToUnlock.name,
      rarity: planetToUnlock.rarity,
      date: new Date().toISOString().split('T')[0],
      notes: `Unwrapped standard gravimetric signals at coordinate rifts. Mass: ${planetToUnlock.mass}. Dist: ${planetToUnlock.distance}.`
    };
    saveJournalState([newJournal, ...journalEntries]);

    // Create system notification
    const newNotification: NotificationItem = {
      id: `not_p_${Date.now()}`,
      title: `Planet Discovered: ${planetToUnlock.name}`,
      description: `Warp scanners established solid orbit nodes. Review detailed metrics in the Journal tab.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'discovery'
    };
    saveNotificationsState([newNotification, ...notifications]);

    // Synchronize leaderboard user performance score
    updateLeaderboardValue(updatedUser.points, updatedPlanets.filter(p => p.unlocked).length, artifacts.filter(a => a.unlocked).length);

    showToast(
      'Signal Decrypted!',
      `Stellar coordinates secured for "${planetToUnlock.name}". (+350 XP Recorded)`,
      'success'
    );
  };

  // Callback: spend points / resonate to salvage an artifact
  const handleUnlockArtifact = (id: string) => {
    if (!userProfile) return;
    if (userProfile.points < 200) {
      showToast('Insufficient Stellar Points', 'You need 200 SP to resonate this relic anomaly.', 'error');
      return;
    }

    const artifactToUnlock = artifacts.find(a => a.id === id);
    if (!artifactToUnlock) return;

    // Deduct points
    const updatedUser = {
      ...userProfile,
      points: userProfile.points - 200,
    };
    saveUserState(updatedUser);

    // Resonate artifact unlocked
    const updatedArtifacts = artifacts.map(a => {
      if (a.id === id) {
        return {
          ...a,
          unlocked: true,
          unlockDate: new Date().toISOString().split('T')[0]
        };
      }
      return a;
    });
    saveArtifactsState(updatedArtifacts);

    // Create journal entry
    const newJournal: JournalEntry = {
      id: `jou_art_${Date.now()}`,
      title: `Relic Stabilized: ${artifactToUnlock.name}`,
      type: 'artifact',
      name: artifactToUnlock.name,
      rarity: artifactToUnlock.rarity,
      date: new Date().toISOString().split('T')[0],
      notes: `Secured quantum field containment of localized debris relic. Sourced energy level at ${artifactToUnlock.energyLevel}.`
    };
    saveJournalState([newJournal, ...journalEntries]);

    // Create system notification
    const newNotification: NotificationItem = {
      id: `not_a_${Date.now()}`,
      title: `Artifact Logged: ${artifactToUnlock.name}`,
      description: `Containment cells locked down. The artifact's story is now available in your personal Ledger.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'artifact'
    };
    saveNotificationsState([newNotification, ...notifications]);

    // Update Leaderboard
    updateLeaderboardValue(updatedUser.points, planets.filter(p => p.unlocked).length, updatedArtifacts.filter(a => a.unlocked).length);

    showToast(
      'Artifact Secured!',
      `Containment unit successfully stabilized "${artifactToUnlock.name}".`,
      'success'
    );
  };

  // Callback: claim daily chest mystery rewards
  const handleClaimMysteryRewards = (rewardPlanetId: string, rewardArtifactId: string, ptsEarned: number) => {
    if (!userProfile) return;

    // Update user profile streak and point totals
    const nextClaimTimeStr = new Date().toISOString();
    const isNewDay = !userProfile.lastMysteryClaim || 
                     (new Date().getTime() - new Date(userProfile.lastMysteryClaim).getTime() > 16 * 60 * 60 * 1000);
    
    const nextStreak = isNewDay ? userProfile.streak + 1 : userProfile.streak;
    const nextPoints = userProfile.points + ptsEarned;
    const nextLvl = Math.floor(nextPoints / 500) + 1; // Auto level up threshold

    const updatedUser: UserProfile = {
      ...userProfile,
      points: nextPoints,
      streak: nextStreak,
      level: Math.max(userProfile.level, nextLvl),
      badge: nextLvl >= 6 ? 'Cosmic Vanguard' : nextLvl >= 4 ? 'Nebula Veteran' : userProfile.badge,
      lastMysteryClaim: nextClaimTimeStr
    };
    saveUserState(updatedUser);

    // Unlock planet
    const targetPlanet = planets.find(p => p.id === rewardPlanetId);
    if (targetPlanet) {
      const updatedPlanets = planets.map(p => 
        p.id === rewardPlanetId ? { ...p, unlocked: true, discoveryDate: new Date().toISOString().split('T')[0] } : p
      );
      savePlanetsState(updatedPlanets);
      
      // Log planet discovery
      const planetJournal: JournalEntry = {
        id: `jou_myst_p_${Date.now()}`,
        title: `Decoded Mystery Planet: ${targetPlanet.name}`,
        type: 'planet',
        name: targetPlanet.name,
        rarity: targetPlanet.rarity,
        date: new Date().toISOString().split('T')[0],
        notes: `Interstellar cargo chest decryption revealed long-range coordinate signals mapping back to ${targetPlanet.name}.`
      };
      
      // Unlock artifact
      const targetArtifact = artifacts.find(a => a.id === rewardArtifactId);
      if (targetArtifact) {
        const updatedArtifacts = artifacts.map(a => 
          a.id === rewardArtifactId ? { ...a, unlocked: true, unlockDate: new Date().toISOString().split('T')[0] } : a
        );
        saveArtifactsState(updatedArtifacts);

        // Log artifact discovery
        const artifactJournal: JournalEntry = {
          id: `jou_myst_a_${Date.now() + 1}`,
          title: `Salvaged Mystery Relic: ${targetArtifact.name}`,
          type: 'artifact',
          name: targetArtifact.name,
          rarity: targetArtifact.rarity,
          date: new Date().toISOString().split('T')[0],
          notes: `Extracted crystallized fuel segments containing highly complex ${targetArtifact.name} coordinates.`
        };

        saveJournalState([planetJournal, artifactJournal, ...journalEntries]);
        updateLeaderboardValue(nextPoints, updatedPlanets.filter(p => p.unlocked).length, updatedArtifacts.filter(a => a.unlocked).length);
      } else {
        saveJournalState([planetJournal, ...journalEntries]);
        updateLeaderboardValue(nextPoints, updatedPlanets.filter(p => p.unlocked).length, artifacts.filter(a => a.unlocked).length);
      }
    }

    // Post notification warning
    const newNotification: NotificationItem = {
      id: `not_myst_${Date.now()}`,
      title: `Mystery Anomaly Successfully Cleared`,
      description: `Obtained bonus stardust container containing +350 SP, new planets, and localized gravity indicators.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'system'
    };
    saveNotificationsState([newNotification, ...notifications]);

    showToast(
      'Mystery Unveiled!',
      `Obtained new celestial logs. Expansion progress updated.`,
      'success'
    );
  };

  // Callback: buy clearance licenses for galaxies
  const handleUnlockGalaxyDef = (galaxyId: string) => {
    if (!userProfile) return;
    if (userProfile.points < 500) {
      showToast('License Purchase Stopped', 'You need 500 SP to acquire clearance for this cluster quadrant.', 'error');
      return;
    }

    const galToUnlock = galaxies.find(g => g.id === galaxyId);
    if (!galToUnlock) return;

    const nextPoints = userProfile.points - 500;
    const updatedUser = {
      ...userProfile,
      points: nextPoints
    };
    saveUserState(updatedUser);

    const updatedGalaxies = galaxies.map(g => 
      g.id === galaxyId ? { ...g, unlocked: true } : g
    );
    saveGalaxiesState(updatedGalaxies);

    // Create journal & milestone entry
    const newJournal: JournalEntry = {
      id: `jou_gal_${Date.now()}`,
      title: `Acquired Clearance: ${galToUnlock.name}`,
      type: 'milestone',
      name: galToUnlock.name,
      date: new Date().toISOString().split('T')[0],
      notes: `Successfully initialized localized hyper-lane channels. Warping receivers is now safe across this sector.`
    };
    saveJournalState([newJournal, ...journalEntries]);

    // Create Notification
    const newNotification: NotificationItem = {
      id: `not_gal_${Date.now()}`,
      title: `Quadrant Access Authorized: ${galToUnlock.name}`,
      description: `Warp speed signals calibrated. Star-gates are officially active inside Astrocartography Map grid.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'system'
    };
    saveNotificationsState([newNotification, ...notifications]);

    // Update Leaderboard
    updateLeaderboardValue(nextPoints, planets.filter(p => p.unlocked).length, artifacts.filter(a => a.unlocked).length);

    showToast(
      'Clearance Authorized!',
      `Access logs registered of quadrant: "${galToUnlock.name}". Sector unlocked.`,
      'success'
    );
  };

  // Save manual observations inside journal logs
  const handleSaveJournalNoteDef = (id: string, notesText: string) => {
    const updatedJournal = journalEntries.map(ent => 
      ent.id === id ? { ...ent, notes: notesText } : ent
    );
    saveJournalState(updatedJournal);
  };

  // Save a custom log pad draft
  const handleAddCustomJournalLog = (title: string, subject: string, notes: string) => {
    const customEntry: JournalEntry = {
      id: `jou_custom_${Date.now()}`,
      title,
      type: 'milestone',
      name: subject,
      date: new Date().toISOString().split('T')[0],
      notes
    };
    saveJournalState([customEntry, ...journalEntries]);
    showToast('Log Committed!', `Successfully archived observation node "${title}".`, 'success');
  };

  // Helper helper to dynamically manage core leaderboard positions
  const updateLeaderboardValue = (pointsValue: number, planetsVal: number, artifactsVal: number) => {
    const updatedGrid = leaderboard.map(user => {
      if (user.id === 'usr_explorer') {
        return {
          ...user,
          points: pointsValue,
          planetsUnlockedCount: planetsVal,
          artifactsCollectedCount: artifactsVal
        };
      }
      return user;
    });

    // Re-calculate ranks
    const sorted = [...updatedGrid].sort((a, b) => b.points - a.points);
    const ranked = sorted.map((user, idx) => ({
      ...user,
      rank: idx + 1
    }));

    setLeaderboard(ranked);
    localStorage.setItem('cosmic_vault_leaderboard', JSON.stringify(ranked));
  };

  // Helper helper mappings
  const galaxyNamesRecord = galaxies.reduce<Record<string, string>>((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  const planetsCountByGalaxyMapped = galaxies.reduce<Record<string, { total: number; unlocked: number }>>((acc, g) => {
    const belonging = planets.filter(p => p.galaxyId === g.id);
    acc[g.id] = {
      total: belonging.length,
      unlocked: belonging.filter(p => p.unlocked).length
    };
    return acc;
  }, {});

  const unlockedPlanetsCount = planets.filter(p => p.unlocked).length;
  const totalPlanetsCountVal = planets.length;

  return (
    <div className="min-h-screen bg-cosmic-black cosmic-gradient text-gray-100 font-sans selection:bg-blue-500/20 overflow-x-hidden flex flex-col justify-between relative">
      
      {/* Aurora glow indicators */}
      <div className="absolute inset-0 aurora-blur pointer-events-none z-0" />

      {/* Floating System Sliders toast alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: '50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-20 right-4 md:right-8 z-50 w-full max-w-sm glass-panel rounded-2xl p-4 shadow-xl flex gap-3 items-start select-none ${
              toast.type === 'error'
                ? 'border-blue-900/40 shadow-[0_0_15px_rgba(59,130,246,0.1)] bg-cosmic-black/95'
                : 'border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)] bg-cosmic-black/95'
            }`}
            id="system-glowing-toast"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'error' ? (
                <AlertCircle className="h-5 w-5 text-blue-400" />
              ) : (
                <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold font-display text-white">{toast.title}</h4>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5 leading-relaxed">{toast.desc}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-zinc-500 hover:text-white rounded-md p-1 bg-white/5 cursor-pointer text-xs"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Page Header */}
      {userProfile && (
        <Header
          user={userProfile}
          notifications={notifications}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          onMarkNotificationRead={(id) => {
            const updatedNotifs = notifications.map(n => n.id === id ? { ...n, read: true } : n);
            saveNotificationsState(updatedNotifs);
          }}
          onClearNotifications={() => {
            saveNotificationsState([]);
            showToast('Alerts Cleared', 'All incoming receiver notices have been recycled.', 'info');
          }}
        />
      )}

      {/* Outer Content Layout Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative z-10 px-4 md:px-6 py-6 gap-6">
        
        {/* Navigation Sidebar Panel */}
        {userProfile && (
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            planetsUnlockedCount={unlockedPlanetsCount}
            totalPlanetsCount={totalPlanetsCountVal}
          />
        )}

        {/* Main core window canvas with transition effects */}
        <main className="flex-1 min-w-0 overflow-y-auto space-y-8" id="primary-main-view">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              
              {/* TAB VALUE: HOME COMMAND BRIDGE */}
              {activeTab === 'home' && (
                <div className="space-y-8" id="home-view-canvas">
                  
                  {/* Hero banner section */}
                  <div className="glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-center border border-white/10 shadow-2xl relative min-h-[300px]">
                    {/* Space grid background wireframe */}
                    <div className="absolute inset-0 space-grid opacity-30 pointer-events-none" />
                    
                    {/* Rotating system vector behind header text */}
                    <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border border-blue-500/5 flex items-center justify-center animate-spin-slow pointer-events-none">
                      <div className="w-80 h-80 rounded-full border border-dashed border-blue-600/5 flex items-center justify-center">
                        <div className="w-56 h-56 rounded-full border border-blue-500/10" />
                      </div>
                    </div>

                    <div className="max-w-xl space-y-4 relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-550/10 border border-blue-500/30 text-xs font-mono text-blue-400 animate-pulse">
                        <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                        <span>INTERSTELLAR DISCOVERY SYSTEM LIVE</span>
                      </div>

                      <h1 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
                        Explore the Secrets of the Universe
                      </h1>
                      
                      <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
                        Unlock planets, discover artifacts, and reveal hidden mysteries across the cosmos with high-fidelity warp drive signals.
                      </p>

                      <div className="pt-3">
                        <button
                          id="btn-navigate-exploration-center"
                          onClick={() => setActiveTab('planets')}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 text-white text-xs font-sans font-semibold hover:scale-103 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all cursor-pointer flex items-center gap-1.5 glow-cyan"
                        >
                          Begin Exploration
                          <ChevronRight className="w-4 h-4 animate-pulse" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bento Grid Stats Widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    {/* System Status Metrics Card (Col 4) */}
                    <div className="md:col-span-4 glass-panel rounded-2xl p-5 border border-zinc-900 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Observer Metrics</span>
                        <h4 className="text-sm font-display font-medium text-white mt-1">Stellar Calibration Status</h4>
                      </div>

                      <div className="space-y-3 my-4 text-xs font-sans">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
                          <span className="text-zinc-400">Total Galaxy Access</span>
                          <span className="font-mono text-blue-400 font-semibold">
                            {galaxies.filter(g => g.unlocked).length} / {galaxies.length} Clusters
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
                          <span className="text-zinc-400">Streak Multiplyer</span>
                          <span className="font-mono text-blue-400 font-semibold">
                            {userProfile?.streak || 0}x Days (Active)
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-1">
                          <span className="text-zinc-400">Total Artifact Containment</span>
                          <span className="font-mono text-blue-400 font-semibold font-display">
                            {artifacts.filter(a => a.unlocked).length} Relics
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('galaxy')}
                        className="w-full py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-center font-mono text-[10px] text-zinc-300 transition-colors uppercase"
                      >
                        Launch Astro-Map
                      </button>
                    </div>

                    {/* Fast Navigation Guides (Col 8) */}
                    <div className="md:col-span-8 glass-panel rounded-2xl p-5 border border-zinc-900 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Quick Actions Portal</span>
                        <h4 className="text-sm font-display font-medium text-white mt-1">Direct Warp Target Overrides</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                        
                        <div
                          onClick={() => setActiveTab('mystery')}
                          className="p-3 rounded-xl bg-cosmic-black/80 border border-zinc-900/80 hover:border-blue-500/30 hover:bg-zinc-950 transition-all cursor-pointer group flex flex-col justify-between h-24"
                        >
                          <Gift className="w-5 h-5 text-blue-400 group-hover:scale-105 transition-transform" />
                          <div>
                            <h5 className="font-display font-medium text-xs text-white">Daily Mystery</h5>
                            <span className="text-[10px] font-sans text-zinc-500">Decrypt cargo cells</span>
                          </div>
                        </div>

                        <div
                          onClick={() => setActiveTab('journal')}
                          className="p-3 rounded-xl bg-cosmic-black/80 border border-zinc-900/80 hover:border-blue-500/30 hover:bg-zinc-950 transition-all cursor-pointer group flex flex-col justify-between h-24"
                        >
                          <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-105 transition-transform" />
                          <div>
                            <h5 className="font-display font-medium text-xs text-white">Logs & Notes</h5>
                            <span className="text-[10px] font-sans text-zinc-500">Document findings</span>
                          </div>
                        </div>

                        <div
                          onClick={() => setActiveTab('leaderboard')}
                          className="p-3 rounded-xl bg-cosmic-black/80 border border-zinc-900/80 hover:border-blue-500/30 hover:bg-zinc-950 transition-all cursor-pointer group flex flex-col justify-between h-24"
                        >
                          <Trophy className="w-5 h-5 text-blue-400 group-hover:scale-105 transition-transform" />
                          <div>
                            <h5 className="font-display font-medium text-xs text-white">Rank standings</h5>
                            <span className="text-[10px] font-sans text-zinc-500">Inspect server pioneers</span>
                          </div>
                        </div>

                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-600/5 border border-blue-600/15 text-[10px] text-zinc-400 flex items-center justify-between font-mono">
                        <span>SPATIAL TIME LOCK: SYNCED</span>
                        <span className="font-bold text-blue-400">AUTONOMOUS</span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB VALUE: DISCOVERY SCREEN */}
              {activeTab === 'planets' && userProfile && (
                <PlanetDiscovery
                  planets={planets}
                  galaxyNames={galaxyNamesRecord}
                  points={userProfile.points}
                  onUnlockPlanet={handleUnlockPlanet}
                />
              )}

              {/* TAB VALUE: ARTIFACTS SCREEN */}
              {activeTab === 'artifacts' && userProfile && (
                <CosmicArtifacts
                  artifacts={artifacts}
                  points={userProfile.points}
                  onUnlockArtifact={handleUnlockArtifact}
                />
              )}

              {/* TAB VALUE: HOVER MYSTERY CHEST */}
              {activeTab === 'mystery' && userProfile && (
                <DailyMysteryBox
                  planets={planets}
                  artifacts={artifacts}
                  points={userProfile.points}
                  streak={userProfile.streak}
                  lastMysteryClaim={userProfile.lastMysteryClaim}
                  onClaimReward={handleClaimMysteryRewards}
                />
              )}

              {/* TAB VALUE: VECTOR GALAXY NAVIGATION */}
              {activeTab === 'galaxy' && userProfile && (
                <GalaxyMap
                  galaxies={galaxies}
                  points={userProfile.points}
                  onUnlockGalaxy={handleUnlockGalaxyDef}
                  planetsCountByGalaxy={planetsCountByGalaxyMapped}
                />
              )}

              {/* TAB VALUE: PERSONAL LEDGER SCANS */}
              {activeTab === 'journal' && (
                <CosmicJournal
                  planets={planets}
                  artifacts={artifacts}
                  journalEntries={journalEntries}
                  onSaveJournalNote={handleSaveJournalNoteDef}
                  onAddCustomNote={handleAddCustomJournalLog}
                />
              )}

              {/* TAB VALUE: COMPETITION STANDINGS */}
              {activeTab === 'leaderboard' && (
                <Leaderboard
                  leaderboardUsers={leaderboard}
                  planetList={planets}
                />
              )}

            </motion.div>
          </AnimatePresence>

        </main>

      </div>

      {/* Decorative footer */}
      <footer className="glass-panel border-t border-white/10 py-5 mt-12 relative z-10 px-4 md:px-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] leading-relaxed">
            © 2026 Cosmic Vault Systems. Empowering galactic navigations, timeline containment, and quantum signals monitoring. <span className="text-zinc-400 font-medium">Built by Emmanuella.</span>
          </p>
          <div className="flex gap-4 font-mono text-[10px] text-zinc-600">
            <a href="#" className="hover:text-blue-400 transition-colors">STARDUST TERMS</a>
            <a href="#" className="hover:text-blue-400 transition-colors">ASTRO_API</a>
            <a href="#" className="hover:text-blue-400 transition-colors">COMMAND_CENTER</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
