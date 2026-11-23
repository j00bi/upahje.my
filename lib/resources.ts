/**
 * The library: repos, SDKs and price pages the articles cite, with the evidence
 * level attached. `tested` means a command ran on this machine and the output is
 * quoted somewhere on the site; `read` means a page was opened and dated;
 * `installed` means the binary is present but the work did not run.
 */
export type Evidence = 'tested' | 'read' | 'installed'

export type ResourceEntry = {
  name: string
  what: { en: string; ms: string }
  url: string
  repo?: string
  licence?: string
  evidence: Evidence
  checked: string
}

export type ResourceGroup = {
  id: string
  title: { en: string; ms: string }
  note: { en: string; ms: string }
  entries: ResourceEntry[]
}

const CHECKED = '2026-11-23'

export const RESOURCES: ResourceGroup[] = [
  {
    id: 'harnesses',
    title: { en: 'Harnesses and coding CLIs', ms: 'Harness dan CLI pengekodan' },
    note: {
      en: 'The programs that run the agent loop. Only DeepSeek Harness was run here; the others were installed or read.',
      ms: 'Program yang menjalankan gelung agent. Hanya DeepSeek Harness dijalankan di sini; yang lain dipasang atau dibaca.',
    },
    entries: [
      {
        name: 'DeepSeek Harness',
        what: { en: 'The harness behind this site; 0.2.2-rc.1 was the version run here.', ms: 'Harness di sebalik laman ini; 0.2.2-rc.1 ialah versi yang dijalankan di sini.' },
        url: 'https://www.npmjs.com/package/@deepseek-ai/dsh',
        licence: 'MIT',
        evidence: 'tested',
        checked: CHECKED,
      },
      {
        name: 'Claude Code',
        what: { en: 'Anthropic agent CLI; its Agent SDK docs define "hosted agent harness".', ms: 'CLI agent Anthropic; dokumen Agent SDK-nya mentakrifkan "hosted agent harness".' },
        url: 'https://code.claude.com/docs/en/agent-sdk/overview',
        evidence: 'read',
        checked: CHECKED,
      },
      {
        name: 'Codex CLI',
        what: { en: 'OpenAI coding CLI, installed on this machine.', ms: 'CLI pengekodan OpenAI, dipasang pada mesin ini.' },
        url: 'https://github.com/openai/codex',
        repo: 'https://github.com/openai/codex',
        licence: 'Apache-2.0',
        evidence: 'installed',
        checked: CHECKED,
      },
      {
        name: 'OpenCode',
        what: { en: 'Free coding agent, MIT, provider-agnostic.', ms: 'Agent pengekodan percuma, MIT, bebas pembekal.' },
        url: 'https://opencode.ai/',
        repo: 'https://github.com/anomalyco/opencode',
        licence: 'MIT',
        evidence: 'installed',
        checked: CHECKED,
      },
      {
        name: 'CommandCode',
        what: { en: 'Paid coding CLI; the npm package ships with no licence field.', ms: 'CLI pengekodan berbayar; pakej npm tiada medan lesen.' },
        url: 'https://commandcode.ai/',
        repo: 'https://www.npmjs.com/package/command-code',
        licence: 'UNLICENSED as published on npm',
        evidence: 'installed',
        checked: CHECKED,
      },
    ],
  },
  {
    id: 'vendors',
    title: { en: 'Model and API vendors', ms: 'Vendor model dan API' },
    note: {
      en: 'The price pages every cost figure on the site comes from. Read, dated, never converted silently.',
      ms: 'Halaman harga yang menjadi asal setiap angka kos di laman ini. Dibaca, bertarikh, tidak ditukar secara senyap.',
    },
    entries: [
      { name: 'DeepSeek API pricing', what: { en: 'Per-million-token rates, off-peak and peak.', ms: 'Kadar per juta token, luar puncak dan puncak.' }, url: 'https://api-docs.deepseek.com/quick_start/pricing', evidence: 'read', checked: CHECKED },
      { name: 'Anthropic Claude pricing', what: { en: 'Claude API and plan prices, including the Haiku prompt-length qualifier.', ms: 'Harga API dan pelan Claude, termasuk syarat panjang prompt Haiku.' }, url: 'https://docs.claude.com/en/docs/about-claude/pricing', evidence: 'read', checked: CHECKED },
      { name: 'OpenAI API pricing', what: { en: 'per-million-token rates, short and long context.', ms: 'Kadar per juta token, konteks pendek dan panjang.' }, url: 'https://developers.openai.com/api/docs/pricing', evidence: 'read', checked: CHECKED },
      { name: 'Google AI Studio pricing', what: { en: 'Gemini rates, including the price change dated 1 December 2026.', ms: 'Kadar Gemini, termasuk perubahan harga bertarikh 1 Disember 2026.' }, url: 'https://aistudio.google.com/docs/pricing', evidence: 'read', checked: CHECKED },
      { name: 'xAI pricing', what: { en: 'Grok model and API prices.', ms: 'Harga model dan API Grok.' }, url: 'https://docs.x.ai/docs/pricing', evidence: 'read', checked: CHECKED },
    ],
  },
  {
    id: 'malaysia',
    title: { en: 'Malaysian sources', ms: 'Sumber Malaysia' },
    note: {
      en: 'Government and platform documentation for the local pieces, including the ones that would not load.',
      ms: 'Dokumentasi kerajaan dan platform untuk artikel tempatan, termasuk yang tidak dapat dimuatkan.',
    },
    entries: [
      { name: 'MyInvois SDK', what: { en: 'LHDN developer documentation: APIs, validators, sandbox.', ms: 'Dokumentasi pembangun LHDN: API, pengesah, sandbox.' }, url: 'https://sdk.myinvois.hasil.gov.my/', evidence: 'read', checked: CHECKED },
      { name: 'MyInvois SDK FAQ', what: { en: 'Source of the sandbox claim and the production-portal limit.', ms: 'Sumber dakwaan sandbox dan had portal pengeluaran.' }, url: 'https://sdk.myinvois.hasil.gov.my/faq/', evidence: 'read', checked: CHECKED },
      { name: 'LHDN e-Invoice timeline', what: { en: 'The phase dates and the exemption, updated 30 August 2026.', ms: 'Tarikh fasa dan pengecualian, dikemas kini 30 Ogos 2026.' }, url: 'https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/', evidence: 'read', checked: CHECKED },
      { name: 'Bank Negara exchange rate API', what: { en: 'The USD/MYR middle rate every conversion uses.', ms: 'Kadar tengah USD/MYR yang digunakan setiap penukaran.' }, url: 'https://api.bnm.gov.my/public/exchange-rate', evidence: 'read', checked: CHECKED },
      { name: 'WhatsApp Business Platform pricing', what: { en: 'Per-message rates for Malaysia, published in MYR.', ms: 'Kadar setiap mesej untuk Malaysia, diterbitkan dalam MYR.' }, url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing', evidence: 'read', checked: CHECKED },
      { name: 'freelancing.my', what: { en: 'The only Malaysian freelance platform whose public listings could be read.', ms: 'Satu-satunya platform freelance Malaysia yang senarai awamnya boleh dibaca.' }, url: 'https://freelancing.my/', evidence: 'read', checked: CHECKED },
    ],
  },
  {
    id: 'publishers',
    title: { en: 'Malaysian price lists we quote', ms: 'Senarai harga Malaysia yang kami petik' },
    note: {
      en: 'Published rates only. A page with no price is not listed here.',
      ms: 'Kadar yang diterbitkan sahaja. Halaman tanpa harga tidak disenaraikan.',
    },
    entries: [
      { name: 'KodeSME', what: { en: 'Workflow automation builds and retainers.', ms: 'Pembinaan automasi aliran kerja dan retainer.' }, url: 'https://kodesme.klyihao.com/', evidence: 'read', checked: CHECKED },
      { name: 'Nixlab Studio', what: { en: 'Automation tiers, setup and retainer.', ms: 'Tahap automasi, persediaan dan retainer.' }, url: 'https://nixlab.my/', evidence: 'read', checked: CHECKED },
      { name: 'Pang Jun Han', what: { en: 'Session and process-build rates.', ms: 'Kadar sesi dan pembinaan proses.' }, url: 'https://pangjunhan.vercel.app/ai-automation', evidence: 'read', checked: CHECKED },
      { name: 'Autoflow Solutions', what: { en: 'Lead handling and AI task execution.', ms: 'Pengendalian lead dan pelaksanaan tugasan AI.' }, url: 'https://www.autoflow-solutions.com/my/services', evidence: 'read', checked: CHECKED },
      { name: 'BlueAura Technology', what: { en: 'AutoGo platform tiers, priced per month.', ms: 'Tahap platform AutoGo, harga bulanan.' }, url: 'https://blueaura.com.my/', evidence: 'read', checked: CHECKED },
    ],
  },
]

export const evidenceLabel = {
  tested: { en: 'Run here', ms: 'Dijalankan di sini' },
  read: { en: 'Read', ms: 'Dibaca' },
  installed: { en: 'Installed, not run', ms: 'Dipasang, tidak dijalankan' },
} as const
