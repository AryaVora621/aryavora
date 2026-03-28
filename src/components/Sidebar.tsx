import { useState } from 'react';
import { Plus, Search, FileText, Trash2 } from 'lucide-react';
import type { Note } from '../hooks/useNexusGraph';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
}

export const Sidebar = ({
  notes,
  activeNoteId,
  onSelectNote,
  onAddNote,
  onDeleteNote
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel flex-col h-full animate-fade-in" style={{ padding: '1.5rem', zIndex: 10 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-2" style={{ color: 'var(--accent-cyan)', margin: 0 }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }} />
          Nexus
        </h2>
        <button className="btn-primary" onClick={onAddNote}>
          <Plus size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="mb-4" style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-dim)' }} />
        <input 
          type="text" 
          placeholder="Search thoughts..." 
          style={{ paddingLeft: '2.5rem' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Note List */}
      <div className="flex-col gap-2" style={{ overflowY: 'auto', flex: 1 }}>
        {filteredNotes.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>No notes found.</p>
        ) : (
          filteredNotes.map(note => {
            const isActive = note.id === activeNoteId;
            return (
              <div 
                key={note.id}
                className="glass-box flex justify-between items-center"
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  background: isActive ? 'rgba(0, 240, 255, 0.05)' : 'rgba(16, 18, 43, 0.6)',
                }}
                onClick={() => onSelectNote(note.id)}
              >
                <div className="flex items-center gap-2" style={{ overflow: 'hidden' }}>
                  <FileText size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                  <span style={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    color: isActive ? 'white' : 'var(--text-main)',
                    fontWeight: isActive ? 500 : 400
                  }}>
                    {note.title || 'Untitled'}
                  </span>
                </div>
                
                {isActive && (
                  <button onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }} style={{ color: 'var(--accent-pink)', padding: '4px' }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
