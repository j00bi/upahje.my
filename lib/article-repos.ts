/**
 * Repos and SDKs a reader would clone or install to follow an article. Kept out
 * of the article Markdown because the same repo appears in several pieces and a
 * licence note drifts; this file is the one place to correct it.
 */
export type ArticleRepo = { name: string; url: string; note: { en: string; ms: string } }

export const REPOS_BY_KEY: Record<string, ArticleRepo[]> = {
  'using-the-harness': [
    { name: 'DeepSeek Harness', url: 'https://www.npmjs.com/package/@deepseek-ai/dsh', note: { en: 'MIT; the harness the walkthrough was recorded in', ms: 'MIT; harness yang digunakan untuk rakaman ini' } },
  ],
  'harness-api-keys': [
    { name: 'DeepSeek Harness', url: 'https://www.npmjs.com/package/@deepseek-ai/dsh', note: { en: 'MIT; where the key is read from', ms: 'MIT; tempat kunci dibaca' } },
  ],
  'agent-harnesses-ranked': [
    { name: 'DeepSeek Harness', url: 'https://www.npmjs.com/package/@deepseek-ai/dsh', note: { en: 'MIT', ms: 'MIT' } },
    { name: 'OpenCode', url: 'https://github.com/anomalyco/opencode', note: { en: 'MIT; the one open-source CLI in the ranking', ms: 'MIT; satu-satunya CLI sumber terbuka dalam senarai' } },
    { name: 'Codex CLI', url: 'https://github.com/openai/codex', note: { en: 'Apache-2.0', ms: 'Apache-2.0' } },
  ],
  'harness-landscape-open-closed': [
    { name: 'nightly-labs/openbot', url: 'https://github.com/nightly-labs/openbot', note: { en: 'PolyForm Noncommercial 1.0.0; source available, not open source', ms: 'PolyForm Noncommercial 1.0.0; sumber tersedia, bukan sumber terbuka' } },
    { name: 'milind-soni/OpenMausBot', url: 'https://github.com/milind-soni/OpenMausBot', note: { en: 'Apache-2.0', ms: 'Apache-2.0' } },
  ],
  'commandcode-opencode-deepseek-numbers': [
    { name: 'opencode', url: 'https://github.com/anomalyco/opencode', note: { en: 'MIT', ms: 'MIT' } },
    { name: 'command-code', url: 'https://www.npmjs.com/package/command-code', note: { en: 'published on npm with no licence field', ms: 'diterbitkan di npm tanpa medan lesen' } },
  ],
}
