**UpahJe — Agent Implementation Specification**  
This is the implementation brief I’d give to a senior autonomous coding agent working directly inside j00bi/upahje.my.  
The objective is not to produce a pretty mockup. It is to transform the existing UpahJe codebase into a complete, production-ready editorial publication while preserving its content, functionality, SEO and bilingual infrastructure.  
The agent should inspect, plan, implement, test and document its work. It should not stop after creating the homepage.  
Project identity  
**upahje**  
**Practical knowledge. Clearly explained.**  
An independent Malaysian business and technology knowledge publication.  

| Decision         | Requirement                               |
| ---------------- | ----------------------------------------- |
| Product          | Editorial publication                     |
| Scope            | Entire website                            |
| Design           | Premium editorial                         |
| Homepage         | First implementation priority             |
| Languages        | English and Bahasa Melayu                 |
| Existing content | Preserve                                  |
| Existing stack   | Preserve unless evidence justifies change |
| Deployment       | Existing Vercel infrastructure            |
| Execution        | Incremental, tested pull requests         |
  
**1. Agent role and operating principles**  
The coding agent should act as:  
* Senior frontend architect.  
* Product designer.  
* Editorial UX specialist.  
* Next.js engineer.  
* SEO and technical performance engineer.  
* Accessibility engineer.  
* QA engineer.  
**Non-negotiable rules**  
* Inspect the entire repository before changing code.  
* Treat existing implementation as the source of truth, not old design documentation.  
* Preserve the article content and existing public URLs.  
* Preserve English and Bahasa Melayu functionality.  
* Do not introduce marketplace functionality.  
* Do not replace working systems without a technical reason.  
* Do not invent article content, authors, statistics or editorial credentials.  
* Do not use placeholder links or non-functional controls.  
* Do not add unnecessary dependencies.  
* Do not deploy to production without explicit approval.  
Important: The agent must verify the current repository state before using any file paths or assumptions in this specification. The file inventory below is a starting map, not a guarantee that every path is current.  
**2. Phase zero — Repository reconnaissance**  
Do not modify code yet  
The first agent task is to understand the current application.  
**Inspect**  
* package.json and lockfile.  
* app/ route structure.  
* components/ and shared layouts.  
* lib/ utilities and content loaders.  
* content/ and all Markdown articles.  
* public/ assets.  
* Tailwind and global CSS configuration.  
* DESIGN.md and project documentation.  
* Vercel configuration.  
* Existing tests, linting and CI workflows.  
* Existing metadata, sitemap, RSS, JSON and llms.txt generation.  
* Git history and current branch.  
**Required reconnaissance report**  
The agent must produce:  

| Report        | Required findings                                |
| ------------- | ------------------------------------------------ |
| Architecture  | Framework, rendering strategy and dependencies   |
| Routes        | Every existing public and private route          |
| Content       | Article count, categories, language distribution |
| Components    | Reusable components and duplication              |
| SEO           | Metadata, canonical URLs, structured data        |
| Performance   | Image loading, client JS, rendering bottlenecks  |
| Accessibility | Navigation, headings, contrast, keyboard support |
| Risks         | Broken functionality and migration risks         |
  
**Route inventory**  
The agent must discover the actual routes and classify them into:  
* Homepage.  
* Article listing.  
* Individual article.  
* Category pages.  
* Resource and concept pages.  
* Search.  
* Author pages, if implemented.  
* About and policy pages.  
* Language-specific routes.  
* Any existing administrative or authentication routes.  
Do not invent routes simply because they’re listed in this brief.  
Deliverable: docs/REDESIGN_AUDIT.md  
**3. Phase one — Design system**  
Establish the visual language before building individual pages.  
**3.1 Design principles**  
The visual direction should combine:  
* Independent editorial magazine.  
* Modern knowledge publication.  
* Minimalist reading interface.  
* Malaysian cultural context without stereotypical visual clichés.  
The experience should feel closer to a thoughtfully designed independent journal than a SaaS landing page.  
**3.2 Design tokens**  
Use centralised CSS variables.  
```
:root {
  /* Brand */
  --color-lime: #9FE870;
  --color-forest: #25382B;
  --color-ink: #242824;

  /* Surfaces */
  --color-paper: #FAF9F5;
  --color-white: #FFFFFF;
  --color-soft: #F1F2EC;

  /* Text */
  --color-muted: #777F73;
  --color-border: #E5E5DC;

  /* Typography */
  --font-display: "Newsreader", serif;
  --font-body: "Inter", sans-serif;

  /* Layout */
  --container-width: 1240px;
  --reading-width: 720px;

  /* Spacing */
  --space-section: 80px;
  --space-content: 24px;

  /* Shape */
  --radius-small: 6px;
  --radius-medium: 12px;
}
```
These are starting tokens, not permission to override the existing Tailwind configuration blindly.  
**3.3 Typography scale**  

