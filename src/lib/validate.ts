import type { ValidationResult } from '../types';
import { extractVideoId } from './youtube';

export function validateYouTubeUrl(url: string): ValidationResult {
  if (!url || !url.trim()) {
    return { valid: false, error: 'Please enter a YouTube URL.' };
  }
  if (extractVideoId(url) === null) {
    return {
      valid: false,
      error: 'Please enter a valid YouTube URL (youtube.com or youtu.be).',
    };
  }
  return { valid: true, error: null };
}

export function validateNoteTitle(title: string): ValidationResult {
  if (!title || !title.trim()) {
    return { valid: false, error: 'Title is required.' };
  }
  return { valid: true, error: null };
}
