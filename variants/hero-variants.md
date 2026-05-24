# Hero Section — Design Variants

**Date:** 2026-05-24
**Agent:** Hermes (DeepSeek V4 Pro)
**Purpose:** Best-of-3 design variants for UpahJe.my hero section

---

## Variant A: Search-First Hero

**Concept:** Maximum focus on search. Clean, minimal, functional.

**Layout:**
- Full-width gradient mesh background (teal → white)
- Centered content block
- Large search input with prominent CTA
- Rotating ticker below search

**Elements:**
```
┌─────────────────────────────────────────────────────────┐
│                    [GRADIENT MESH BG]                    │
│                                                         │
│         Nak Kahwin? Paip Tersumbat? Shoot Produk?       │
│              ↑ ROTATING TICKER (amber)                  │
│                                                         │
│    ┌──────────────────────────────────────────────┐     │
│    │   Cari servis… contoh: photographer, plumber  │     │
│    └──────────────────────────────────────────────┘     │
│                    [ CARI ] button                       │
│                                                         │
│      Popular: [Wedding] [Paip] [Cleaner] [Runner]        │
│                                                         │
│         NAK UPAH ORANG?    │    NAK CARI UPAH?          │
│           [Cari Servis]    │    [Jadi Freelancer]        │
└─────────────────────────────────────────────────────────┘
```

**Pros:**
- Maximum search prominence
- Clear primary action
- Familiar pattern (like Google/Amazon)

**Cons:**
- Less personality
- Slightly generic

---

## Variant B: Problem-Story Hero

**Concept:** Emotional hook with story-based categories.

**Layout:**
- Split layout: left text, right category icons
- Bold headline addressing pain point
- Category grid as visual anchors

**Elements:**
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   ADA MAJLIS NAK COVER?                                  │
│   Ada rumah nak settle?                                   │
│   Ada kerja nak siap?                                    │
│                                                          │
│   ➤ Services organized by your problems:                 │
│                                                          │
│   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐        │
│   │  📸    │  │  🏠    │  │  💻    │  │  📚    │        │
│   │ Event  │  │ Home   │  │ Tech   │  │ Tutor  │        │
│   └────────┘  └────────┘  └────────┘  └────────┘        │
│                                                          │
│   [ CARI SERVIS ]        [ JADI FREELANCER ]             │
└─────────────────────────────────────────────────────────┘
```

**Pros:**
- Emotionally resonant
- Problem-first approach
- Visual category discovery

**Cons:**
- Busier layout
- Categories compete with search

---

## Variant C: Community-Marketplace Hero

**Concept:** Human faces, trust signals, local focus.

**Layout:**
- Featured talent preview on right
- Trust badges and stats on left
- Community-focused messaging

**Elements:**
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   🇲🇾 100% Malaysia. Verified. Secure.                   │
│                                                          │
│   Find trusted local talent                              │
│   for anything you need done.                            │
│                                                          │
│   ✓ MyKad Verified  ✓ Escrow Protected  ✓ RM0 Fee      │
│                                                          │
│   ┌──────────────────┐    ┌────────────────────────┐  │
│   │  Search Bar      │    │  Featured Talent Card   │  │
│   │  Cari servis...  │    │  [Photo] Aina Razali     │  │
│   └──────────────────┘    │  ✓ Photographer          │  │
│                          │  📍 Kuala Lumpur         │  │
│                          │  RM 800/day               │  │
│                          └────────────────────────────┘  │
│                                                          │
│          [ CARI SERVIS ]    [ JADI FREELANCER ]         │
└─────────────────────────────────────────────────────────┘
```

**Pros:**
- Maximum trust signals
- Human element (talent preview)
- Clear value props (MyKad, Escrow, RM0)

**Cons:**
- Less space for search
- Talent card may distract

---

## Recommendation

**Selected:** Variant A (Search-First)

**Rationale:**
1. Search-first aligns with user's stated preference for "search-first mechanic"
2. Clean and functional — focuses on core action
3. Easy to implement and test
4. Room for expansion (add trust signals below)

**Implementation:**
- Use current hero as base
- Simplify to single-column centered layout
- Keep rotating ticker as unique identifier
- Move category grid to below fold

---

*Variants stored for future A/B testing reference.*