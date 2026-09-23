import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FileDown, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/useNotes';
import { generatePDF } from '../lib/pdf';
import VideoPlayer from '../components/VideoPlayer';
import NotesPanel from '../components/NotesPanel';
import { Button } from '../components/ui/button';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '../components/ui/dialog';

export default function EduNotes() {
  const notes      = useNoteStore((s) => s.notes);
  const clearNotes = useNoteStore((s) => s.clearNotes);
  const videoId    = useNoteStore((s) => s.videoId);
  const navigate   = useNavigate();

  const [isExporting, setIsExporting]       = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [theatreMode, setTheatreMode]         = useState(false);

  // Redirect to home if no video selected
  useEffect(() => {
    if (!videoId) navigate('/', { replace: true });
  }, [videoId, navigate]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try { await generatePDF(notes); }
    finally { setIsExporting(false); }
  };

  const handleClearConfirm = () => {
    clearNotes();
    toast.success('All notes cleared.');
    setShowClearDialog(false);
  };

  if (!videoId) return null; // avoid flash before redirect

  return (
    <>
      {/* Full-height page: navbar is sticky, this fills the rest */}
      <main
        className="flex-1 flex flex-col px-3 sm:px-5 lg:px-6 py-3 gap-3 max-w-7xl mx-auto w-full min-h-0"
      >
        {/* ── Action bar ── */}
        <div className="flex items-center justify-between gap-2 flex-wrap shrink-0">
          <h1 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>
            Study Session
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              disabled={notes.length === 0}
              className="gap-1.5 h-8 px-3 text-xs font-normal"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Notes
            </Button>
            <Button
              size="sm"
              onClick={handleExportPDF}
              disabled={isExporting || notes.length === 0}
              className="gap-1.5 h-8 px-3 text-xs font-normal"
            >
              {isExporting
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                : <FileDown className="w-3.5 h-3.5" />}
              {isExporting ? 'Exporting…' : 'Export PDF'}
            </Button>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        {/* Theatre mode: video takes full width, notes panel hidden        */}
        {/* Normal mode: 60/40 split on desktop, stacked on mobile          */}
        <div className="flex flex-col md:flex-row gap-3 flex-1 min-h-0">

          {/* Video column */}
          <div className={theatreMode ? 'w-full' : 'w-full md:w-3/5 shrink-0'}>
            <VideoPlayer onTheatreToggle={setTheatreMode} />
          </div>

          {/* Notes column — hidden in theatre mode */}
          {!theatreMode && (
            <div
              className="w-full md:w-2/5 flex flex-col min-h-0 max-h-[calc(100vh-130px)]"
            >
              <NotesPanel />
            </div>
          )}

        </div>
      </main>

      {/* ── Clear confirmation dialog ── */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear all notes?</DialogTitle>
            <DialogDescription>
              All {notes.length} note{notes.length !== 1 ? 's' : ''} will be permanently deleted.
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowClearDialog(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleClearConfirm}>Clear All</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
