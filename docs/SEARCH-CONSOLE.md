# Getting upahje.my into Google Search Console

Two paths. The DNS record is the sturdier one; the HTML tag needs a deploy but no
DNS access. Either proves ownership of the domain; only one is needed.

Nothing here can be done by an agent: Google issues the string after you create
the property, and DNS is yours at Shinjiru.

## Path A — DNS TXT record (recommended)

1. Go to `search.google.com/search-console` → **Add property** → **Domain** →
   `upahje.my`.
2. Google shows a TXT record whose value looks like:

   ```
   google-site-verification=AbCdEf1234567890xYz-WvUtSrQpOnMlKjIhGfEdCbA
   ```

   That value is generated for your property; copy it exactly, including the
   `google-site-verification=` prefix.
3. At Shinjiru's DNS panel for `upahje.my`, add:

   | Type | Host | Value | TTL |
   |---|---|---|---|
   | TXT | `@` (or `upahje.my`) | the whole string from step 2 | 3600 |

4. Back in Search Console press **Verify**. Propagation is usually minutes, and
   Google will keep retrying for a couple of days if you press it early.
5. Once verified: **Sitemaps** → submit `https://upahje.my/sitemap.xml`, then use
   **URL Inspection** on the ten pages that matter and press **Request indexing**.

## Path B — HTML tag (no DNS access needed)

1. In Search Console choose **URL prefix** → `https://upahje.my` instead of
   **Domain**, so it offers the HTML tag method.
2. Copy the token from the tag it shows:

   ```html
   <meta name="google-site-verification" content="TOKEN_GOES_HERE" />
   ```

3. Paste only the token into Vercel → Settings → Environment Variables:

   | Name | Value | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | the token | Production |

4. Redeploy. The root layout reads that variable and emits the meta tag on every
   page; nothing else needs to change.
5. Verify in Search Console, then submit the sitemap as in Path A step 5.

### If you cannot redeploy quickly

The static-file method also works without a code change: Search Console offers a
file named `google<token>.html` whose content is one line. Save it as
`public/google<token>.html` in the repo, push, and it is served at
`https://upahje.my/google<token>.html` after the deploy. Ask me and I will add
the file — it is a two-line change, and I will not touch DNS.

## What to check afterwards

- Search Console → **Pages**: indexed count and the four reasons for exclusion.
- **Sitemaps**: status should read *Success* and the discovered count should move
  towards 68.
- **URL Inspection** → "URL is on Google" for a sample article.
- Bing Webmaster is a separate property; IndexNow already pings it on every
  deploy, so only the dashboard view is missing there.
