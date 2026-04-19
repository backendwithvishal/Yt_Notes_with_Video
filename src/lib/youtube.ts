/**
 * Extracts an 11-character YouTube video ID from any recognized URL format:
 * - youtube.com/watch?v=ID
 * - youtu.be/ID
 * - youtube.com/embed/ID
 * Returns null if no valid ID is found.
 */
export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  const pattern =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

  const match = url.match(pattern);
  return match ? match[1] : null;
}

/**
 * Reconstructs a canonical youtube.com/watch?v= URL from a video ID.
 */
export function reconstructCanonicalUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Returns true if the URL is a recognizable YouTube URL (any format).
 */
export function isYouTubeUrl(url: string): boolean {
  return extractVideoId(url) !== null;
}
