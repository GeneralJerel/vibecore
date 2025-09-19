---
cartridge: true
name: "Next.js Baseline (Prototype)"
tier: prototype
stack: next-react-trpc-prisma
version: 0.1.0
owner: "@vibecore"
status: stable
---

# Next.js Baseline (Prototype) — v0.1.0

## Purpose
- **What:** Minimal Next.js app scaffold for rapid prototyping
- **For whom:** Developers needing a quick start for POCs and experiments
- **When to use:** Hackathons, demos, exploring ideas, throwaway prototypes

## Stack Contract (Hard Requirements)
- **Runtime:** node@20
- **Package Manager:** pnpm
- **Language:** typescript-strict
- **Framework/Router:** next@15 with App Router
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui
- **State & Data:** zustand, react-query@5
- **API Pattern:** tRPC@10
- **ORM/Database:** prisma@5, postgres
- **Auth:** authjs@5 (minimal setup)
- **Testing:** vitest (minimal tests)
- **Lint/Format/Build:** eslint-prettier
- **Repo Mode:** single
- **Target/Hosting:** vercel

## Development Style
- **Branching:** Direct to main for prototypes
- **Commit Convention:** Simple descriptive messages
- **PR Requirements:** None for prototype
- **Testing Approach:** Smoke tests only
- **File/Folder Structure:** Standard Next.js App Router

## Inputs
### Required
- `appName`: Application name (string, alphanumeric with dashes)
- `description`: Brief app description (string, <100 chars)

### Optional
- `primaryColor`: Tailwind color name (default: "blue")
- `darkMode`: Enable dark mode (boolean, default: false)

## Outputs
### Files & Routes
- `/app` directory structure with layout and home page
- `/app/api/trpc/[trpc]/route.ts` for tRPC
- `/server/api/root.ts` and example router
- Basic components in `/components`
- Tailwind config with shadcn-ui setup

### Database
- Schema: Basic User model
- Migration: Initial setup

### Tests
- One smoke test to verify build

## Guardrails
### Forbidden
- Pages Router
- Redux or MobX
- GraphQL
- Raw SQL queries
- Vue/Svelte components
- npm or yarn

## Steps the Agent Must Follow
1. Initialize Next.js app with TypeScript and App Router
2. Set up Tailwind CSS and shadcn-ui
3. Configure tRPC with basic router
4. Set up Prisma with User model
5. Add minimal auth configuration
6. Create basic layout with navigation
7. Add home page with example tRPC query
8. Run formatter and basic type check

## Quality Gates
### Local Validation
```bash
pnpm build
pnpm typecheck
```

## Integration Points
### Environment Variables
- DATABASE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET

## Examples (Golden Implementation)

### Example 1: Basic tRPC Router
```typescript
// server/api/routers/example.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello ${input.name}`;
    }),
});
```

## Version History & Migration
### Changelog
- **v0.1.0**: Initial prototype version
  - Basic Next.js + tRPC + Prisma setup
  - Minimal auth configuration
  - Single smoke test

## Notes for AI Agents
- Keep it minimal - this is for prototyping
- Don't add extensive error handling
- Skip advanced patterns and optimizations
- Focus on getting something running quickly