| Usage            | Desktop | Mobile  |
| ---------------- | ------- | ------- |
| Display headline | 64–76px | 40–48px |
| Page title       | 48–56px | 34–40px |
| Section title    | 30–36px | 26–30px |
| Article title    | 42–54px | 32–38px |
| Article body     | 18px    | 17–18px |
| Body secondary   | 15–16px | 14–15px |
| Metadata         | 12–13px | 12px    |
  
Use responsive clamp() sizing rather than arbitrary breakpoint-specific font overrides.  
**3.4 Editorial visual rules**  
* Asymmetric layouts are encouraged where they improve hierarchy.  
* Large headlines should establish the page identity.  
* Use thin separators instead of excessive cards.  
* Feature images should be visually meaningful.  
* Keep text line lengths comfortable.  
* Use a consistent editorial image treatment.  
* Use lime for emphasis, not as a background for everything.  
* Avoid excessive shadows and rounded containers.  
* Respect reduced-motion preferences.  
**3.5 Image direction**  
Images should feel documentary and editorial.  
Preferred subjects:  
* Malaysian independent businesses.  
* Real working environments.  
* Business owners and professionals.  
* Technology in everyday business.  
* Financial and operational environments.  
Avoid:  
* Generic corporate handshake photographs.  
* Unrelated decorative illustrations.  
* Random AI-generated people.  
* Inconsistent image colour grading.  
* Repeated stock images across articles.  
If image assets are unavailable, create intentional typographic or colour-block fallbacks.  
**Deliverable**  
```
docs/DESIGN_SYSTEM.md
```
Plus reusable tokens, typography utilities and shared layout primitives.  
**4. Phase two — Global navigation and layout**  
Build the shared site shell before the homepage.  
**Header specification**  
Desktop:  
* UpahJe wordmark.  
* Journal / Articles.  
* Topics.  
* Guides or Resources, only if supported by actual content.  
* Search.  
* Language switcher.  
* Minimal visual treatment.  
Mobile:  
* Wordmark.  
* Search control.  
* Menu trigger.  
* Accessible navigation drawer.  
**Header behaviour**  
* Sticky navigation is optional, but should not consume excessive screen space.  
* Search must actually work.  
* Language switching must preserve the current page where a translation exists.  
* Navigation should expose the active section.  
* All interactive controls must have keyboard support.  
**Footer specification**  
Include:  
* Brand and publication description.  
* Primary navigation.  
* Existing topic links.  
* English / BM navigation.  
* About and contact links where available.  
* Privacy and terms pages where available.  
* RSS feed.  
* Copyright information.  
Do not add social media links, newsletter controls or contact addresses unless they actually work.  
**Deliverable**  
Reusable site shell:  
* SiteHeader  
* MobileNavigation  
* SiteFooter  
* LanguageSwitcher  
* SearchTrigger  
* PageContainer  
Use existing component naming conventions if they already exist.  
**5. Phase three — Homepage implementation**  
First major release  
This is the first visible product deliverable.  
**Homepage hierarchy**  
01 — Header  
Brand, navigation, language and search  
02 — Editorial introduction  
Publication identity and positioning  
03 — Featured story  
Primary visual focus  
Large image, headline, excerpt and article link  
04 — Latest stories  
Recent published articles  
05 — Explore topics  
Existing content categories  
06 — Curated collections  
Only if sufficient relevant content exists  
07 — Newsletter / discovery  
Only if supported by a working integration  
08 — Footer  
**5.1 Editorial introduction**  
Proposed headline:  
Ideas worth understanding. Knowledge worth using.  
Supporting text:  
“Clear, practical insights on business, technology and the things that help people work better in Malaysia.”  
The agent may refine this copy, but must preserve the positioning.  
**5.2 Featured story**  
The featured article should:  
* Be selected through article metadata.  
* Display its category.  
* Display its title and excerpt.  
* Display reading time.  
* Display a cover image where available.  
* Link to the correct language version.  
* Use the latest published article as fallback.  
Never hardcode a fake featured article.  
**5.3 Latest articles**  
Display four to six articles depending on viewport and content density.  
Each article preview should support:  
* Cover image.  
* Category.  
* Article title.  
* Short excerpt.  
* Reading time.  
* Publication date.  
* Optional article type.  
The design should have at least two visual treatments:  
* Large editorial feature.  
* Compact article list.  
Avoid rendering every article in identical cards.  
**5.4 Topic explorer**  
Initially use the existing categories:  
* Definitions.  
* Buying Guides.  
* Side Income.  
Do not automatically replace these with Business, Finance, Technology, Marketing and Operations. Those may become future categories only after a content taxonomy review.  
**5.5 Homepage content rules**  
* No drafts.  
* No empty category blocks.  
* No broken image URLs.  
* No duplicated featured article in the latest list.  
* No cross-language article leakage.  
* No fabricated author details.  
* Proper fallback for missing content.  
**5.6 Homepage acceptance criteria**  
The homepage is complete when:  
* All modules are populated from real content.  
* The layout is responsive.  
* EN and BM render independently.  
* The featured story works.  
* Article links resolve correctly.  
* There are no placeholder buttons.  
* No console errors occur.  
* The homepage passes accessibility checks.  
Deliverable: Fully implemented editorial homepage, not a static design demonstration.  
**6. Phase four — Article archive and topic pages**  
The archive should support exploration without feeling like a database table.  
**Article archive**  
Requirements:  
* Editorial page heading.  
* Short publication introduction.  
* Search or filtering if implemented.  
* Category filtering.  
* Language-specific results.  
* Pagination or a deliberate load-more strategy.  
* Empty and error states.  
**Topic pages**  
Each topic should contain:  
* Topic title.  
* Description.  
* Featured article if one exists.  
* Latest relevant content.  
* Article count.  
* Related topics where relevant.  
Do not create dozens of empty topic pages.  
**Content ordering**  
Use consistent sorting:  
* Explicit editorial priority where supported.  
* Publication date.  
* Stable tie-breaker.  
Never use last-updated time as a substitute for original publication order unless editorially intended.  
**Deliverable**  
A complete archive and topic browsing experience with working URLs and pagination.  
**7. Phase five — Individual article experience**  
Core product experience  
The agent must treat the article page as a first-class product, not a generic Markdown renderer.  
**7.1 Article header**  
Required fields:  
* Breadcrumb.  
* Category.  
* Title.  
* Excerpt.  
* Author, only when real author data exists.  
* Publication date.  
* Updated date when applicable.  
* Reading time.  
* Language.  
**7.2 Article hero**  
* Responsive 16:9 image.  
* Correct alt text.  
* Caption and attribution where available.  
* Explicit image dimensions to prevent layout shift.  
* Fallback when no image is available.  
**7.3 Reading layout**  
Desktop:  
ARTICLE PAGE STRUCTURE  
Article header  
Breadcrumb, category, headline and metadata  
Hero image  
Contents  
Sticky TOC  
Article body  
720px reading column  
Sources, takeaways and related articles  
Mobile:  
* Single-column reading.  
* No permanently visible sidebar.  
* Table of contents becomes a collapsible control.  
* Sticky controls must not obstruct content.  
* Comfortable spacing and touch targets.  
**7.4 Reading features**  
Implement:  
* Automatic heading IDs.  
* Table of contents for sufficiently long articles.  
* Reading progress indicator.  
* Copy article link.  
* Share action using supported browser capabilities with a clipboard fallback.  
* Related articles.  
* Previous/next article where useful.  
These should progressively enhance the experience. The article must remain readable if JavaScript fails.  
**7.5 Content rendering**  
Support existing Markdown features first.  
The renderer should safely support:  
* Headings.  
* Paragraphs.  
* Ordered and unordered lists.  
* Tables.  
* Links.  
* Images.  
* Blockquotes.  
* Code blocks.  
* Inline code.  
* Emphasis.  
Only introduce custom blocks such as callouts, checklists and FAQs if they can be represented safely and consistently in the existing content system.  
**7.6 Source credibility**  
Where relevant, articles should display:  
* Official sources.  
* External references.  
* Publication date.  
* Last reviewed date.  
* Important regulatory disclaimers.  
Never automatically manufacture citations.  
**7.7 Article acceptance criteria**  
* All existing Markdown articles render correctly.  
* Existing heading anchors remain valid where possible.  
* Tables work on mobile.  
* Code blocks are readable.  
* Images have alt text or an explicit decorative designation.  
* No content is truncated.  
* Related articles use genuine content relationships or defensible category relevance.  
* Article metadata remains accurate.  
**8. Phase six — Search and discovery**  
Search should be implemented as a genuine feature, not a decorative search box.  
**Search requirements**  
* Search article titles.  
* Search excerpts.  
* Search article body content.  
* Filter by language.  
* Filter by existing categories.  
* Display meaningful excerpts.  
* Highlight matching terms where practical.  
* Handle empty queries and no-result states.  
* Support keyboard navigation.  
* Preserve query parameters for shareable results.  
**Technical recommendation**  
Start with the existing content loader and implement search against the available published article index.  
Do not introduce Elasticsearch, Algolia or another hosted service unless the current content scale demonstrates a genuine need.  
**Search interface**  
* Desktop: dedicated search page or accessible command-style overlay.  
* Mobile: full-width search interface.  
* Search results: editorial list rather than dense tables.  
* Suggestions: existing categories and relevant articles.  
**Acceptance criteria**  
* Search returns correct language-specific results.  
* Drafts never appear.  
* Search URLs can be shared.  
* No-result states offer useful alternatives.  
* Search does not block initial homepage rendering.  
**9. Phase seven — Bilingual content architecture**  
This is a critical part of the project.  
UpahJe must behave like one publication with two language experiences, not two unrelated websites.  
**Required behaviour**  

