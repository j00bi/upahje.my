# Justification: using-the-harness

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "In DeepSeek Harness 0.2.2-rc.1 on this machine, one typed message becomes a turn, a turn becomes steps, and every step is written to a file on disk." | - | our measurement, this machine | 2026-11-19 | source: `dsh --version` printed 0.2.2-rc.1, and the record types were read from a decompressed session transcript |
| 2 | "The transcript for this machine contains these record types, in the order a single exchange produces them:" | - | our measurement, this machine | 2026-11-19 | source: `zstd -dc` on session.v4.jsonl.zstd, record types counted |
| 3 | "The path has three parts: `~/.dsh/sessions/<workspace>/<session>/session.v4.jsonl.zstd`." | - | our measurement, this machine | 2026-11-19 | source: directory listing of `~/.dsh/sessions`, with the workspace slug and session identifier replaced by placeholders |
| 4 | "The transcript is Zstandard-compressed JSON Lines, one record per line before compression, and `session.lock` sits beside it." | - | our measurement, this machine | 2026-11-19 | source: `file` reports Zstandard data, `zstd -dc` yields one JSON object per line, and a 0-byte `session.lock` sits in the same directory |
| 5 | "The `tool/call` record in the transcript has exactly these data fields: `turn`, `step`, `callId`, `name`, `arguments`." | - | our measurement, this machine | 2026-11-19 | source: decoded `tool/call` records from the transcript, fields listed by inspection |
| 6 | "A task that needs four tools is not one exchange with the model, it is several, because the model cannot see a tool's result until the harness has run it and sent the result back." | - | - | - | estimate: our reading of the step structure, each step carrying its own `request/header` and `request/context` |
| 7 | "What exactly the provider receives inside that request is not something this page measures, and we are not going to guess at it." | - | - | - | estimate: statement of our own limits, no outbound payload inspection performed |
| 8 | "The session directory stays on disk with its transcript, so the file persists after the window closes." | - | our measurement, this machine | 2026-11-19 | source: session directories from earlier sessions remain on disk with their transcripts |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What happens to one message, from typing to answer? | The concrete flow the article promises, using record names the file actually contains |
| Where is the conversation stored? | The question a business owner asks once a client document has been pasted into a chat |
| What does a tool call look like in that flow? | Establishes that the harness executes tools, not the model, which most readers assume wrongly |
| What can I check myself? | Three commands, so the page is auditable instead of authoritative |
| FAQ | Readability, persistence, and payload scope. None is answered in the body, and the third is answered "not measured" |
| Sources | One URL, for package identity only; everything else here is a local measurement |
