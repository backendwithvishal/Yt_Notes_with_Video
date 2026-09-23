import { useState, useCallback, useId } from 'react';
import { toast } from 'sonner';
import { useNoteStore } from '../store/useNotes';
import { validateNoteTitle } from '../lib/validate';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';

interface NoteFormProps {
  /** If provided, renders as an edit form pre-populated with these values */
  initialTitle?: string;
  initialDescription?: string;
  onSave?: (title: string, description: string) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function NoteForm({
  initialTitle = '',
  initialDescription = '',
  onSave,
  onCancel,
  isEditing = false,
}: NoteFormProps) {
  const addNote = useNoteStore((s) => s.addNote);
  const uid = useId();
  const titleId = `note-title-${uid}`;
  const descId = `note-desc-${uid}`;
  const titleErrorId = `note-title-error-${uid}`;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      const result = validateNoteTitle(e.target.value);
      if (result.valid) setTitleError(null);
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const result = validateNoteTitle(title);
      if (!result.valid) {
        setTitleError(result.error);
        return;
      }
      setTitleError(null);

      if (isEditing && onSave) {
        onSave(title.trim(), description.trim());
      } else {
        addNote(title.trim(), description.trim());
        toast.success('Note added.');
        setTitle('');
        setDescription('');
      }
    },
    [title, description, isEditing, onSave, addNote]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor={titleId} className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
          Title <span aria-hidden="true" style={{ color: 'var(--destructive)' }}>*</span>
        </label>
        <Input
          id={titleId}
          value={title}
          onChange={handleTitleChange}
          placeholder="Note title"
          aria-required="true"
          aria-invalid={!!titleError}
          aria-describedby={titleError ? titleErrorId : undefined}
          className={cn(
            'h-8 text-xs',
            titleError && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
        {titleError && (
          <p id={titleErrorId} role="alert" className="text-xs" style={{ color: 'var(--destructive)' }}>
            {titleError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={descId} className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
          Description
        </label>
        <Textarea
          id={descId}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details (optional)"
          rows={2}
          className="text-xs"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {isEditing && onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel} className="h-7 px-3 text-xs font-normal">
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" className="h-7 px-3 text-xs font-normal">
          {isEditing ? 'Save' : 'Add Note'}
        </Button>
      </div>
    </form>
  );
}
