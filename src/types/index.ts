// Shared TypeScript types for YtEduNotes

export interface Note {
  id: string;
  title: string;
  description: string;
  timestamp: number; // seconds from player.getCurrentTime()
  createdAt: number; // Date.now()
}

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export interface NoteStoreState {
  url: string;
  videoId: string | null;
  player: YT.Player | null;
  notes: Note[];
  isLoadingNotes: boolean;
}

export interface NoteStoreActions {
  setUrl: (url: string) => void;
  setVideoId: (id: string | null) => void;
  setPlayer: (player: YT.Player) => void;
  addNote: (title: string, description: string) => void;
  updateNote: (id: string, title: string, description: string) => void;
  deleteNote: (id: string) => void;
  seekTo: (timestamp: number) => void;
  loadNotes: () => void;
  clearNotes: () => void;
}

export type NoteStore = NoteStoreState & NoteStoreActions;

export interface ThemeStoreState {
  theme: 'light' | 'dark';
}

export interface ThemeStoreActions {
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export type ThemeStore = ThemeStoreState & ThemeStoreActions;