| Feature         | English        | Bahasa Melayu  |
| --------------- | -------------- | -------------- |
| Homepage        | Native EN copy | Native BM copy |
| Navigation      | EN             | BM             |
| Article archive | EN articles    | BM articles    |
| Article pages   | EN content     | BM content     |
| Search          | EN results     | BM results     |
| Topics          | EN labels      | BM labels      |
| Metadata        | EN             | BM             |
  
**Translation relationships**  
The agent must inspect the current translation implementation before changing it.  
Where equivalent translations exist:  
* Connect them.  
* Switch directly between them.  
* Use language-specific canonical URLs.  
* Emit correct hreflang alternates.  
Where no translation exists:  
* Do not pretend a translation is available.  
* Provide a useful language fallback.  
* Avoid broken links.  
* Avoid indexing duplicate or empty translation pages.  
**Important content rule**  
Translation must preserve meaning, not just literal wording.  
Technical terminology should be consistent, but natural Malaysian Bahasa Melayu takes priority over awkward direct translations.  
**Acceptance criteria**  
* Every existing language route remains accessible.  
* Language switching does not lose the reader’s current topic unnecessarily.  
* No English-only metadata is served on BM pages.  
* Canonical and alternate language tags are correct.  
**10. Phase eight — Editorial content infrastructure**  
The redesign must not make content publishing harder.  
The existing Markdown content workflow should remain the default unless reconnaissance identifies a real blocker.  
**Article frontmatter**  
Proposed optional metadata:  
```
title: Example article
description: A practical explanation.
category: buying-guides
language: en

featured: false

coverImage: /images/articles/example.webp
coverAlt: A business owner reviewing documents.

publishedAt: 2026-11-20
updatedAt: 2026-11-23

translationGroup: example-article
type: guide
```
This is a proposed schema, not a mandate to break existing frontmatter.  
**Migration rules**  
* Existing fields remain supported.  
* New fields are optional.  
* Existing article IDs and slugs remain stable.  
* Missing metadata has sensible defaults.  
* Validation catches malformed dates and invalid image paths.  
* Translation relationships are validated.  
* Draft/published semantics remain unchanged.  
**Editorial taxonomy**  
Retain the current three categories initially.  
Create a taxonomy proposal separately, based on actual article subjects.  
The agent must not bulk-reclassify content without showing a proposed mapping.  
**Content quality tooling**  
Extend existing validation to check:  
* Missing descriptions.  
* Missing language.  
* Invalid categories.  
* Missing translations where expected.  
* Missing cover images for featured articles.  
* Broken internal links.  
* Duplicate slugs.  
* Invalid dates.  
* Empty article bodies.  
Deliverable: docs/CONTENT_MODEL.md and updated validation scripts where necessary.  
**11. Phase nine — SEO and discoverability**  
SEO must be preserved throughout the redesign.  
**Technical SEO**  
* Preserve existing article URLs.  
* Preserve route hierarchy.  
* Maintain canonical URLs.  
* Generate language alternates.  
* Keep sitemap generation working.  
* Keep RSS generation working.  
* Keep existing JSON feeds working.  
* Preserve robots.txt.  
* Preserve llms.txt if currently supported.  
* Add appropriate Open Graph metadata.  
* Ensure social previews use relevant article imagery.  
**Structured data**  
Use appropriate JSON-LD:  

