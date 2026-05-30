import React, { useState } from 'react';
import { Menu, Bell, User, Zap, Star, Sparkles, BookOpen, Clock, LogOut } from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  user: UserProfile;
  notifications: NotificationItem[];
  onToggleSidebar: () => void;
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  notifications,
  onToggleSidebar,
  onMarkNotificationRead,
  onClearNotifications,
}) => {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-md px-4 py-3" id="app-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Mobile Menu Indicator */}
        <div className="flex items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Decorative scanner line */}
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Warp Drive ACTIVE</span>
          </div>
        </div>

        {/* Center: Title / Logo */}
        <div className="flex items-center gap-2 text-center select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center glow-cyan">
            <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <h1 className="text-lg md:text-xl font-display font-bold text-white tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-blue-400 select-none">
            Cosmic Vault
          </h1>
        </div>

        {/* Right: Notification Alerts + Profile Avatar controls */}
        <div className="flex items-center gap-2 relative">
          
          {/* Mini points badge for quick inspection */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-[11px] font-mono text-blue-400">
            <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span>{user.points} SP</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-blue-950/20 border border-blue-900/30 rounded-full text-[11px] font-mono text-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-450" />
            <span>Streak: {user.streak}d</span>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              id="notification-bell"
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
                setShowProfileCard(false);
              }}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white border border-zinc-800 transition-all relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neon-magenta animate-pulse" />
              )}
            </button>

            {/* Notification Menu Overlay */}
            {showNotificationMenu && (
              <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 border border-zinc-800 shadow-2xl z-50 bg-cosmic-black/95 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-2 mb-3">
                  <h4 className="text-xs font-display text-white font-medium">Cosmic Broadcast Warnings</h4>
                  <button
                    onClick={onClearNotifications}
                    className="text-[10px] font-mono text-zinc-500 hover:text-neon-cyan transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-center text-[11px] font-sans text-zinc-500 py-6">No signals reported in this quadrant.</p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((not) => (
                      <div
                        key={not.id}
                        onClick={() => onMarkNotificationRead(not.id)}
                        className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                          not.read
                            ? 'bg-zinc-950/40 border-zinc-900/60'
                            : 'bg-neon-cyan/5 border-neon-cyan/25'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                            {not.type} sensor
                          </span>
                        </div>
                        <h5 className="text-xs font-display font-medium text-white">{not.title}</h5>
                        <p className="text-[11px] text-zinc-400 font-sans mt-0.5 leading-relaxed">{not.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Control */}
          <div className="relative">
            <button
              id="header-user-profile-btn"
              onClick={() => {
                setShowProfileCard(!showProfileCard);
                setShowNotificationMenu(false);
              }}
              className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
            >
              <img
                referrerPolicy="no-referrer"
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full border border-zinc-700"
              />
              <span className="hidden sm:inline text-xs font-mono text-zinc-300 font-medium px-1">Lvl {user.level}</span>
            </button>

            {/* Profile Drawer Card Overlay */}
            {showProfileCard && (
              <div className="absolute right-0 mt-2 w-72 glass-panel rounded-2xl p-5 border border-zinc-800 shadow-2xl z-50 bg-cosmic-black/95">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <img
                      referrerPolicy="no-referrer"
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full border-2 border-blue-500 flex-shrink-0"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 text-black text-[10px] font-mono font-bold flex items-center justify-center ring-2 ring-black">
                      {user.level}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-display font-medium text-white mt-1">{user.name}</h4>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-blue-400">{user.badge}</span>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed px-1">
                    {user.bio}
                  </p>

                  <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                    <div className="bg-zinc-950 p-2 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-zinc-500 uppercase">Points</span>
                      <span className="text-xs font-mono font-bold text-blue-400">{user.points}</span>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded-xl text-center">
                      <span className="block text-[8px] font-mono text-zinc-500 uppercase">Daily Streak</span>
                      <span className="text-xs font-mono font-bold text-blue-300">{user.streak} Days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
