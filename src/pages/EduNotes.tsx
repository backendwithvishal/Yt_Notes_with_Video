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
  const notes     = useNoteStore((s) => s.notes);
  const clearNotes = useNoteStore((s) => s.clearNotes);
  const videoId   = useNoteStore((s) => s.videoId);
  const navigate  = useNavigate();

  const [isExporting, setIsExporting]       = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

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
        className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-4 gap-4 max-w-7xl mx-auto w-full min-h-0"
      >
        {/* ── Action bar ── */}
        <div className="flex items-center justify-between gap-2 flex-wrap shrink-0">
          <h1 className="text-xl font-semibold text-foreground">
            Study Session
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              disabled={notes.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Clear Notes
            </Button>
            <Button
              size="sm"
              onClick={handleExportPDF}
              disabled={isExporting || notes.length === 0}
            >
              {isExporting
                ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" aria-hidden="true" />
                : <FileDown className="w-4 h-4 mr-1.5" />}
              {isExporting ? 'Exporting…' : 'Export PDF'}
            </Button>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        {/* On mobile: video on top, notes below (scrollable page)       */}
        {/* On md+: side-by-side, both fill remaining viewport height    */}
        <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">

          {/* Video column — 60% on desktop */}
          <div className="w-full md:w-3/5 shrink-0">
            <VideoPlayer />
          </div>

          {/* Notes column — 40% on desktop, scrollable */}
          <div
            className="w-full md:w-2/5 flex flex-col min-h-0 max-h-[calc(100vh-140px)]"
          >
            <NotesPanel />
          </div>

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
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleClearConfirm}>Clear All</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
