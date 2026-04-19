import { toast } from 'sonner';
import type { Note } from '../types';
import { formatTimestamp } from './utils';

const PAGE_WIDTH = 190; // usable mm width (A4 = 210, 10mm margins each side)
const PAGE_HEIGHT = 297; // A4 height in mm
const MARGIN = 10;
const SAFE_BOTTOM = PAGE_HEIGHT - MARGIN - 20; // leave 20mm at bottom

export async function generatePDF(notes: Note[]): Promise<void> {
  if (!notes.length) {
    toast.info('No notes to export.');
    return;
  }

  let jsPDFModule: typeof import('jspdf');
  try {
    jsPDFModule = await import('jspdf');
  } catch {
    toast.error('Failed to load PDF library. Please try again.');
    return;
  }

  const { jsPDF } = jsPDFModule;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  let page = 1;
  let y = MARGIN;

  const addHeader = () => {
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('YtEduNotes — YouTube Notes Export', MARGIN, y);
    doc.text(`Page ${page}`, PAGE_WIDTH + MARGIN - 10, y, { align: 'right' });
    y += 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(MARGIN, y, PAGE_WIDTH + MARGIN, y);
    y += 6;
    doc.setTextColor(0, 0, 0);
  };

  const addPage = () => {
    doc.addPage();
    page++;
    y = MARGIN;
    addHeader();
  };

  // Title page header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('YouTube Notes', MARGIN, y);
  y += 10;
  addHeader();

  notes.forEach((note, index) => {
    // Estimate height needed for this note
    const descLines = doc.splitTextToSize(note.description || '-', PAGE_WIDTH);
    const estimatedHeight = 8 + 6 + 6 * descLines.length + 6;

    if (y + estimatedHeight > SAFE_BOTTOM) {
      addPage();
    }

    // Note number + title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${note.title || 'Untitled'}`, MARGIN, y);
    y += 7;

    // Timestamp
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 200);
    doc.text(`⏱ ${formatTimestamp(note.timestamp)}`, MARGIN, y);
    y += 6;

    // Description
    doc.setTextColor(40, 40, 40);
    const lines: string[] = doc.splitTextToSize(note.description || '-', PAGE_WIDTH);
    lines.forEach((line: string) => {
      if (y > SAFE_BOTTOM) addPage();
      doc.text(line, MARGIN, y);
      y += 6;
    });

    y += 4; // gap between notes
  });

  doc.save('yt-notes.pdf');
  toast.success('PDF exported successfully.');
}
