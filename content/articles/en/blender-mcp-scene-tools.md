---
title: "The Blender add-on is not blind, but the script tool is"
description: "The add-on can look at its own work and ships checks for it. What has no guard rail is arbitrary Python in your live file, and its README says save first."
slug: blender-mcp-scene-tools
translationKey: blender-mcp-scene-tools
format: teardown
reader: hobbyist
date: 2026-11-24
updated: 2026-11-24
author: "UpahJe Desk"
category: buying-guides
tags: [buying-guides, blender, mcp, 3d]
cardFigure: "8 tools, and one with no guard rail"
canonical: https://upahje.my/en/articles/blender-mcp-scene-tools
draft: true
changelog:
  - date: 2026-11-24
    note: "First published."
sources:
  - title: "ahujasid/mcp-for-blender, repository (35,550 stars on the day read, MIT, created 7 March 2025)"
    url: "https://github.com/ahujasid/mcp-for-blender"
    checked: 2026-11-24
  - title: "mcp-for-blender README (visual verification, the tool list, the execute_blender_code warning, safe mode)"
    url: "https://raw.githubusercontent.com/ahujasid/mcp-for-blender/main/README.md"
    checked: 2026-11-24
  - title: "Blender Python API documentation"
    url: "https://docs.blender.org/api/current/"
    checked: 2026-11-24
---

# The Blender add-on is not blind, but the script tool is

The popular Blender add-on ships visual verification: multi-angle sheets, camera and wireframe views, X-ray, animation strips and renders, so an agent can check its own work. What has no guard rail is `execute_blender_code`, which runs arbitrary Python in your open file, and the add-on's README says it plainly: "ALWAYS save your work before using it."

## The agent can see what it changed

The README lists "Visual verification: multi-angle, camera, wireframe, X-ray and animation-strip views, plus renders, so the AI checks its own work". The `look` tool takes a view from `viewport`, `camera`, `angles` or `frames`, and draws it `solid`, `material`, `rendered`, `wireframe` or `xray`.

That kills the lazy thesis that an agent working in Blender is blind. It is not. It can render a sheet of angles and compare them with what you asked for, which is more checking than most human sessions get.

## The tool with no guard rail

`execute_blender_code` "runs Python in your live Blender". Python in Blender is not a sandbox: it runs with the permissions of your user account and the full `bpy` API, which can delete objects, rewrite meshes, overwrite files and run whatever the interpreter can run.

The add-on knows this. Its README carries the warning quoted above, and an optional safe mode: set `BLENDER_MCP_SAFE_MODE=1` and scripts are validated before they run. Validation is not a guarantee, and the warning remains the load-bearing sentence in the documentation.

## The boundary is the file, not the model

A `bpy` call changes the scene in memory. You see the result when the scene is evaluated and a view is drawn or a render is written, which is why the visual checks matter: they are the only evidence the agent gets that the change is what it meant.

Recovery is a different matter. If the change is bad and the file was never saved, there is one undo history between you and a lost afternoon; if the file was saved first, the worst case is reopening it. That is why the README's warning is about saving, not about the model being clever.

## The repo, as it is on 24 November 2026

| What | Value | Where |
| --- | --- | --- |
| GitHub stars | 35,550 | repository API, 24 November 2026 |
| Licence | MIT | repository |
| Created | 7 March 2025 | repository API |
| Last push | 18 November 2026 | repository API |
| Tools listed in the README | 8 | README tool table |
| Named view sources for `look` | 4 | README tool row |
| Shading modes for `look` | 5 | README tool row |

The project was formerly `blender-mcp` and the package is now `mcp-for-blender`; existing setups keep working. The repository describes itself as a community plugin, "Not affiliated with the official Blender Foundation", which matters when you are deciding how much of Blender's behaviour the project is responsible for.

## What to hand over, and what to keep

My opinion, stated once: hand over geometry, naming, imports and repeated scene setup, and keep the final lighting pass. Lighting is judged by looking at a render and deciding whether it feels right, and that judgement is yours; the agent can produce the render but cannot tell you the shot is good.

The workflow that survives a mistake: save the file, save a copy before a long run, turn safe mode on, ask for a `look` after every change, and treat any script that touches the file system as a deployment.

---

**Read next**

[What a leaderboard row actually measures](https://upahje.my/en/articles/leaderboard-row-anatomy)

[More on buying and choosing tools](https://upahje.my/en/articles/category/buying-guides)
