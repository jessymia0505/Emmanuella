/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RarityType = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Cosmic';

export interface Planet {
  id: string;
  name: string;
  description: string;
  rarity: RarityType;
  unlocked: boolean;
  discoveryDate?: string;
  mass: string;
  temperature: string;
  distance: string; // e.g., "4.2 Light Years" or "1,200 Light Years"
  imageId: string; // Used for customized gradient & orb visual identification
  galaxyId: string;
  mysteryFact?: string; // Revealed when unlocked
}

export interface Artifact {
  id: string;
  name: string;
  story: string;
  rarity: RarityType;
  unlocked: boolean;
  unlockDate?: string;
  imageId: string; // visual icon type
  energyLevel: string; // e.g., "940 QK"
}

export interface Galaxy {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  x: number; // percentage coordinate 0-100 on visual grid
  y: number; // percentage coordinate 0-100 on visual grid
  planetsCount: number;
}

export interface JournalEntry {
  id: string;
  title: string;
  type: 'planet' | 'artifact' | 'mystery' | 'milestone';
  name: string;
  rarity?: RarityType;
  date: string;
  notes: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  badge: string;
  planetsUnlockedCount: number;
  artifactsCollectedCount: number;
  points: number;
  rank: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'discovery' | 'artifact' | 'system';
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  badge: string;
  points: number;
  level: number;
  streak: number;
  lastMysteryClaim?: string; // ISO String of last claim
}
