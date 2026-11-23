# Shared shell, visual QA

Phase 2 shell on `/en`, full page, captured from the production build
(`next start`) at each width. Same page, same content; the header, mobile sheet
and footer are the parts under review.

| Width | File | Caption |
| --- | --- | --- |
| 375 | `shell-375.png` | Wordmark and menu button only; opening the sheet shows 8 section links and the language switch, no horizontal overflow (`scrollWidth` 375). |
| 430 | `shell-430.png` | Same one-line mobile shell at the wider phone width; sheet opens to 8 links. |
| 768 | `shell-768.png` | Tablet: desktop navigation is still hidden at this width by the `lg` breakpoint; the sheet carries sections and language. |
| 1366 | `shell-1366.png` | Full desktop header: three pillars, Repos, Library, EN/MS switch with the lime rule on the active code, All articles; forest footer on paper canvas. |
| 1440 | `shell-1440.png` | Desktop at the common laptop width; header stays on one line and the container holds its 78rem maximum. |
| 1920 | `shell-1920.png` | Wide desktop: container is centred at 78rem, gutters absorb the extra width, no stretched measure. |

Checks run on this build: no horizontal overflow at 375 and 430
(`scrollWidth === innerWidth`), mobile sheet opens and exposes 8 links, `/en`,
`/ms`, `/en/articles`, `/privacy` and `/terms` all 200, sitemap still 54 URLs.

Main (`e558175`) has since deleted the marketplace half, including `NavBar`, so
the only shell components in the tree are `TopBar` and `Footer`. No second
navigation surface remains.
