# Justification: blender-mcp-scene-tools

## Claims

| # | claim | source URL | publisher | checked | basis |
|---|-------|------------|-----------|---------|-------|
| 1 | "The popular Blender add-on ships visual verification" | https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md | mcp-for-blender README | 2026-11-24 | source: README feature row on visual verification |
| 2 | "It can render a sheet of angles and compare them with what you asked for" | https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md | mcp-for-blender README | 2026-11-24 | source: README `look` tool row, angles and frames views |
| 3 | "That kills the lazy thesis that an agent working in Blender is blind." | - | - | - | opinion: the article's own reading of the feature row |
| 4 | "Python in Blender is not a sandbox: it runs with the permissions of your user account and the full bpy API" | https://docs.blender.org/api/current/ | Blender Foundation | 2026-11-24 | source: the Python API documentation for the live-data model; the tool's README describes it as running Python in your live Blender |
| 5 | "Validation is not a guarantee, and the warning remains the load-bearing sentence in the documentation." | https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md | mcp-for-blender README | 2026-11-24 | estimate: the article's reading of the safe-mode flag and the warning |
| 6 | "If the change is bad and the file was never saved, there is one undo history between you and a lost afternoon" | https://docs.blender.org/api/current/ | Blender Foundation | 2026-11-24 | estimate: the article's reasoning from the live-file model |
| 7 | "The project was formerly blender-mcp and the package is now mcp-for-blender" | https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md | mcp-for-blender README | 2026-11-24 | source: README note on the rename and the PyPI package |
| 8 | "hand over geometry, naming, imports and repeated scene setup, and keep the final lighting pass" | - | - | - | opinion: stated once, in the reader's interest |
| 9 | "35,550" | https://github.com/ahujasid/mcp-for-blender | GitHub API | 2026-11-24 | source: repo table, stars row, read at 11:16 on 24 November 2026 |
| 10 | "7 March 2025" | https://github.com/ahujasid/mcp-for-blender | GitHub API | 2026-11-24 | source: repo table, created row |
| 11 | "18 November 2026" | https://github.com/ahujasid/mcp-for-blender | GitHub API | 2026-11-24 | source: repo table, last push row |
| 12 | "8" | https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md | mcp-for-blender README | 2026-11-24 | source: repo table, tool count from the README tool table |
| 13 | "Not affiliated with the official Blender Foundation" | https://github.com/ahujasid/mcp-for-blender | GitHub API | 2026-11-24 | source: repository description field, quoted |

## Sections

| H2 | why this section exists |
|----|-------------------------|
| The agent can see what it changed | The visual verification feature, which kills the blind-agent claim |
| The tool with no guard rail | execute_blender_code, the safe-mode flag, and why the warning stands |
| The boundary is the file, not the model | Why saving is the recovery mechanism and renders are the evidence |
| The repo, as it is on 24 November 2026 | Stars, licence, dates and tool counts, all dated |
| What to hand over, and what to keep | The stated opinion and the workflow that survives a mistake |
