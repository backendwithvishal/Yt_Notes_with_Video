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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor={titleId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Title <span aria-hidden="true" className="text-error-500">*</span>
        </label>
        <Input
          id={titleId}
          value={title}
          onChange={handleTitleChange}
          placeholder="Note title"
          aria-required="true"
          aria-invalid={!!titleError}
          aria-describedby={titleError ? titleErrorId : undefined}
          className={cn(titleError && 'border-error-500 focus-visible:ring-error-500')}
        />
        {titleError && (
          <p id={titleErrorId} role="alert" className="text-xs text-error-500">
            {titleError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={descId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Description
        </label>
        <Textarea
          id={descId}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details (optional)"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        {isEditing && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {isEditing ? 'Save' : 'Add Note'}
        </Button>
      </div>
    </form>
  );
}
