# Justification: using-the-harness

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "In DeepSeek Harness 0.2.2-rc.1 on this machine, one typed message becomes a turn, a turn becomes steps, and every step is written to a file on disk." | https://www.npmjs.com/package/@deepseek-ai/dsh | our measurement, this machine | 2026-11-19 | source: `--version` printed 0.2.2-rc.1; record types read from a decompressed session transcript |
| 2 | "The transcript for this machine contains these record types, in the order a single exchange produces them: turn/start, step/start, request/header, request/context, assistant/message, tool/call, tool/result, step/end, turn/end." | - | our measurement, this machine | 2026-11-19 | source: `zstd -dc` on session.v4.jsonl.zstd and counting record types |
| 3 | "The ~/.dsh/sessions path looks like `--home-husni-.dsh-bot-workspace--/session-<uuid>/session.v4.jsonl.zstd`." | - | our measurement, this machine | 2026-11-19 | source: directory listing of ~/.dsh/sessions |
| 4 | "The transcript is Zstandard-compressed JSON Lines, one record per line before compression." | - | our measurement, this machine | 2026-11-19 | source: `file` reports Zstandard data; `zstd -dc` produces one JSON object per line |
| 5 | "session.lock sits beside the transcript." | - | our measurement, this machine | 2026-11-19 | source: directory listing shows a 0-byte session.lock |
| 6 | "The tool/call record has these data fields: turn, step, callId, name, arguments." | - | our measurement, this machine | 2026-11-19 | source: decoded tool/call records from the transcript |
| 7 | "A task that needs four tools is several exchanges with the model, not one." | - | - | - | estimate: our reading of the step structure, each step carrying its own request/header and request/context |
| 8 | "What exactly the provider receives inside a request is not something this page measures." | - | - | - | estimate: statement of our own limits, no outbound payload inspection performed |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| What happens to one message, from typing to answer? | The concrete flow the article promises, using record names the file actually contains |
| Where is the conversation stored? | The question a business owner asks once a client document has been pasted into a chat |
| What does a tool call look like in that flow? | Establishes that the harness executes tools, not the model, which most readers assume wrongly |
| What can I check myself? | Three commands, so the page is auditable instead of authoritative |
| FAQ | Readability, persistence, and payload scope. None is answered in the body, and the third is answered "not measured" |
| Sources | One URL, for the package identity only; everything else here is a local measurement |
