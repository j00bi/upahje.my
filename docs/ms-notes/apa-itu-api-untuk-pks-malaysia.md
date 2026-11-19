# ms-notes, `apa-itu-api-untuk-pks-malaysia`

Per-article Malaysian register proof, per `ms-register.md`. Not rendered, not served. Kept next to the article it describes.

Article: `content/articles/ms/apa-itu-api-untuk-pks-malaysia.md`
English pair: `content/articles/en/what-is-an-api-for-malaysian-sme.md`
Register pass: 2026-11-19.

## Terms and the Malaysian form chosen

| Term | Form used | Basis |
| --- | --- | --- |
| API | API | Common Malaysian usage. No coinage in use. |
| server | **server** (English) | DBP gives `pelayan`. Malaysian practitioners say `server`; `pelayan` reads as a textbook and is also ambiguous with waiter. Kept `server` per the register rule and the decision recorded here. |
| download | `muat turun` | DBP term, in everyday Malaysian use. |
| upload | not used in this article | n/a |
| authentication | `pengesahan` | DBP term for authentication. Caveat below: `pengesahan` also covers "verification", so the sentence is written to disambiguate ("cara pengesahan berfungsi"). |
| API key | `kunci API` | Common Malaysian usage. |
| credentials | **credentials** (English) | Term policy rule 2 and 3: hard to translate, no DBP coinage in use. Earlier drafts said `kredensial`; replaced under the policy. |
| to host / hosting | **hosting** (English) | Term policy rule 2. No coined verb. The noun also replaces the earlier `hos` / `kos hos`. Alternative if a verb is needed: `mengendalikan server sendiri`. |
| model weights | **model weights** (English) | Term policy rule 2. Earlier drafts said `pemberat model`; defensible but a reach, so the loanword stands. |
| deprecation policy | `dasar penghentian` | `dasar` for policy. The earlier draft said `polisi`, which is the Indonesian form and has been removed. |
| benchmark | `penanda aras` | Malaysian government and business usage. |
| endpoint | `endpoint` | Loanword kept; no Malaysian coinage in current use. |
| order, courier, payment gateway, inventory, accounting | `pesanan`, `kurier`, `gerbang pembayaran`, `inventori`, `perakaunan` | Common Malaysian business usage. |

Which terms are which: `muat turun`, `pengesahan`, `dasar`, `penanda aras`, `pesanan`, `kurier`, `gerbang pembayaran`, `inventori`, `perakaunan` are DBP or established Malaysian words and stay. `API`, `server`, `endpoint`, `hosting`, `credentials`, `model weights` are English borrowings kept under the term policy, because the BM alternative is a phrase no Malaysian says.

DBP URLs for this article: none opened by me during this pass. The reference list in `ms-register.md` was checked by Chief on 2026-11-19, and I relied on it rather than re-opening PRPM, Istilah Semasa, Kamus DBP or Sah Bahasa. Where a term above says "common Malaysian usage", it was not verified against DBP today and the native reader should confirm it.

## Sentences rewritten because a direct translation read Indonesian

1. `bezanya begini: sama ada staf menaip ...` became `beza utamanya jelas: staf menaip ...`. The `sama ada ... atau` frame was calqued from "whether ... or"; Malaysian prose states the two cases directly.
2. `API membawa satu maklumat ...` became `API menyampaikan satu maklumat ...`. `membawa` (carries) is the literal English verb; `menyampaikan` is what a Malaysian would write for data being passed.
3. The four bullets were written as trailing negations (`..., bukan staf salin pesanan ...`). Rewritten as cause after effect: `Staf tidak lagi menyalin ... kerana laman anda ...`. The `bukan` tail is an English construction and it also left the verb elliptical.
4. `Bayar ikut panggilan tidak kos apa-apa bila penggunaan sifar` became `Bayaran ikut panggilan tidak dikenakan apabila tiada penggunaan`. `tidak kos apa-apa` is not grammatical BM, and `penggunaan sifar` is a calque of "zero usage".
5. `mengalahkan kos mesin` became `melebihi kos mesin`. `mengalahkan` was a calque of "beat the cost".
6. `Sebut harga berubah ikut berapa banyak endpoint` became `bergantung pada bilangan endpoint`. `ikut berapa banyak` is spoken shorthand.
7. `betapa bersepah data sedia ada anda` became `betapa bersepahnya data sedia ada anda`. Missing `-nya` after `betapa`.
8. The exchange-rate sentence was one long clause chain. Split into `Jika integrasi berjalan pada server anda sendiri, tambah kos hos.` and `Kadar tukaran mata wang yang dikenakan oleh kad anda juga tidak termasuk dalam angka ini.`
9. `Bawah daripada itu, seorang staf ...` became `Jika kurang daripada itu, ...`. `Bawah daripada itu` is a calque of "below that".
10. `satu pesanan yang terlepas kosnya melebihi yuran` became `kerugian akibat satu pesanan yang terlepas melebihi yuran`. The old phrasing made the order itself cost money.
11. `dipautkan dari halaman harga` became `dipautkan pada halaman harga`, and `supaya boleh dihalakan ke pembekal lain` became `supaya mudah ditukar kepada pembekal lain`. `dihalakan` was "pointed at" in English.
12. `Tiada set data awam untuk tempoh di Malaysia` became `Tiada data awam tentang tempoh di Malaysia`. `set data` is a calque of "dataset".
13. Headings: `Macam mana` became `Bagaimana`, `nak` removed, `Apa jadi kalau` became `Apa yang berlaku jika`, `Selamat ke` became `Adakah selamat`, `guna` became `menggunakan`. `ke` as a question particle and `nak` as a modal are speech, not article prose.
14. `polisi penghentian` became `dasar penghentian`. `polisi` is Indonesian; Malaysian is `dasar`.
15. `seseorang buka aplikasi bank` became `seseorang membuka aplikasi bank`. Dropped prefix in a written sentence.
16. `yang kedua-dua pihak sudah persetujui` became `yang telah dipersetujui oleh kedua-dua pihak`. The register reference prefers `telah` over `sudah` in written prose, and the passive is the natural BM shape here.
17. `pelayan` was replaced with `server` in all six places it appeared, including the FAQ question.

## Register checks applied

- `anda` throughout, never `kita`. No `lah`, `kan`, `pun` in prose.
- `ialah` used where a copula is genuinely needed, and nowhere twice in a sentence. No `adalah merupakan`.
- `yang mana` appears only as the interrogative in `Patut mula dengan yang mana satu?`, never as a relative pronoun.
- No em dashes. Colon, comma or full stop instead.
- No `kalau`; `jika` and `apabila` throughout.
- Number and currency formatting untouched: `USD 0.10`, `USD 0.50`, `USD 0.48`, `3,000 mesej`, `600 token`, `200 token`.

## For the native reader

- `credentials`, `hosting`, `model weights`: settled by the user's term policy as English borrowings. Flagging only so a reader knows it was a decision, not an oversight.
- `pengesahan` for authentication: correct per DBP, but a reader may hear "verification". If it reads wrong, `pengesahan identiti` is the narrower alternative.
- `bersepah` and `salin-menyalin` are deliberately colloquial Malaysian. If the house style wants a plainer written register, `tidak teratur` and `kerja menyalin` are the replacements, at some cost in directness.
- `menelan` (for a cost eating into a budget) is figurative but standard in Malaysian business writing. Flagging it rather than changing it.

No term in this article is legal or regulatory, so no DBP ruling is claimed. Each term above is marked with its basis: a DBP or established Malaysian form where one is in use, and 'common Malaysian usage, no DBP coinage in use' where the English loanword was kept under the term policy.
