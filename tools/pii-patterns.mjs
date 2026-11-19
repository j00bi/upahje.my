/**
 * PII / secret patterns for `articles:check`.
 *
 * One list so it can grow without touching the checker. `fix` is the instruction
 * printed with the hit. Matches are always redacted before printing: the first
 * six characters and an ellipsis, never the full value.
 */
export const PII_PATTERNS = [
  { category: 'personal-path', pattern: /\/home\/[\w.-]+/g, fix: 'remove the absolute path; refer to the file without a home directory' },
  { category: 'personal-path', pattern: /\/Users\/[\w.-]+/g, fix: 'remove the absolute path; use a relative or documented path' },
  { category: 'personal-path', pattern: /C:\\\\Users\\\\[\w.-]+/gi, fix: 'remove the Windows user path' },
  { category: 'workspace-path', pattern: /[\w./-]*home-[\w.-]+/g, fix: 'do not publish workspace or session directory names' },
  { category: 'uuid', pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi, fix: 'replace the identifier with a placeholder' },
  { category: 'email', pattern: /[a-z0-9._%+-]+@(?:gmail|yahoo)\.[a-z.]{2,}/gi, fix: 'remove or placeholder the address' },
  { category: 'email', pattern: /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi, fix: 'remove or placeholder the address' },
  { category: 'phone', pattern: /\+60[\d\s-]{7,}/g, fix: 'remove or placeholder the phone number' },
  { category: 'api-key', pattern: /\bsk-[A-Za-z0-9_-]{8,}/g, fix: 'never publish a key; reference the env var name instead' },
  { category: 'jwt', pattern: /\beyJ[A-Za-z0-9_-]{10,}/g, fix: 'never publish a token; reference the secret name instead' },
  { category: 'api-key', pattern: /\bgho_[A-Za-z0-9_]{8,}/g, fix: 'never publish a token' },
  { category: 'api-key', pattern: /\buser_[A-Za-z0-9_]{8,}/g, fix: 'never publish a token' },
  { category: 'local-host', pattern: /\b127\.0\.0\.1\b/g, fix: 'use the public hostname or a placeholder' },
  { category: 'local-host', pattern: /\blocalhost:\d+\b/g, fix: 'use the public hostname or a placeholder' },
  { category: 'private-host', pattern: /\btailscale\b/gi, fix: 'remove the private network name' },
  { category: 'private-host', pattern: /\b[\w.-]+\.ts\.net\b/gi, fix: 'remove the private hostname' },
  { category: 'preview-host', pattern: /\b[\w.-]+\.vercel\.app\b/gi, fix: 'link the canonical domain, not a preview host' },
]
