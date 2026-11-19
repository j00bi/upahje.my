# ms-notes, `model-terbuka-atau-tertutup-pks-malaysia`

Per-article Malaysian register proof, per `ms-register.md`. Not rendered, not served.

Article: `content/articles/ms/model-terbuka-atau-tertutup-pks-malaysia.md`
English pair: `content/articles/en/open-vs-closed-models-malaysia.md`
Register pass: 2026-11-19.

## Terms and the Malaysian form chosen

| Term | Form used | Basis |
| --- | --- | --- |
| open-weight model | `model terbuka` | Common Malaysian tech usage. Described in the first line as "failnya boleh dimuat turun", so the reader is not left with a metaphor. |
| closed model | `model tertutup` | Paired with the above, used throughout, no synonym rotation. |
| GPU | **GPU** (English) | Term policy rule 2. No BM equivalent in use. `kad grafik` would name a different object. |
| hosting | **hosting** (English) | Term policy rule 2. Also used in `hosting sendiri`, never `pengehosan`. |
| server | **server** (English) | DBP gives `pelayan`; kept `server` per the recorded decision. |
| endpoint | **endpoint** (English) | Term policy rule 2. |
| download | `muat turun` | DBP term, in everyday Malaysian use. |
| parameters | `parameter` | In use in Malaysian technical writing. |
| inference | `inferens` | Established Malaysian spelling; used once, next to `server inferens`. |
| latency | **latency** (English) | Term policy rule 2. `kependaman` exists but no practitioner says it in this context. |
| batching | **batching** (English) | Term policy rule 2. |
| serving | **serving** (English) | Term policy rule 2. Written as `serving model`. |
| licence | `lesen` | Standard Malaysian spelling. |
| deprecation policy | `dasar penghentian` | `dasar`, not `polisi`. Consistent with article one. |
| idle time | `masa terbiar` | Plain BM, no coinage. |

Legal or official terms: none in this article. The licence names (Apache 2.0, MIT) are quoted from the model page rather than translated, because they are proper names of licences.

Which terms are DBP or established Malaysian words: `muat turun`, `lesen`, `dasar`, `parameter`, `inferens`, `masa terbiar`. Which are English borrowings kept under the term policy: `GPU`, `hosting`, `server`, `endpoint`, `serving`, `latency`, `batching`.

DBP URLs: none opened by me this pass. No legal or regulatory term appears here, so the DBP check was not triggered.

## Sentences written fresh rather than translated

1. `Model terbuka bermakna fail model diterbitkan` instead of a direct rendering of "the model files are published, so you can put them on your own machine". The English sentence chain would have been `fail model diterbitkan, jadi anda boleh meletakkannya...`, which is what I used, but the first clause was shortened because BM does not need the "It means that" frame.
2. `Dua perkara yang tidak diberikannya` instead of `Terdapat dua perkara yang tidak diberikan oleh fakta ini`. Dropping the dummy subject is normal BM.
3. `Pada jumlah yang tiada perniagaan kecil capai` instead of a calque of "at a volume that no small business reaches". The relative `yang` does the work.
4. `Kiraannya` opens the method instead of `Aritmetiknya`, which reads translated. `Kiraan` is what a Malaysian writes for a cost calculation.
5. `bukan masa GPU termurah yang ada` replaces a literal "not the cheapest GPU time available", which in BM came out as a noun stack.
6. `sebab sebenar kebanyakan PKS kekal dengan bayaran ikut panggilan` is a restructured sentence: the English "that gap is the real reason most SMEs stay on per-call pricing" becomes a `sebab ... kekal` clause.
7. `dipanggil` and `dipanggil` are used for the API call in both article one and here, so the verb does not change between the pair.

## Register checks applied

- `anda` throughout, never `kita`. No particles.
- `ialah` only where a copula is needed; `ialah` appears twice, both in definition sentences.
- `yang mana` not used at all, including as an interrogative, because no heading needed it.
- No `kalau`; `jika` and `apabila` only.
- No em dashes.
- Money and numbers: `USD 0.10`, `USD 0.50`, `USD 0.15`, `USD 0.60`, `USD 7.94`, `USD 5,796.20`, `730 jam`, `36 juta mesej`, `1.8 juta token`. Decimal point, comma for thousands.

## For the native reader

- `serving model`: kept English because `penyediaan model` means provisioning, which is a different job. If it reads awkward, `menyediakan server inferens` carries the same meaning without the loanword.
- `masa terbiar` for idle time: correct BM, but some readers say `masa menganggur`. Both are understood; I chose the one that reads less like a job-centre term.
- `hosting sendiri`: the alternative `pengehosan sendiri` is a coined noun and was avoided under term policy rule 3.
