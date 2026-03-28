import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Note } from '../hooks/useNexusGraph';
import { Eye, Edit3 } from 'lucide-react';

interface MarkdownEditorProps {
  note: Note | undefined;
  onUpdate: (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => void;
}

export const MarkdownEditor = ({ note, onUpdate }: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);

  if (!note) {
    return (
      <div className="flex items-center justify-center h-full w-full opacity-50 text-center" style={{ padding: '2rem' }}>
        <p>Select a node in the graph or sidebar to view details.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel flex-col h-full animate-fade-in" style={{ padding: '1.5rem', borderLeft: '1px solid var(--border-subtle)', zIndex: 10 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text" 
          value={note.title}
          onChange={(e) => onUpdate(note.id, { title: e.target.value })}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            background: 'transparent',
            border: 'none',
            padding: 0,
            outline: 'none',
            boxShadow: 'none',
            color: 'var(--text-main)'
          }}
          placeholder="Note Title"
        />

        <div className="flex gap-2">
          <button 
            className="btn-primary flex items-center gap-2" 
            onClick={() => setIsPreview(!isPreview)}
            style={{ 
              background: isPreview ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
              borderColor: 'var(--border-light)'
            }}
          >
            {isPreview ? <Edit3 size={16} /> : <Eye size={16} />}
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }} className="markdown-container">
        {isPreview ? (
          <div className="markdown-body glass-box h-full" style={{ padding: '1rem', background: 'transparent', border: 'none' }}>
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => {
                  // If it's a wiki link, we can format it specially. Here we just format all links.
                  return <a className="internal-link" {...props} />;
                }
              }}
            >
              {note.content || '*Empty note*'}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={note.content}
            onChange={(e) => onUpdate(note.id, { content: e.target.value })}
            placeholder="Start typing your thoughts...\n\nUse [[Title]] to link to other notes."
            style={{
              width: '100%',
              height: '100%',
              minHeight: '300px',
              padding: '1rem',
              background: 'rgba(0,0,0,0.1)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-main)',
              fontFamily: 'monospace',
              fontSize: '1rem',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.6
            }}
          />
        )}
      </div>
      
      {/* Helper text */}
      {!isPreview && (
        <div className="mt-4" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Tip: Wrap any word in [[double brackets]] to instantly create a semantic link and graph connection.
        </div>
      )}
    </div>
  );
};
