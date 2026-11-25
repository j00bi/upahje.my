# UpahJe editorial standard

The rules that decide whether a piece is published. They exist because the first two audits said the same thing in different words: the research is credible and the writing reads like a template.

## Voice

Direct, informed, curious, practical. Write as someone who looked the thing up and is telling you what they found. Not corporate, not SEO filler, not witty for its own sake, not perpetually cautious.

**Apparatus never appears in prose.** Editorial machinery — an opinion label, a confidence marker, a to-do placeholder — is either deleted or turned into an actual sentence.

Banned outright, in both languages:

| Never write | Write instead |
| --- | --- |
| "My opinion, stated once:" | The opinion, as a sentence |
| "Pendapat saya, dinyatakan sekali:" | Pendapat itu, sebagai ayat |
| "The honest version is" | The trade-off itself |
| "The part worth remembering" | The specific finding |
| "That is the honest limit" | The factual limitation |
| "The smallest runnable version" | "Try this", or the example |
| "[VERIFY]" / "[TODO]" | Say plainly what was not checked |
| A changelog or working note in the visible page | The internal frontmatter entry |

`node scripts/editorial-check.mjs` lists every remaining instance. It is a review aid, never a build gate.

## Structure follows the subject

Do not run every article through problem → why it matters → considerations → five actions → try it → FAQ. Pick a shape and let it breathe:

| Format | Shape |
| --- | --- |
| Explainer | Familiar situation → answer → mechanism → example → limits |
| Buying guide | Decision → options → printed prices → hidden costs → recommendation |
| Comparison | Claim → evidence table → what differs → what it costs → verdict |
| Research | Finding → method → evidence → implications → limitations |
| Field test | Question → setup → what happened → failures → verdict |
| Opinion | Thesis → cases → counterargument → conclusion |
| Regulatory | What changed → effective date → who is affected → exceptions → action |

A FAQ appears only when it answers questions a reader genuinely arrives with. It is not an SEO attachment, and "What to do this week" is not a required section — five actions only when five actions are the answer.

Vary paragraph length on purpose: short for a claim, long for reasoning. Not every paragraph gets a closing line.

## Evidence

- Primary sources first: the regulator, the vendor's own pricing page, the standard.
- Date every volatile price, and print the conversion rate and its date beside any converted figure.
- Distinguish arithmetic on published rates from a schedule amount, an estimate from a measurement, an assumption from a fact.
- State sample sizes. Never turn advertised budgets into income claims.
- Never imply something untested was tested. If a page was not read, the article says so in one sentence and moves on.
- Two sources minimum per article, both `checked` dated. The schema enforces this.

## Headlines and descriptions

- Promise a specific finding or answer.
- **Leave "Malaysia" and "Malaysian" out of titles.** This is a Malaysian publication for Malaysian readers; the geography is the default, not the finding, and adding it makes every headline longer and softer. Slugs may keep it — URLs target the query and must never change — but the title should read as the claim: *What a WhatsApp chatbot costs, per message*, not *WhatsApp chatbot costs in Malaysia, per message*. Keep it only when the country is genuinely the variable being compared, and even then the regulator's name usually does the work better (EPF, SOCSO, LHDN, MyCC).
- Numbers only when they carry the argument.
- No formula tics: "and not much else", "or nothing at all", "and nobody tells" are used sparingly enough to stay noticeable.
- The description must survive the headline test: if it needs a caveat the headline cannot carry, the headline is wrong.

## English and Malay are edited independently

The Malay version is not a sentence-by-sentence transposition of the English. Same facts, same figures, same sources; its own sentences, its own examples, its own rhythm. If the Malay reads like translated English, it is not finished.

## Before publishing

1. `npm run prebuild` — schema, PII, OG data, llms.txt.
2. `node scripts/editorial-check.mjs` — read the report, fix what sounds like a template.
3. Check every number against its source, then check the arithmetic again.
4. Check the links resolve to a 200 and point at the right language.
5. Ask one question: would someone finish this and be able to decide something? If not, the article is not ready.
