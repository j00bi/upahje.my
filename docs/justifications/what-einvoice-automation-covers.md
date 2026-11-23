# Justification: what-einvoice-automation-covers

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "The bands below are LHDN's own, from a timeline page that states its update date as 30 August 2026." | https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/ | LHDN | 2026-11-23 | source: timeline page, update date printed on the page |
| 2 | "more than RM100 million" | https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/ | LHDN | 2026-11-23 | source: Table 1 row 1; phase 1 started 1 August 2024, in force |
| 3 | "more than RM25 million up to RM100 million" | https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/ | LHDN | 2026-11-23 | source: Table 1 row 2; phase 2 started 1 January 2025, in force |
| 4 | "more than RM5 million up to RM25 million" | https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/ | LHDN | 2026-11-23 | source: Table 1 row 3; phase 3 started 1 July 2025, in force |
| 5 | "up to RM5 million" | https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/ | LHDN | 2026-11-23 | source: Table 1 row 4; phase 4 started 1 January 2026, in force |
| 6 | "less than RM3 million" | https://www.hasil.gov.my/e-invois/pelaksanaan-e-invois-di-malaysia/garis-masa-pelaksanaan-e-invois/ | LHDN | 2026-11-23 | source: Table 1 exemption line |
| 7 | "The exemption stops below RM3 million and phase 4 runs up to RM5 million, so a business turning over RM4 million is in scope." | - | - | - | estimate: our reading of the two printed lines together, not a new rule |
| 8 | "Eight validators run on every submission, and they are the reason a machine does this better than a person retyping: structure, core fields, signature, taxpayer validity, referenced documents, codes, duplicates and currency." | https://sdk.myinvois.hasil.gov.my/document-validation-rules/ | MyInvois SDK (LHDN) | 2026-11-23 | source: Table 3 validator row, eight named validators |
| 9 | "A buyer may request rejection within 72 hours of validation, and a seller may cancel within the same window." | https://www.hasil.gov.my/e-invois/ | LHDN | 2026-11-23 | source: guideline §2.3.6 as recorded in Table 3, 72-hour rule |
| 10 | "After 72 hours, cancellation is not allowed, and a correction requires a new e-Invoice in the form of a credit, debit or refund note." | https://www.hasil.gov.my/e-invois/ | LHDN | 2026-11-23 | source: same rule row |
| 11 | "The guidelines cite Section 120 of the Income Tax Act 1967, and they do not print a penalty figure on any page that could be read." | https://www.hasil.gov.my/e-invois/ | LHDN | 2026-11-23 | source: guideline §16.3 and Table 5, penalty amount not published |
| 12 | "the voluntary disclosure programme, PKPS (Program Pengesahan Sukarela, a window for taxpayers who missed their start date to come forward), runs from **7 July 2026 to 31 December 2027** for taxpayers who missed their mandatory start date" | https://www.hasil.gov.my/e-invois/ | LHDN | 2026-11-23 | source: Table 4 PKPS row, §17.1 |
| 13 | "LHDN states it will not prosecute under Section 120 during that period provided the conditions are met" | https://www.hasil.gov.my/e-invois/ | LHDN | 2026-11-23 | source: Table 4, no-prosecution row, §16.3 |
| 14 | "The MyInvois Portal itself could not be read: a connection timeout, then only the page title, because it is a client-side application." | - | our measurement, this machine | 2026-11-23 | source: two fetch attempts recorded on 23 November 2026 |
| 15 | "TIN is the taxpayer identification number LHDN issues to a business; the API is the connection your software uses to hand a document to MyInvois without anyone retyping it." | https://sdk.myinvois.hasil.gov.my/ | MyInvois SDK (LHDN) | 2026-11-23 | source: TIN validation API and the API integration description on the SDK site |
| 16 | "No per-submission fee appears on any LHDN page read for this article" | https://sdk.myinvois.hasil.gov.my/ | MyInvois SDK (LHDN) | 2026-11-23 | estimate: no per-submission fee printed on the SDK pages read; absence noted rather than assumed |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| Who has to file, and since when? | The phase table and the RM3m to RM5m gap, which is the trap a reader would otherwise fall into |
| What is actually submitted? | The document types and the two routes, so a buyer knows which one they are buying |
| What can be automated? | The capability table, split by what a machine may decide and what it may not |
| What does the 72-hour window change? | The clock, which decides whether a fix is a cancel or a note |
| What happens if you get it wrong? | The gap on penalties and the two dated reliefs |
| What could we not verify? | Portal, FAQ, per-phase relaxation dates, guideline version |
| What to do this week? | Five actions an owner can take with no purchase |
| Try it yourself | The MyInvois sandbox, its cost, and the validator that bites |
| FAQ | The RM4m case, intermediaries, human need, and invoices from before the start date |
| Sources | The four URLs read, each dated |
