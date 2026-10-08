/**
 * NatureQuest Comprehensive Security Module
 * Addresses OWASP Top 10 & App Security Checklist:
 * - File Upload Validation (Magic bytes signature verification, MIME whitelist, size boundaries, traversal defense)
 * - XSS Defenses (Tag stripping, protocol sanitization)
 * - Rate Limiting (Token/sliding-window protection against API flooding)
 * - URL & URI Scheme Sanitization (prevents javascript: / data:html injection)
 */

// Permitted image MIME types and extensions
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB
const MIN_FILE_SIZE_BYTES = 100; // 100 bytes minimum

/**
 * Verify true file header magic bytes asynchronously to prevent disguised executables/scripts
 * @param {File|Blob} file 
 * @returns {Promise<boolean>}
 */
export async function verifyImageMagicBytes(file) {
  if (!file || typeof file.slice !== 'function') return false;

  try {
    const slice = file.slice(0, 12);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // JPEG signature: FF D8 FF
    if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
      return true;
    }

    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (
      bytes[0] === 0x89 && bytes[1] === 0x50 &&
      bytes[2] === 0x4E && bytes[3] === 0x47 &&
      bytes[4] === 0x0D && bytes[5] === 0x0A &&
      bytes[6] === 0x1A && bytes[7] === 0x0A
    ) {
      return true;
    }

    // WebP signature: RIFF (52 49 46 46) ... WEBP (57 45 42 50)
    if (
      bytes[0] === 0x52 && bytes[1] === 0x49 &&
      bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 &&
      bytes[10] === 0x42 && bytes[11] === 0x50
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Validates uploaded image file against size, MIME, extension, and magic bytes
 * @param {File} file
 * @returns {Promise<{ valid: boolean, error?: string, sanitizedFileName?: string }>}
 */
export async function validateUploadedImage(file) {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  // 1. Size bounds check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds 8MB maximum limit.' };
  }
  if (file.size < MIN_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File is too small or corrupt.' };
  }

  // 2. MIME Whitelist
  const mimeType = (file.type || '').toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return { 
      valid: false, 
      error: `Unsupported file type (${mimeType || 'unknown'}). Allowed: JPG, PNG, WEBP.` 
    };
  }

  // 3. Extension Whitelist & Path Traversal Neutralization
  const rawName = file.name || 'capture.jpg';
  // Strip null bytes and directory traversal symbols
  const cleanName = rawName.replace(/[\0\\/]/g, '').replace(/\.\.+/g, '.');
  const extension = cleanName.split('.').pop()?.toLowerCase();
  if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
    return { valid: false, error: 'Invalid file extension. Allowed: .jpg, .jpeg, .png, .webp.' };
  }

  // 4. Deep Inspection via Magic Bytes
  const magicBytesValid = await verifyImageMagicBytes(file);
  if (!magicBytesValid) {
    return { 
      valid: false, 
      error: 'File signature does not match expected image format (tampered or corrupted file).' 
    };
  }

  return { valid: true, sanitizedFileName: cleanName };
}

/**
 * Sanitizes URLs to prevent javascript: and data: pseudo-protocol XSS
 * @param {string} url 
 * @returns {string} Safe URL or fallback
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  // Disallow dangerous URI schemes
  if (/^(javascript|vbscript|data:(?!image\/)):/i.test(trimmed)) {
    return '#';
  }
  return trimmed;
}

/**
 * Strips dangerous HTML elements and scripts from untrusted input
 * @param {string} input 
 * @returns {string} Sanitized string
 */
export function sanitizeInputString(input) {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * In-memory client-side sliding window rate limiter
 * Protects against rapid repeated calls / inference exhaustion
 */
export function createRateLimiter(maxCalls = 3, windowMs = 5000) {
  const timestamps = [];

  return function isAllowed() {
    const now = Date.now();
    // Purge expired calls
    while (timestamps.length > 0 && timestamps[0] <= now - windowMs) {
      timestamps.shift();
    }

    if (timestamps.length >= maxCalls) {
      return false;
    }

    timestamps.push(now);
    return true;
  };
}
