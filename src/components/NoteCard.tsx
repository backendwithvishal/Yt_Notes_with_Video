import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Clock } from 'lucide-react';
import type { Note } from '../types';
import { useNoteStore } from '../store/useNotes';
import { formatTimestamp } from '../lib/utils';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from './ui/dialog';
import NoteForm from './NoteForm';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const seekTo     = useNoteStore((s) => s.seekTo);
  const updateNote = useNoteStore((s) => s.updateNote);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  const [isEditing, setIsEditing]           = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSeek   = () => seekTo(note.timestamp);
  const handleSave   = (title: string, description: string) => {
    updateNote(note.id, title, description);
    toast.success('Note updated.');
    setIsEditing(false);
  };
  const handleDelete = () => {
    deleteNote(note.id);
    toast.success('Note deleted.');
    setShowDeleteDialog(false);
  };

  return (
    <article
      className="rounded-lg border p-3.5 flex flex-col gap-2 transition-shadow duration-150 hover:shadow-sm"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {isEditing ? (
        <NoteForm
          initialTitle={note.title}
          initialDescription={note.description}
          isEditing
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {/* Header row: timestamp + actions */}
          <div className="flex items-center justify-between gap-2">
            {/* Timestamp — clickable to seek */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleSeek}
                  className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70 cursor-pointer"
                  style={{ color: 'var(--primary)' }}
                  aria-label={`Seek to ${formatTimestamp(note.timestamp)}`}
                >
                  <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                  {formatTimestamp(note.timestamp)}
                </button>
              </TooltipTrigger>
              <TooltipContent>Seek to {formatTimestamp(note.timestamp)}</TooltipContent>
            </Tooltip>

            {/* Action buttons */}
            <div className="flex items-center gap-0 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit note"
                    onClick={() => setIsEditing(true)}
                    className="h-7 w-7"
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete note"
                    onClick={() => setShowDeleteDialog(true)}
                    className="h-7 w-7 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-medium text-sm leading-snug" style={{ color: 'var(--foreground)' }}>
            {note.title}
          </h3>

          {/* Description */}
          {note.description && (
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {note.description}
            </p>
          )}
        </>
      )}

      {/* Delete dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete note?</DialogTitle>
            <DialogDescription>
              "{note.title}" will be permanently removed. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}
