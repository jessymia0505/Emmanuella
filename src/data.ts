/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Planet, Artifact, Galaxy, LeaderboardUser, NotificationItem, UserProfile } from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_explorer',
  name: 'Astral Cadet Nova',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  bio: 'First Rank explorer of the Andromeda Nexus. Seeking the mythical Singularity core beyond black holes.',
  badge: 'Nebula Veteran',
  points: 1240,
  level: 4,
  streak: 5,
  lastMysteryClaim: undefined // Will update dynamically
};

export const GALAXIES: Galaxy[] = [
  {
    id: 'gal_andromeda',
    name: 'Andromeda Nexus',
    description: 'A sprawling spiral metropolis of stellar systems linked by gravity corridors. Safe and well charted.',
    unlocked: true,
    x: 25,
    y: 35,
    planetsCount: 3
  },
  {
    id: 'gal_obsidian',
    name: 'Obsidian Rift',
    description: 'A perilous region surrounding a dormant supermassive black hole. Rich in dark matter and magnetic anomalies.',
    unlocked: true,
    x: 52,
    y: 60,
    planetsCount: 2
  },
  {
    id: 'gal_whispers',
    name: 'Nebula of Whispers',
    description: 'A shimmering dust shroud where planetary voices are carried on stellar winds. Locked by gravimetric shields.',
    unlocked: false,
    x: 78,
    y: 28,
    planetsCount: 1
  },
  {
    id: 'gal_void',
    name: 'The Void Sector',
    description: 'An undocumented quadrant beyond cosmic horizons. Extremely unstable space-time fabric.',
    unlocked: false,
    x: 88,
    y: 78,
    planetsCount: 1
  }
];

export const PLANETS: Planet[] = [
  {
    id: 'plt_vespera',
    name: 'Vespera Prime',
    description: 'A serene twilight world covered in bioluminescent flora glowing under purple solar eclipses.',
    rarity: 'Common',
    unlocked: true,
    discoveryDate: '2026-05-25',
    mass: '0.84 Earths',
    temperature: '-12°C',
    distance: '4.2 Light Years',
    imageId: 'vespera_purple',
    galaxyId: 'gal_andromeda',
    mysteryFact: 'The pulsing purple moss on this planet communicates planetary weather changes across hundreds of miles instantly through root networks.'
  },
  {
    id: 'plt_pyri',
    name: 'Pyriphlegethon',
    description: 'A burning copper planet locked in a perpetual tidal dance with twin supermassive blue stars.',
    rarity: 'Rare',
    unlocked: true,
    discoveryDate: '2026-05-27',
    mass: '2.14 Earths',
    temperature: '480°C',
    distance: '24 Light Years',
    imageId: 'pyri_burning',
    galaxyId: 'gal_andromeda',
    mysteryFact: 'Rain on Pyriphlegethon is actually liquid glass, cooling into iridescent crystalline needles before it strikes the copper deserts.'
  },
  {
    id: 'plt_aethel',
    name: 'Aethelgard II',
    description: 'A crystallized world where the soil itself is made of organic semiconductors that store historical weather logs.',
    rarity: 'Epic',
    unlocked: false,
    mass: '1.45 Earths',
    temperature: '18°C',
    distance: '150 Light Years',
    imageId: 'aethel_crystal',
    galaxyId: 'gal_andromeda',
    mysteryFact: 'Plugging an electric beacon directly into the crystalline soil allows explorers to play acoustic recordings of past planetary asteroid impacts.'
  },
  {
    id: 'plt_chronos',
    name: 'Chronos XII',
    description: 'A planet frozen on the very edge of the gravitational event horizon. Space-time is highly dilated.',
    rarity: 'Legendary',
    unlocked: true,
    discoveryDate: '2026-05-28',
    mass: '8.40 Earths',
    temperature: '-150°C',
    distance: '4.2k Light Years',
    imageId: 'chronos_gold',
    galaxyId: 'gal_obsidian',
    mysteryFact: 'One hour spent observing the golden rings from the surface of Chronos XII corresponds to twelve years passing in standard Galactic time.'
  },
  {
    id: 'plt_xenon',
    name: 'Xenon Gas Giant',
    description: 'A majestic heavy gas giant saturated with glowing cyan isotopes and floating electromagnetic debris reefs.',
    rarity: 'Common',
    unlocked: false,
    mass: '318 Earths',
    temperature: '-70°C',
    distance: '1.2k Light Years',
    imageId: 'xenon_glowing',
    galaxyId: 'gal_obsidian',
    mysteryFact: 'The atmospheric pressure is so immense that helium rain condenses into floating helium icebergs drifting in a deep neon sea.'
  },
  {
    id: 'plt_kalliope',
    name: 'Kalliope Lumina',
    description: 'An ancient mythical celestial orb made entirely of super-dense solid light and gravity-defying silver mist.',
    rarity: 'Cosmic',
    unlocked: false,
    mass: 'Unknown',
    temperature: '2,400°C',
    distance: '14k Light Years',
    imageId: 'kalliope_cosmic',
    galaxyId: 'gal_whispers',
    mysteryFact: 'Kalliope is not solid rock or gas. It is a cluster of high-energy photon loops held together by a microscopic ancient gravity core.'
  },
  {
    id: 'plt_erebos',
    name: 'Erebos Noctis',
    description: 'A pitch-black ice world that absorbs 99.9% of solar radiation. A quiet graveyard of dead stellar systems.',
    rarity: 'Cosmic',
    unlocked: false,
    mass: '0.98 Earths',
    temperature: '-268°C',
    distance: '28k Light Years',
    imageId: 'erebos_dark',
    galaxyId: 'gal_void',
    mysteryFact: 'Deep beneath the dark ice core, deep-sea currents maintain water warm enough to shield sleeping fossilized leviathan organisms.'
  }
];

