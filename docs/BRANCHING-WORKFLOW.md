# UpahJe.my Branching Workflow

This repo uses a lightweight branch tree so product ideas can be explored without dirtying the deploy branch.

## Permanent branches

| Branch | Purpose |
| --- | --- |
| `main` | Production/Vercel deploy branch. Only merge verified changes. |
| `integration/current-verified` | Latest locally verified checkpoint. Base for new work. |

## Iteration branches

Create one branch per idea from `integration/current-verified`:

```bash
git switch integration/current-verified
git switch -c idea/<short-feature-name>
```

Suggested active idea branches:

| Branch | Purpose |
| --- | --- |
| `idea/booking-calendar` | Talent UpahJe booking calendar / availability slots. |
| `idea/m3-applications-matching` | Application review, employer acceptance, matching loop. |
| `idea/m5-payments-escrow` | Payment unlock after accepted booking/agreement. |
| `idea/marketplace-polish` | UX audit fixes, navigation cleanup, visual consistency. |

## Commit rules

1. Keep `main` clean and deployable.
2. Never leave dirty work overnight: commit to the current idea branch.
3. Before merging an idea branch, run:

```bash
npm test
npm run typecheck
npm run build
```

4. Merge idea branches back into `integration/current-verified` first.
5. Only fast-forward or PR verified integration into `main`.

## Standard flow

```bash
# start idea
git switch integration/current-verified
git switch -c idea/booking-calendar

# work + verify
npm test
npm run typecheck
npm run build

git add -A
git commit -m "feat: add booking calendar skeleton"

# integrate
git switch integration/current-verified
git merge --no-ff idea/booking-calendar
npm test && npm run typecheck && npm run build

# deploy only when ready
git switch main
git merge --ff-only integration/current-verified
git push origin main
```

## Safety rule

If the repo is dirty and the ownership is unclear, make a checkpoint branch first:

```bash
git switch -c checkpoint/<date>-dirty-state
git add -A
git commit -m "chore: checkpoint dirty working tree"
```

Then split or revert from that checkpoint deliberately.
