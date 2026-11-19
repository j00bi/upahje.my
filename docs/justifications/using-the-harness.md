# Justification, `using-the-harness`

Review only. Not rendered, not linked from the page.

## Claim-level

| Claim | Source | Checked |
| --- | --- | --- |
| Installed harness is 0.2.2-rc.1 | version read by running `--version` on 19 November 2026, cross-checked against `node_modules/@deepseek-ai/dsh/package.json` | 2026-11-19 |
| Transcript path shape `~/.dsh/sessions/<dir>/session-<uuid>/session.v4.jsonl.zstd` | directory listing of `~/.dsh/sessions/--home-husni-.dsh-bot-workspace--/` | 2026-11-19 |
| Transcript is Zstandard-compressed JSON Lines | `file` reports Zstandard data; `zstd -dc` produces one JSON object per line | 2026-11-19 |
| `session.lock` sits beside the transcript | directory listing shows a 0-byte `session.lock` | 2026-11-19 |
| Record types turn/start, step/start, request/header, request/context, assistant/message, tool/call, tool/result, step/end, turn/end | counted from one decompressed session transcript | 2026-11-19 |
| `tool/call` data fields are turn, step, callId, name, arguments | read from a decoded `tool/call` record | 2026-11-19 |
| Each step is a separate request | transcript contains `request/header` and `request/context` records inside steps | 2026-11-19 |
| What the provider receives inside a request is not measured here | no inspection of outbound payloads was performed | 2026-11-19 |
| Sessions persist after the window closes | session directories remain on disk after prior sessions ended | 2026-11-19 |
| Whether an installation prunes old sessions is site-specific | not tested; stated as unknown | 2026-11-19 |

## Choice-level

| Section | Why it exists, what it answers |
| --- | --- |
| Opening | Defines the harness and stamps the version in the first 60 words, which is the whole promise of the piece |
| What happens to one message | The concrete flow the brief asked for, using the record names the file actually contains |
| Where is the conversation stored | The question a business owner asks once they realise a client document went into a chat |
| What does a tool call look like | Explains who executes: the harness, not the model, which is the point most readers get wrong |
| What can I check myself | Three commands so the page is auditable instead of authoritative |
| FAQ (3) | Readability, persistence, and payload scope. Each is absent from the body, and the third is answered with "not measured" rather than a guess |