export const ARTIFACTS: Artifact[] = [
  {
    id: 'art_quantum',
    name: 'Quantum Crystal',
    story: 'An ancient crystal shard that exists in multiple quantum states simultaneously. It hums with the warm static background energy of the Big Bang itself.',
    rarity: 'Cosmic',
    unlocked: true,
    unlockDate: '2026-05-26',
    imageId: 'glass_crystal',
    energyLevel: '1,200 QK'
  },
  {
    id: 'art_time',
    name: 'Time Compass',
    story: 'A highly complex chronal anchor salvaged from the chronological rim of the Obsidian Rift. The double indicators point towards alternate branches of history.',
    rarity: 'Legendary',
    unlocked: true,
    unlockDate: '2026-05-29',
    imageId: 'gear_compass',
    energyLevel: '850 QK'
  },
  {
    id: 'art_stellar',
    name: 'Stellar Core Sphere',
    story: 'The miniature, micro-compressed absolute heart of a collapsed yellow sun, suspended safely inside a perpetual anti-matter magnetic containment cell.',
    rarity: 'Epic',
    unlocked: false,
    imageId: 'gold_sphere',
    energyLevel: '620 QK'
  },
  {
    id: 'art_nebula',
    name: 'Nebula Relic Key',
    story: 'A fossilized chunk of dark stardust showing stellar maps of an ancient lost civilization. Inserting it into the Galaxy Map grants access to locked sectors.',
    rarity: 'Rare',
    unlocked: false,
    imageId: 'key_star',
    energyLevel: '410 QK'
  },
  {
    id: 'art_chronometer',
    name: 'Astral Chronometer',
    story: 'A rugged precision alignment device crafted from hyper-resistant titanium alloy that tracks dark-matter tidal waves for safe interstellar hopping.',
    rarity: 'Common',
    unlocked: true,
    unlockDate: '2026-05-24',
    imageId: 'gadget_dial',
    energyLevel: '180 QK'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'not_1',
    title: 'New Celestial Signals Detected',
    description: 'Astronomical nodes have identified a new anomaly in the Andromeda Nexus sector. Prepare your sensors.',
    timestamp: '2026-05-30T04:00:00Z',
    read: false,
    type: 'system'
  },
  {
    id: 'not_2',
    title: 'Time Compass Decrypted',
    description: 'The Time Compass artifact is fully operational. Time dilation values are now being populated in the Cosmic Journal.',
    timestamp: '2026-05-29T21:40:00Z',
    read: true,
    type: 'artifact'
  }
];

export const LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'usr_1',
    name: 'Vortex Seeker Kai',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    badge: 'Galactic Pioneer',
    planetsUnlockedCount: 6,
    artifactsCollectedCount: 5,
    points: 2950,
    rank: 1
  },
  {
    id: 'usr_2',
    name: 'Commander Lyra',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    badge: 'Horizon Specialist',
    planetsUnlockedCount: 5,
    artifactsCollectedCount: 4,
    points: 2180,
    rank: 2
  },
  {
    id: 'usr_explorer',
    name: 'Cadet Nova (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    badge: 'Nebula Veteran',
    planetsUnlockedCount: 3,
    artifactsCollectedCount: 3,
    points: 1240,
    rank: 3
  },
  {
    id: 'usr_4',
    name: 'Zane Starborn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    badge: 'Drifter Rookie',
    planetsUnlockedCount: 2,
    artifactsCollectedCount: 2,
    points: 840,
    rank: 4
  },
  {
    id: 'usr_5',
    name: 'Sola Nebula',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    badge: 'Astrocartographer',
    planetsUnlockedCount: 2,
    artifactsCollectedCount: 1,
    points: 620,
    rank: 5
  }
];

export const COSMIC_MESSAGES = [
  "“The stardust in our veins is billions of years old. You are simply the universe discovering itself.”",
  "“When you gaze into the event horizon, remember: time is not lost, it is merely standing still.”",
  "“Beyond the gas clouds of xenon lies an ancient broadcast. It has been repeating the same mathematical sequence for a billion cycles.”",
  "“Every black hole is a gateway to a nursery where new baby dimensions are being born tonight.”",
  "“Ancient builders left core containment vessels inside yellow suns to hold gravitational matter in check.”",
  "“Listen carefully to the deep electromagnetic radio winds of Obsidian Rift—sometimes, they whisper your true name.”",
  "“To navigate the cosmic dark, trust your inner beacon. Space is not empty; it is saturated with infinite potential.”"
];
