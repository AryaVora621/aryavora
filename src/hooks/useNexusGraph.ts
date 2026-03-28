import { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { extractLinks, normalizeTitle } from '../utils/parser';

export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export interface GraphNode {
  id: string;
  name: string;
  val: number; 
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

const STORAGE_KEY = 'nexus_notes_data';

const initialNotes: Note[] = [
  {
    id: uuidv4(),
    title: 'Nexus Intelligence',
    content: 'Welcome to **Nexus**. This is a tool to map your thoughts.\n\nTry linking to another idea by putting it in double brackets, like this: [[Artificial Intelligence]].',
    timestamp: Date.now()
  },
  {
    id: uuidv4(),
    title: 'Artificial Intelligence',
    content: 'The study of intelligent agents. It encompasses [[Machine Learning]] and [[Neural Networks]].',
    timestamp: Date.now() - 1000
  }
];

export const useNexusGraph = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notes', e);
      }
    }
    return initialNotes;
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback((title: string = 'Untitled Note') => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content: '',
      timestamp: Date.now()
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates, timestamp: Date.now() } : note
    ));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  }, [activeNoteId]);

  // Derived graph data memoized for performance
  const graphData = useMemo<GraphData>(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Create a map to look up node ids by normalized title
    const titleToIdMap = new Map<string, string>();

    // First pass: Create nodes for all actual notes
    notes.forEach(note => {
      nodes.push({ id: note.id, name: note.title, val: 2 });
      titleToIdMap.set(normalizeTitle(note.title), note.id);
    });

    // Second pass: Extract links and build edges or phantom nodes
    notes.forEach(note => {
      const linkedTitles = extractLinks(note.content);
      
      linkedTitles.forEach(title => {
        const normalized = normalizeTitle(title);
        let targetId = titleToIdMap.get(normalized);
        
        // If the linked note doesn't exist yet, create a "phantom" node in the graph
        if (!targetId) {
          targetId = `phantom-${normalized}`;
          if (!titleToIdMap.has(normalized)) {
            nodes.push({ id: targetId, name: title, val: 0.8 }); // Make phantom nodes smaller
            titleToIdMap.set(normalized, targetId);
          }
        }

        // Add edge
        links.push({
          source: note.id,
          target: targetId 
        });
      });
    });

    return { nodes, links };
  }, [notes]);

  return {
    notes,
    activeNoteId,
    setActiveNoteId,
    addNote,
    updateNote,
    deleteNote,
    graphData
  };
};
