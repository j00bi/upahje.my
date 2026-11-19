/**
 * Typographic cleaning for rendered copy.
 *
 * The presentation layer normalises em and en dashes to hyphens: the house rule
 * is zero em dashes on a page we want quoted, and the content files are owned by
 * the publishing desk, so normalisation happens here rather than in the copy.
 */
export function cleanText(value: string): string {
  return value.replace(/\s*—\s*/g, ' - ').replace(/\s*–\s*/g, '-')
}
