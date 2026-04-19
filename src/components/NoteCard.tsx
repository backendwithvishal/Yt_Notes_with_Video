import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2, Play } from 'lucide-react';
import type { Note } from '../types';
import { useNoteStore } from '../store/useNotes';
import { formatTimestamp } from '../lib/utils';
import { Badge } from './ui/badge';
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
      className="rounded-xl border p-4 flex flex-col gap-2 transition-shadow duration-150 hover:shadow-md bg-card border-border"
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
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h3
                className="font-semibold text-sm leading-snug truncate text-foreground"
              >
                {note.title}
              </h3>
              <Badge
                variant="secondary"
                className="cursor-pointer shrink-0 select-none"
                onClick={handleSeek}
                title="Seek to this timestamp"
              >
                ⏱ {formatTimestamp(note.timestamp)}
              </Badge>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-0.5 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Seek to timestamp" onClick={handleSeek}>
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Seek to {formatTimestamp(note.timestamp)}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Edit note" onClick={() => setIsEditing(true)}>
                    <Pencil className="w-3.5 h-3.5" />
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
                    className="text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Description */}
          {note.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
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
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}