| Page            | Structured data                                    |
| --------------- | -------------------------------------------------- |
| Homepage        | Organization / WebSite where accurate              |
| Article         | Article or BlogPosting                             |
| Topic           | BreadcrumbList                                     |
| Article archive | BreadcrumbList where appropriate                   |
| Author          | Person only when genuine author information exists |
  
Don’t create fake publisher addresses, author identities or credentials.  
**Internal linking**  
Every article should provide sensible routes to:  
* Its category.  
* Relevant related articles.  
* Its translated version where available.  
* The main article index.  
**URL migration**  
The default rule is no URL changes.  
If a URL change is genuinely necessary:  
* Document the reason.  
* Create a permanent redirect.  
* Preserve query-independent canonical behaviour.  
* Verify old URLs resolve.  
* Update internal links and sitemaps.  
**SEO acceptance criteria**  
* No accidental noindex on public content.  
* No duplicate canonical URLs.  
* No broken sitemap URLs.  
* No broken RSS links.  
* No broken internal article links.  
* Correct language-specific metadata.  
* Structured data passes validation.  
**12. Phase ten — Performance and accessibility**  
**Performance targets**  
**Core Web Vitals targets**  
LCP  
Largest Contentful Paint  
**≤ 2.5s**  
INP  
Interaction to Next Paint  
**≤ 200ms**  
CLS  
Cumulative Layout Shift  
**≤ 0.1**  
Target the 75th percentile of real-user measurements, not just a single local Lighthouse run.  
**Performance requirements**  
* Use Next.js image optimisation where appropriate.  
* Define image dimensions.  
* Lazy-load below-the-fold imagery.  
* Prioritise the main featured image.  
* Avoid unnecessary client components.  
* Minimise third-party scripts.  
* Load fonts efficiently.  
* Avoid layout shifts.  
* Keep the homepage server-rendered where possible.  
**Accessibility requirements**  
Target WCAG 2.2 AA.  
* Semantic HTML.  
* Logical heading order.  
* Keyboard-accessible menus.  
* Visible focus indicators.  
* Accessible search.  
* Sufficient colour contrast.  
* Descriptive image text.  
* Accessible tables.  
* Screen-reader-friendly metadata.  
* Reduced-motion support.  
* No interaction dependent exclusively on hover.  
**13. Phase eleven — Testing and QA**  
The agent must verify functionality, not simply report that the build passed.  
**Automated checks**  
First discover existing scripts in package.json.  
Run applicable checks, including:  
```
npm run lint
npm run build
npm run articles:check
npm run verify:content
```
Only run commands that actually exist. If scripts have different names, use the repository’s real commands.  
**Test coverage**  

