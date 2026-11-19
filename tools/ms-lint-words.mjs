/**
 * Malay register lint word list.
 *
 * These are Indonesian-leaning forms that Malaysian copy should not use. Grow
 * this list, not the checker. `suggest` is the Malaysian replacement shown in
 * the error. `pattern` overrides the default word-boundary regex when the word
 * needs context (proper nouns, phrases).
 */
export const MS_LINT_WORDS = [
  { word: 'bisa', suggest: 'boleh' },
  { word: 'uang', suggest: 'wang' },
  { word: 'gratis', suggest: 'percuma' },
  { word: 'kantor', suggest: 'pejabat' },
  { word: 'perusahaan', suggest: 'syarikat' },
  { word: 'manajemen', suggest: 'pengurusan' },
  { word: 'karyawan', suggest: 'pekerja' },
  { word: 'daring', suggest: 'dalam talian' },
  { word: 'luring', suggest: 'luar talian' },
  { word: 'unduh', suggest: 'muat turun' },
  { word: 'unggah', suggest: 'muat naik' },
  { word: 'ponsel', suggest: 'telefon bimbit' },
  {
    word: 'gawai',
    suggest: 'peranti',
    // "Gawai" is also the Dayak harvest festival; only device usage is flagged.
    pattern: /(?<!\b(?:hari|pesta|festival)\s+)\bgawai\b/gi,
  },
  { word: 'izin', suggest: 'kebenaran' },
  { word: 'karena', suggest: 'kerana' },
  { word: 'aktifitas', suggest: 'aktiviti' },
  { word: 'kualitas', suggest: 'kualiti' },
  { word: 'universitas', suggest: 'universiti' },
  { word: 'realitas', suggest: 'realiti' },
  { word: 'manapun', suggest: 'mana-mana' },
  { word: 'kapanpun', suggest: 'bila-bila masa' },
  { word: 'siapapun', suggest: 'sesiapa' },
  { word: 'yang mana', suggest: 'yang', pattern: /\byang\s+mana\b/gi },
  {
    word: 'adalah merupakan',
    suggest: 'adalah, atau merupakan (not both)',
    pattern: /\badalah\s+merupakan\b/gi,
  },
]

/** Inline escape: a line carrying this marker is not linted. */
export const MS_LINT_ALLOW = '<!-- ms-lint: allow -->'
