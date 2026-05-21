# Onboarding Winner Selection — Official Decision

**Date**: 2026-05-19
**Decided by**: Hermes (Orchestrator)
**Status**: Final

## Final Choices

### Labour / Talent Starting Flow
- **Winner**: D — Hybrid (Quick First)
- **Rationale**: Allows users to start fast with minimal details and become visible quickly. Full profile completion can be done progressively. Best balance between speed-to-visibility and data quality.

### Technical Talent Onboarding
- **Winner**: Mix of B (Showcase/Accordion) + A (Stepper)
- **Rationale**: Combine the strengths of portfolio-first expandable sections (B) with structured guided steps (A). Gives professionals both creative control and clear progression.

### Employer Onboarding
- **Winner**: E1 — Simple 3-step Wizard
- **Rationale**: Classic, reliable flow (Company → Needs → Volume). Straightforward and low cognitive load.

## Implementation Guidance for Codex

1. Make **Labour Variant D (Hybrid)** the primary/default flow for new talent signups.
2. For Technical talent, create a hybrid component that blends:
   - Portfolio-first showcase/accordion experience
   - Stepper navigation for users who prefer linear guidance
3. Make **Employer Variant E1** the default 3-step wizard.
4. Keep other variants available (in a "Try other styles" section or settings) for future A/B testing.
5. Ensure all chosen flows properly persist data to Prisma/Supabase on completion.
6. After onboarding, redirect users to their role-specific dashboard.

## Next Actions
- Codex to implement wiring + hybrid Technical flow
- Hermes to review integration once delivered
- Update STATUS.md and KANBAN.md with this decision

**Logged to**: memory-wiki + project docs
