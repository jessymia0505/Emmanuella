import React, { useState } from 'react';
import { Planet, Artifact, JournalEntry } from '../types';
import { BookOpen, Search, Filter, Save, Clock, Star, Heart, FileText, Check } from 'lucide-react';

interface CosmicJournalProps {
  planets: Planet[];
  artifacts: Artifact[];
  journalEntries: JournalEntry[];
  onSaveJournalNote: (entryId: string, notes: string) => void;
  onAddCustomNote: (title: string, name: string, notes: string) => void;
}

export const CosmicJournal: React.FC<CosmicJournalProps> = ({
  planets,
  artifacts,
  journalEntries,
  onSaveJournalNote,
  onAddCustomNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'planet' | 'artifact' | 'milestone'>('all');
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  // Form states for creating a custom discovery log
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogSubject, setNewLogSubject] = useState('');
  const [newLogContent, setNewLogContent] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);

  const handleUpdateNote = (id: string, text: string) => {
    setEditNotes((prev) => ({ ...prev, [id]: text }));
    setSavedStatus((prev) => ({ ...prev, [id]: false }));
  };

  const handleSaveNote = (id: string) => {
    const text = editNotes[id] || '';
    onSaveJournalNote(id, text);
    setSavedStatus((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSavedStatus((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleCreateCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle || !newLogContent) return;
    onAddCustomNote(newLogTitle, newLogSubject || 'General System Anomalies', newLogContent);
    setNewLogTitle('');
    setNewLogSubject('');
    setNewLogContent('');
    setShowLogForm(false);
  };

  const filteredEntries = journalEntries.filter((ent) => {
    const matchesSearch =
      ent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.notes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || ent.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6" id="cosmic-journal-section">
      {/* Title & Action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            Cadet's Log Ledger
          </h2>
          <p className="text-sm text-zinc-400 font-sans mt-1">
            Store and review chronological updates from your journey. Record personalized annotations on star fields.
          </p>
        </div>

        <button
          id="btn-toggle-log-form"
          onClick={() => setShowLogForm(!showLogForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-95 text-white font-sans font-medium text-xs rounded-xl self-start sm:self-auto transition-opacity"
        >
          {showLogForm ? 'Close Logpad' : 'Draft New Log Entry'}
        </button>
      </div>

      {/* Draft New Log Entry Form Container */}
      {showLogForm && (
        <form
          onSubmit={handleCreateCustomLog}
          className="glass-panel rounded-2xl p-5 border border-blue-900/30 space-y-4 shadow-md bg-cosmic-black/85 transition-all"
          id="new-ledger-log-form"
        >
          <h3 className="text-sm font-display font-medium text-white">Draft Cosmic Chronicle</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Log Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Solar Wind Interference"
                value={newLogTitle}
                onChange={(e) => setNewLogTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-panel bg-cosmic-dark text-xs text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Subject / Coordinate Ref</label>
              <input
                type="text"
                placeholder="e.g. Vespera Prime Sector"
                value={newLogSubject}
                onChange={(e) => setNewLogSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-panel bg-cosmic-dark text-xs text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase">Observer Findings</label>
            <textarea
              required
              rows={3}
              placeholder="Record your observations here..."
              value={newLogContent}
              onChange={(e) => setNewLogContent(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-panel bg-cosmic-dark text-xs text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-sans font-semibold hover:bg-blue-500 transition-opacity"
          >
            Commit Log to Permanent Grid
          </button>
        </form>
      )}

      {/* Search & filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-7 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search log records and milestones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-panel bg-cosmic-dark/90 text-xs text-white focus:outline-none focus:border-blue-500/50 font-sans"
          />
        </div>

        <div className="sm:col-span-5 flex rounded-xl glass-panel p-1 text-[11px]">
          {(['all', 'planet', 'artifact', 'milestone'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 py-1.5 rounded-lg font-sans font-medium hover:text-white capitalize transition-all ${
                selectedType === type
                  ? 'bg-blue-500/15 text-blue-400'
                  : 'text-zinc-400'
              }`}
            >
              {type === 'all' ? 'All' : type + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Main timeline listing */}
      {filteredEntries.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <FileText className="w-8 h-8 text-zinc-600" />
          <p className="text-xs text-zinc-500 font-sans">No matching chronicle entries found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((ent) => {
            const isSaved = savedStatus[ent.id];
            const displayNote = editNotes[ent.id] !== undefined ? editNotes[ent.id] : ent.notes;
            
            return (
              <div
                key={ent.id}
                id={`journal-row-${ent.id}`}
                className="glass-panel rounded-2xl p-5 border border-zinc-900 bg-cosmic-dark/70 hover:bg-cosmic-dark/90 transition-all flex flex-col md:flex-row md:items-start md:justify-between gap-4"
              >
                {/* Visual marker metadata segment */}
                <div className="flex items-start gap-3.5 md:max-w-md">
                  {/* Symbol based on type */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-zinc-950 border border-zinc-800/85 ${
                    ent.type === 'planet'
                      ? 'text-blue-400'
                      : ent.type === 'artifact'
                      ? 'text-sky-350'
                      : 'text-zinc-350'
                  }`}>
                    {ent.type === 'planet' ? (
                      <Star className="w-5 h-5" />
                    ) : ent.type === 'artifact' ? (
                      <Heart className="w-4 h-4 fill-sky-500/10" />
                    ) : (
                      <Clock className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                        {ent.type} log
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {ent.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-display font-medium text-white">
                      {ent.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Logged Target: <span className="text-blue-400 font-mono font-medium">{ent.name}</span>
                    </p>
                  </div>
                </div>

                {/* Observer comments editable segment */}
                <div className="flex-1 md:max-w-sm space-y-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Telemetry Observations (Notes)
                  </span>
                  
                  <div className="relative">
                    <textarea
                      id={`notes-textarea-${ent.id}`}
                      rows={2}
                      value={displayNote}
                      onChange={(e) => handleUpdateNote(ent.id, e.target.value)}
                      placeholder="Input custom observations, physical density readouts..."
                      className="w-full text-xs font-sans px-3 py-2 rounded-xl glass-panel bg-cosmic-black/80 text-zinc-300 focus:outline-none focus:border-blue-500/40"
                    />
                    
                    <button
                      id={`btn-save-note-${ent.id}`}
                      onClick={() => handleSaveNote(ent.id)}
                      className="absolute bottom-2.5 right-2 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-3 h-3 text-zinc-400" />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
