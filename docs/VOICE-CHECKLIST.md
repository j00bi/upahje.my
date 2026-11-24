# Voice checklist

What a piece has to pass before I call it ready. Derived from `VOICE-BRIEF.md`; the rule numbers are the brief's own headings where they exist. This list is literal on purpose: a draft either shows the thing or it does not.

## 1. The opening

- [ ] The first two sentences carry a concrete claim and a number.
- [ ] The number is one the reader already pays, not an abstraction.
- [ ] No throat-clearing, no "in today's", no definition before the claim.
- [ ] No process narration anywhere in the first paragraph.

## 2. Headings

- [ ] Every H2 is a statement, not a question. Grep the file for `?` and expect zero hits outside quoted speech.
- [ ] Each heading states the claim its section proves, so a reader skimming the H2s gets the argument.
- [ ] One H1, and it is the title.

## 3. Length and shape

- [ ] Body is 600 to 900 words, counted without frontmatter.
- [ ] One idea. If a second thesis appears, it is a second article.
- [ ] Exactly one table, and its cells hold numbers or names, not adjectives.
- [ ] The ending is the last concrete point. No recap, no kicker metaphor, no "the real lesson is".

## 4. Stance

- [ ] One opinion, stated plainly, in the reader's interest, marked as this publication's view.
- [ ] The opinion names what it costs the reader to ignore it.
- [ ] No invented anecdote, client, name or figure. First person only where I actually read or ran the thing.

## 5. Evidence

- [ ] Every number has a source and a `checked` date in `sources[]`.
- [ ] Platform rules that decide the answer are quoted verbatim, not paraphrased.
- [ ] A figure that does not exist is named as missing in two sentences at most, with no padding and no substitute number.
- [ ] Vendor pages are cited as vendor pages, never as independent evidence.
- [ ] Nothing in the prose says when it was read or how it was found. Provenance lives in `sources[]` only.

## 6. Banned in the prose

- [ ] No binary contrast ("not X, but Y").
- [ ] No colon reveal ("The detail that matters: …").
- [ ] No faux insight ("what most people miss").
- [ ] No importance puffery ("crucial", "essential", "game-changing").
- [ ] No empty adverbs ("actually", "simply", "really", "just").
- [ ] No slop lexicon: delve, leverage, robust, seamless, harness as decoration, elevate, streamline.

## 7. The three readers

- [ ] Owner: what to do, in order, and what it costs to get it wrong.
- [ ] Hobbyist: the mechanism and one experiment they can run themselves.
- [ ] Agent: a dated, sourced table, one canonical number per section, stable URL, real table markup.

## 8. Malay

- [ ] The BM file is written in Malay, not translated sentence by sentence from the English.
- [ ] Register rules from `ms-register.md` hold; `adalah` is not a default copula, no `yang mana` as a relative pronoun.
- [ ] Same facts, same sources, its own phrasing. A missing BM half is a draft, not published content.

## 9. Publication gate

- [ ] `draft: true` until the user clears it.
- [ ] No `[VERIFY]` string anywhere. `grep -rn "\[VERIFY\]" content/` returns nothing.
- [ ] `node content/schema.mjs --strict` reads 0 violations for this file.
- [ ] `npm run articles:check` green.
- [ ] Changelog entry dated the day the piece was written, never backdated.
- [ ] Claim rows in `docs/justifications/<slug>.md` are literal substrings of the rendered page.