| Test                | Expected outcome                 |
| ------------------- | -------------------------------- |
| Homepage EN         | Correct content and layout       |
| Homepage BM         | Correct translated content       |
| Article page EN     | Correct article rendering        |
| Article page BM     | Correct translation rendering    |
| Missing translation | Graceful fallback                |
| Article archive     | Correct published content        |
| Category page       | Correct category filtering       |
| Search              | Correct results and empty state  |
| Navigation          | All links work                   |
| Mobile navigation   | Keyboard and touch usable        |
| Images              | No broken assets                 |
| RSS                 | Valid output                     |
| Sitemap             | Valid public URLs                |
| Metadata            | Correct canonical and alternates |
| Build               | No compilation errors            |
  
**Visual regression**  
The agent should compare before and after screenshots.  
Required viewports:  

| Device       | Viewport    |
| ------------ | ----------- |
| Small mobile | 375 × 812   |
| Large mobile | 430 × 932   |
| Tablet       | 768 × 1024  |
| Laptop       | 1366 × 768  |
| Desktop      | 1440 × 900  |
| Wide desktop | 1920 × 1080 |
  
Capture:  
* Homepage EN and BM.  
* Article page EN and BM.  
* Article archive.  
* Category page.  
* Search results.  
* Mobile menu.  
Check typography, overflow, image cropping, spacing, navigation and visual hierarchy.  
**Browser testing**  
If Playwright is already installed, extend its existing configuration. Otherwise, introduce it only if justified.  
Test:  
* Direct URL navigation.  
* Refreshing nested routes.  
* Browser back and forward.  
* Language switching.  
* Search submission.  
* Copy link.  
* Table of contents navigation.  
* Mobile menu interactions.  
**14. Phase twelve — Git and release management**  
The agent must work incrementally.  
**Branch strategy**  
```
main
  |
  └── redesign/editorial-system
        |
        ├── foundation
        ├── homepage
        ├── article-experience
        ├── discovery
        ├── bilingual-seo
        └── quality-assurance
```
The exact branch strategy may be adapted to existing repository conventions.  
**Pull request sequence**  

