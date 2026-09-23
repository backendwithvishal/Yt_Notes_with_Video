import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FileDown, Trash2, Loader2, Sparkles, BookOpen } from 'lucide-react';
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
import SpotlightGlow from '../components/ui/SpotlightGlow';

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
      <main
        className="flex-1 flex flex-col px-3 sm:px-5 lg:px-6 py-4 gap-3.5 max-w-7xl mx-auto w-full min-h-0 relative"
      >
        <SpotlightGlow showBlobs={false} />

        {/* ── Action Bar ── */}
        <div className="flex items-center justify-between gap-3 flex-wrap shrink-0 pb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
              style={{ background: 'var(--signature-gradient)' }}
            >
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                Active Study Workspace
              </h1>
              <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {notes.length} timestamped note{notes.length !== 1 ? 's' : ''} saved locally
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearDialog(true)}
              disabled={notes.length === 0}
              className="gap-1.5 h-9 px-3.5 text-xs font-medium rounded-xl transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Notes
            </Button>
            <Button
              size="sm"
              onClick={handleExportPDF}
              disabled={isExporting || notes.length === 0}
              className="gap-1.5 h-9 px-4 text-xs font-semibold rounded-xl text-white shadow-md transition-all hover:scale-105"
              style={{ background: 'var(--signature-gradient)' }}
            >
              {isExporting
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                : <FileDown className="w-3.5 h-3.5" />}
              {isExporting ? 'Exporting PDF…' : 'Export PDF Guide'}
            </Button>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0 relative z-10">

          {/* Video column */}
          <div className={theatreMode ? 'w-full' : 'w-full md:w-3/5 shrink-0 flex flex-col'}>
            <VideoPlayer onTheatreToggle={setTheatreMode} />
          </div>

          {/* Notes column */}
          {!theatreMode && (
            <div
              className="w-full md:w-2/5 flex flex-col min-h-0 max-h-[calc(100vh-140px)]"
            >
              <NotesPanel />
            </div>
          )}

        </div>
      </main>

      {/* ── Clear confirmation dialog ── */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            color: 'var(--text-primary)',
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-display">Clear all notes?</DialogTitle>
            <DialogDescription style={{ color: 'var(--text-secondary)' }}>
              All {notes.length} note{notes.length !== 1 ? 's' : ''} from this session will be permanently deleted from local storage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowClearDialog(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleClearConfirm}>Clear All Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
