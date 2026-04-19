import { useMemo } from 'react';
import { useNoteStore } from '../store/useNotes';
import { Skeleton } from './ui/skeleton';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

export default function NotesPanel() {
  const notes          = useNoteStore((s) => s.notes);
  const isLoadingNotes = useNoteStore((s) => s.isLoadingNotes);

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => a.timestamp - b.timestamp),
    [notes]
  );

  return (
    <section
      aria-label="Notes panel"
      className="flex flex-col gap-3 h-full"
      style={{ minHeight: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
          Notes
          {notes.length > 0 && (
            <span className="ml-2 text-sm font-normal" style={{ color: 'var(--muted-foreground)' }}>
              ({notes.length})
            </span>
          )}
        </h2>
      </div>

      {/* Add note form */}
      <div
        className="rounded-xl border p-4 shrink-0"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <NoteForm />
      </div>

      {/* Scrollable notes list */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-0.5" style={{ minHeight: 0 }}>
        {isLoadingNotes ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))
        ) : sortedNotes.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              No notes yet — add your first note above.
            </p>
          </div>
        ) : (
          sortedNotes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>
    </section>
  );
}