| PR | Scope                          | Risk   |
| -- | ------------------------------ | ------ |
| 01 | Design tokens and shared shell | Low    |
| 02 | Editorial homepage             | Medium |
| 03 | Article reading experience     | Medium |
| 04 | Archive and topics             | Medium |
| 05 | Search and discovery           | Medium |
| 06 | Bilingual and SEO improvements | High   |
| 07 | QA and performance refinements | Medium |
  
Each PR must include:  
* Summary of changes.  
* Files affected.  
* Screenshots.  
* Tests executed.  
* Known limitations.  
* Migration or rollback instructions.  
**Release restrictions**  
* Never push directly to main unless existing project policy explicitly permits it.  
* Never modify production secrets.  
* Never change database schemas without approval and migration review.  
* Never replace live content with fixtures.  
* Never deploy without explicit approval.  
* Keep a rollback path.  
**15. Execution strategy — How the agent should work**  
I don’t want the agent attempting all twelve phases in one enormous coding operation.  
Use an incremental implementation loop:  
```
flowchart TD
    A["Inspect repository"] --> B["Produce audit"]
    B --> C["Define design system"]
    C --> D["Implement shared shell"]
    D --> E["Build homepage"]
    E --> F["Run tests and visual QA"]
    F --> G{"Approved?"}
    G -->|No| E
    G -->|Yes| H["Build article experience"]
    H --> I["Build archive and topics"]
    I --> J["Implement search"]
    J --> K["Verify bilingual and SEO"]
    K --> L["Full regression testing"]
    L --> M["Prepare release PR"]
```
**Agent autonomy rules**  
The agent can independently:  
* Inspect files.  
* Create components.  
* Refactor styling.  
* Improve semantic markup.  
* Write tests.  
* Fix discovered bugs.  
* Update documentation.  
* Prepare pull requests.  
The agent must request approval before:  
* Changing public URLs.  
* Removing existing functionality.  
* Replacing the content system.  
* Introducing a paid external service.  
* Changing database schemas.  
* Modifying production configuration.  
* Publishing or deploying.  
**Definition of project completion**  
Release-ready  
The redesign is complete only when:  
* All existing public pages have been audited.  
* Homepage has the new editorial identity.  
* Article pages have a consistent reading experience.  
* Article archive and topic pages work.  
* Search works.  
* EN/BM functionality is preserved.  
* Existing content is preserved.  
* Existing URLs are preserved.  
* RSS, sitemap and feeds work.  
* SEO metadata is correct.  
* Responsive design is verified.  
* Accessibility checks pass.  
* Performance has been measured.  
* Automated tests pass.  
* Documentation is updated.  
* Release PR is prepared.  
**16. Agent handoff prompt**  
This is the instruction I would actually give the coding agent. It consolidates the requirements into an executable brief.  
# PROJECT: UPAHJE.MY — COMPLETE EDITORIAL REDESIGN  
## Role  
Act as a senior product designer, frontend architect, Next.js engineer, editorial UX specialist and QA engineer.  
Your task is to redesign and implement the complete UpahJe.my website as a premium Malaysian business and technology knowledge publication.  
Repository: https://github.com/j00bi/upahje.my  
## Product identity  
UpahJe is an independent Malaysian knowledge publication.  
It publishes practical articles, explanations, buying guides and resources covering business, technology, finance, automation and other useful topics.  
It is NOT a freelancer marketplace, job board, SaaS product or corporate marketing website.  
Brand positioning:  
“Practical knowledge. Clearly explained.”  
The publication should make complicated subjects accessible, enjoyable to explore and useful in real life.  
## Design direction  
Create a premium editorial experience inspired by independent digital magazines and modern knowledge publications.  
Visual characteristics:  
* Warm ivory backgrounds.  
* Forest green and restrained lime accents.  
* Strong editorial typography.  
* Large, expressive headlines.  
* Thoughtful photography.  
* Generous whitespace.  
* Minimal borders and restrained card usage.  
* Clear content hierarchy.  
* Excellent mobile reading experience.  
Suggested palette:  
* Lime: #9FE870  
* Forest: #25382B  
* Ink: #242824  
* Paper: #FAF9F5  
* White: #FFFFFF  
* Muted: #777F73  
Use Newsreader or a comparable editorial serif for selected display typography, with Inter or an equivalent sans-serif for body content.  
Do not create a generic SaaS design.  
## Critical preservation requirements  
Before modifying anything, inspect the entire repository.  
Preserve:  
* Existing Markdown articles.  
* Existing article slugs and URLs.  
* English and Bahasa Melayu routes.  
* Translation relationships.  
* Existing content loaders.  
* Existing category definitions unless a taxonomy migration is approved.  
* Existing RSS and JSON feeds.  
* Sitemap and metadata functionality.  
* Existing validation scripts.  
* Existing deployment architecture.  
Do not replace working infrastructure without a demonstrable technical reason.  
## Implementation phases  
**Phase 0 — Repository audit**  
Inspect the complete codebase, package scripts, route structure, content files, shared components, styling, SEO, tests and deployment configuration.  
Produce docs/REDESIGN_AUDIT.md.  
Document existing functionality, dependencies, route inventory, content distribution, architectural risks and recommendations.  
Do not begin the redesign before completing the audit.  
**Phase 1 — Design system**  
Create a consistent editorial design system.  
Implement centralised design tokens, typography, spacing, colour variables, responsive containers, reusable layouts and accessible interaction primitives.  
Document the system in docs/DESIGN_SYSTEM.md.  
**Phase 2 — Shared site shell**  
Redesign:  
* Header.  
* Desktop navigation.  
* Mobile navigation.  
* Search entry point.  
* Language switcher.  
* Footer.  
* Shared page containers.  
Every control must work.  
**Phase 3 — Homepage (first visual milestone)**  
Rebuild the existing homepage using reusable components.  
Required sections:  
1. Editorial header.  
2. Publication introduction.  
3. Featured article.  
4. Latest articles.  
5. Existing topic explorer.  
6. Curated collections where actual content supports them.  
7. Newsletter only if a working integration exists.  
8. Editorial footer.  
Homepage headline direction:  
“Ideas worth understanding. Knowledge worth using.”  
Use real article data from the existing content loader.  
Featured article selection must use explicit metadata with a newest-published-article fallback.  
Never fabricate articles, authors or images.  
Implement independently for English and Bahasa Melayu.  
**Phase 4 — Article archive and topic pages**  
Build an editorial archive with useful article previews, category navigation, appropriate filtering, pagination and empty states.  
Topic pages must use real categories and content.  
Do not create empty categories or unnecessary taxonomies.  
**Phase 5 — Article experience**  
Build a premium reading experience.  
Include:  
* Breadcrumbs.  
* Category.  
* Headline and excerpt.  
* Author information when available.  
* Publication and update dates.  
* Reading time.  
* Hero image and attribution.  
* Article body.  
* Automatic table of contents.  
* Reading progress.  
* Share and copy-link controls.  
* Related articles.  
* Further reading.  
Preserve existing Markdown compatibility.  
Make tables, code blocks, images and long articles usable on mobile.  
**Phase 6 — Search**  
Implement real search against published article content.  
Search titles, excerpts and article body.  
Support language and category filtering.  
Provide useful empty states and accessible keyboard interactions.  
Do not introduce an external search provider without evidence that the existing architecture cannot handle the requirement.  
**Phase 7 — Bilingual experience**  
Preserve and improve English and Bahasa Melayu.  
Maintain translation relationships.  
Language switching should navigate to equivalent translations when available.  
Use correct language-specific metadata, canonical URLs and hreflang tags.  
Do not pretend missing translations exist.  
**Phase 8 — Editorial infrastructure**  
Extend existing Markdown frontmatter only where needed.  
Support optional:  
* Featured status.  
* Cover image.  
* Image alt text.  
* Article type.  
* Translation grouping.  
* Publication and update dates.  
Maintain backward compatibility.  
Improve content validation for malformed metadata, broken links, duplicate slugs, missing images and invalid translation relationships.  
Document the content model.  
**Phase 9 — SEO**  
Preserve public URLs.  
Maintain:  
* Canonical metadata.  
* Language alternates.  
* XML sitemap.  
* RSS.  
* JSON feeds.  
* robots.txt.  
* Existing llms.txt support.  
* Open Graph metadata.  
* Article structured data.  
* Internal linking.  
Use accurate structured data only.  
**Phase 10 — Performance and accessibility**  
Optimise images, fonts, server rendering and client JavaScript.  
Target Core Web Vitals:  
* LCP <= 2.5 seconds.  
* INP <= 200ms.  
* CLS <= 0.1.  
Target WCAG 2.2 AA.  
Support keyboard navigation, reduced motion, screen readers, visible focus and readable mobile layouts.  
**Phase 11 — QA**  
Run all applicable existing project checks.  
Verify:  
* English homepage.  
* Bahasa Melayu homepage.  
* Article archive.  
* Article pages.  
* Topic pages.  
* Search.  
* Translation switching.  
* Mobile navigation.  
* RSS and JSON feeds.  
* Sitemap.  
* Metadata.  
* Internal links.  
* Image loading.  
Capture screenshots at: 375px, 430px, 768px, 1366px, 1440px and 1920px.  
Use existing browser testing infrastructure where available.  
Fix discovered issues before preparing release.  
**Phase 12 — Release**  
Prepare incremental pull requests.  
Recommended order:  
1. Design system.  
2. Shared site shell.  
3. Homepage.  
4. Article experience.  
5. Archive and topic pages.  
6. Search.  
7. Bilingual and SEO improvements.  
8. Final QA.  
Never deploy to production without explicit approval.  
## Engineering constraints  
* Keep the existing framework and dependency ecosystem.  
* Prefer Server Components.  
* Use Client Components only for genuine interactions.  
* Avoid unnecessary dependencies.  
* Avoid duplicate design tokens.  
* Avoid hardcoded content where actual article data exists.  
* Maintain semantic HTML.  
* Avoid placeholder buttons.  
* Do not silently change public URLs.  
* Do not remove existing functionality without approval.  
## Required deliverables  
1. docs/REDESIGN_AUDIT.md  
2. docs/DESIGN_SYSTEM.md  
3. docs/CONTENT_MODEL.md  
4. Updated homepage.  
5. Updated shared layout.  
6. Updated article experience.  
7. Updated article archive and topic pages.  
8. Working search.  
9. Preserved bilingual functionality.  
10. Updated SEO and metadata.  
11. Tests and visual QA evidence.  
12. Updated project documentation.  
13. Pull requests with screenshots and implementation notes.  
## Working methodology  
Work in small, independently testable phases.  
At the end of each phase, report:  
* What was inspected.  
* What was implemented.  
* Files changed.  
* Tests executed.  
* Results.  
* Remaining issues.  
* Next phase.  
Do not claim tests passed unless they were actually executed.  
Do not stop after creating a visual mockup or homepage.  
The final result must be a working, cohesive editorial publication using the actual existing UpahJe content and infrastructure.  
## Definition of success  
A visitor should immediately understand what UpahJe publishes, discover something interesting, enjoy reading it and find another useful article.  
The website should feel like a credible independent Malaysian publication, not a generic blog template.  
Prioritise editorial quality, readability, content discovery, technical reliability and long-term maintainability.  
**17. My recommendation for execution**  
I’d use an agent with actual GitHub repository access and browser-based visual testing.  
The most important distinction is that the agent must work against the existing repository, not generate a replacement website from scratch.  
Recommended first milestone  
**PR #1 — UpahJe Editorial Foundation**  
* Complete repository audit.  
* New design tokens.  
* Shared navigation and footer.  
* Homepage implementation.  
* English and BM support.  
* Responsive screenshots.  
* Build and content validation.  
Reviewable milestone  
One practical dependency: GitHub needs to be connected in ChatGPT before I can directly inspect and modify your repository through the integration. The brief above is ready to hand to a coding agent in the meantime.  
My strongest advice: get the homepage right first, but build its components as the foundation of the entire publication. That way every subsequent page inherits the same editorial quality instead of becoming another isolated redesign.  
