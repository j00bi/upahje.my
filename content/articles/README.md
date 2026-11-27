# Articles

One file per language, in the language's folder:

    content/articles/en/<slug>.md
    content/articles/ms/<slug>.md

Markdown only, no MDX components (the site renders a Markdown subset, no MDX
Runtime). The full contract is in `docs/ARTICLES.md`; `content/fixtures/` holds
Test articles used by `npm run articles:check` and the fixture build, and is not
served.
