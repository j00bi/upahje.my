# Justification: harness-api-keys

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "A harness keeps your key outside the conversation. It reads the key from an environment variable or from its own credential store at the moment it calls the provider." | - | our measurement, this machine | 2026-11-19 | source: a saved secret reaches the process as an environment variable, and `~/.dsh/.credentials.yaml` exists on disk |
| 2 | "In this harness a saved secret reaches the process as an environment variable named after the secret, and the harness reads it when it needs to call a provider." | - | our measurement, this machine | 2026-11-19 | source: the secret is exposed to the shell as `$DSH_SECRET_<NAME>` |
| 3 | "In two places only: an environment variable that the process can read, or the harness's own credential store, which is a file on your machine." | - | our measurement, this machine | 2026-11-19 | source: `~/.dsh/.credentials.yaml` present; environment-variable path observed |
| 4 | "The provider looks up the key, finds the account it belongs to, and applies that account's permissions and billing to whatever the request asks for." | - | - | - | estimate: our description of bearer-token authentication, not measured against a provider's internals |
| 5 | "Revoke first, then rotate, then investigate, in that order." | - | - | - | estimate: our judgement on incident order, because revocation is the only step that stops spend |
| 6 | "Four places, and they cover almost every real leak: a chat message, a committed file, a screenshot or log, and client-side code." | - | - | - | estimate: our judgement from the four leak channels we can name |
| 7 | "That depends on the provider, so check yours rather than assuming." | - | - | - | estimate: no single provider policy measured, so the article tells the reader to check their own |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| Where does the key actually live? | Answers the placement question with the two real locations, matching the figure's first half |
| What does the key authenticate? | Explains account-level credentials, which is why revocation, spend and audit behave as they do |
| Where must the key never go? | The four banned places, each with the mechanism that makes it a leak |
| What do I do when a key leaks? | An ordered procedure, because ordering is where teams get it wrong |
| FAQ | Store versus variable, shared keys, expiry. None answered in the body |
| Sources | One URL for package identity; everything else is our measurement or our judgement |
