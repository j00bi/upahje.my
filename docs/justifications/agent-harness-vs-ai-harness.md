# Justification: agent-harness-vs-ai-harness

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "Anthropic says "hosted agent harness", and the DeepSeek Harness package uses the bare word as its product noun." | https://code.claude.com/docs/en/agent-sdk/overview | Anthropic | 2026-11-19 | source: page phrase "hosted agent harness"; package README uses "Harness home" |
| 2 | "Neither treats it as a metaphor." | https://www.npmjs.com/package/@deepseek-ai/dsh | our measurement, this machine | 2026-11-19 | source: README wording "Harness home" read in the installed package |
| 3 | "Not from the vendors I could read. Across the four official sources opened for this article, the phrase "AI harness" does not appear." | - | our measurement, this machine | 2026-11-19 | source: grep for the phrase across the four sources opened on 19 November 2026 |
| 4 | "The method has a limit and I will state it: a search-engine query for the exact phrase returned a bot-check page instead of results, so I cannot claim no page anywhere uses it." | - | our measurement, this machine | 2026-11-19 | source: search query returned a bot-check page on 19 November 2026 |
| 5 | "The harness runs the tool, not the model. The model chooses a tool and arguments, and the harness performs the call." | - | our measurement, this machine | 2026-11-19 | source: `tool/call` records in a decompressed session transcript, executed by the harness |
| 6 | "The conversation is written to a file you can read: in this harness, compressed JSON Lines under `.dsh/sessions`." | - | our measurement, this machine | 2026-11-19 | source: directory listing and `zstd -dc` on `session.v4.jsonl.zstd` |
| 7 | "A framework is a library you build with; a harness is the thing that runs the loop, executes tools and keeps the transcript." | - | - | - | estimate: our definition, contrasting the two words as they are used on the vendor pages read here |
| 8 | "Agent workspace | OpenBot, MausBot | The product's own word for a harness plus a desktop or a machine per bot" | https://openbot.run/ | OpenBot | 2026-11-19 | source: product wording on the site; MausBot describes a virtual machine per bot in its repo description |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| Who actually says "harness"? | Names the vendors that use the word and quotes the clearest definition |
| What does the term imply, in practice? | Four implications, one line each, pointing to the walkthrough article instead of repeating it |
| Where does "AI harness" come from? | States the absence and the method's limit, then gives the term table |
| Why does the distinction matter when buying? | Turns vocabulary into three questions a buyer asks a vendor |
| FAQ | Harness versus app, framework versus harness, and whether the word implies open source |
| Sources | The four URLs opened, each dated |
