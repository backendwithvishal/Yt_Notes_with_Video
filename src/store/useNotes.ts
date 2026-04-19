import { create, type StateCreator } from 'zustand';
import type { NoteStore } from '../types';
import { extractVideoId } from '../lib/youtube';

const STORAGE_KEY = 'ytNotes';

const loadFromStorage = (): import('../types').Note[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveToStorage = (notes: import('../types').Note[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

const noteStoreCreator: StateCreator<NoteStore> = (set, get) => ({
  url: '',
  videoId: null,
  player: null,
  notes: loadFromStorage(), // load once at init — no component effect needed
  isLoadingNotes: false,

  setUrl: (url: string) => {
    const videoId = extractVideoId(url);
    set({ url, videoId });
    if (videoId) {
      localStorage.setItem('videoId', videoId);
    }
  },

  setVideoId: (id) => set({ videoId: id }),

  setPlayer: (player) => set({ player }),

  addNote: (title: string, description: string) => {
    const player = get().player;
    const timestamp = player ? (player.getCurrentTime?.() ?? 0) : 0;
    const note: import('../types').Note = {
      id: crypto.randomUUID(),
      title,
      description,
      timestamp,
      createdAt: Date.now(),
    };
    const updated = [...get().notes, note];
    saveToStorage(updated);
    set({ notes: updated });
  },

  updateNote: (id: string, title: string, description: string) => {
    const updated = get().notes.map((n) =>
      n.id === id ? { ...n, title, description } : n
    );
    saveToStorage(updated);
    set({ notes: updated });
  },

  deleteNote: (id: string) => {
    const updated = get().notes.filter((n) => n.id !== id);
    saveToStorage(updated);
    set({ notes: updated });
  },

  seekTo: (timestamp: number) => {
    const player = get().player;
    if (player?.seekTo) {
      player.seekTo(timestamp, true);
    }
  },

  loadNotes: () => {
    set({ notes: loadFromStorage() });
  },

  clearNotes: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ notes: [] });
  },
});

export const useNoteStore = create<NoteStore>(noteStoreCreator);
