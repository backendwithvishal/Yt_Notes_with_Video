import { useMemo } from 'react';
import { StickyNote } from 'lucide-react';
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
      className="flex flex-col gap-2.5 h-full"
      style={{ minHeight: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
            Notes
          </h2>
          {notes.length > 0 && (
            <span
              className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)' }}
            >
              {notes.length}
            </span>
          )}
        </div>
      </div>

      {/* Add note form */}
      <div
        className="rounded-lg border p-3.5 shrink-0"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <NoteForm />
      </div>

      {/* Scrollable notes list */}
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-0.5" style={{ minHeight: 0 }}>
        {isLoadingNotes ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))
        ) : sortedNotes.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 rounded-lg border border-dashed gap-2"
            style={{ borderColor: 'var(--border)' }}
          >
            <StickyNote className="w-6 h-6" style={{ color: 'var(--muted-foreground)', opacity: 0.5 }} aria-hidden="true" />
            <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
              No notes yet.
              <br />
              Add your first note above.
            </p>
          </div>
        ) : (
          sortedNotes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>
    </section>
  );
}
