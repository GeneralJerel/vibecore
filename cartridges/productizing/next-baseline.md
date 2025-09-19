---
cartridge: true
name: "Next.js Baseline (Team-Ready)"
tier: productizing
stack: next-react-trpc-prisma
version: 1.0.0
owner: "@vibecore"
status: stable
---

# Next.js Baseline (Team-Ready) — v1.0.0

## Purpose
- **What:** Production-ready Next.js application scaffold with team conventions
- **For whom:** Development teams building collaborative features
- **When to use:** Starting new features, team projects, MVPs heading to production

## Stack Contract (Hard Requirements)
- **Runtime:** node@20
- **Package Manager:** pnpm with lockfile
- **Language:** typescript-strict with additional rules
- **Framework/Router:** next@15 with App Router
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui
- **State & Data:** zustand with devtools, react-query@5, tRPC@10
- **API Pattern:** tRPC with input validation and error handling
- **ORM/Database:** prisma@5 with migrations, postgres
- **Auth:** authjs@5 with session management
- **Testing:** vitest for unit, playwright for e2e
- **Lint/Format/Build:** eslint-prettier with team rules
- **Repo Mode:** single or turborepo
- **Target/Hosting:** vercel with preview deployments

## Development Style
- **Branching:** feature branches with naming convention: `feat/`, `fix/`, `chore/`
- **Commit Convention:** Conventional Commits (feat:, fix:, docs:, etc.)
- **PR Requirements:** Must pass CI, requires 1 review, PR template required
- **Testing Approach:** Unit tests for utilities, integration for API, E2E for critical paths
- **File/Folder Structure:** 
  ```
  app/
    (marketing)/     # Public pages
    (app)/          # Authenticated app
    api/            # API routes
  components/
    ui/             # shadcn components
    features/       # Feature-specific components
  server/
    api/            # tRPC routers
    db/             # Database client
  lib/              # Utilities
  ```

## Inputs
### Required
- `appName`: Application name (string, kebab-case)
- `description`: App description for metadata (string)
- `features`: List of initial features to scaffold (array)
- `authProviders`: Authentication providers (array: google|github|email)

### Optional
- `primaryColor`: Tailwind color (default: "blue")
- `darkMode`: Enable dark mode (boolean, default: true)
- `analytics`: Analytics provider (string: vercel|plausible|none, default: "none")
- `errorTracking`: Error tracking (string: sentry|none, default: "none")

### Defaults
- TypeScript strict mode enabled
- Prettier with 2-space indentation
- ESLint with recommended rules
- Git hooks with husky and lint-staged

## Outputs
### Files & Routes
- Complete app structure with marketing/app split
- tRPC routers with proper error handling
- Reusable UI components with shadcn-ui
- Type-safe environment variable handling
- Docker setup for local development
- CI/CD workflow files

### Database
- Schema: User, Session, Account models for auth
- Schema: Audit fields (createdAt, updatedAt) on all models
- Migrations: Properly versioned
- Seed script for development

### Tests
- Unit tests for all utilities
- Integration tests for tRPC procedures
- E2E tests for authentication flow
- Component tests for critical UI

### Documentation
- README with setup instructions
- API documentation
- Environment variable documentation
- Deployment guide

## Guardrails
### Allowed
- Modular file organization
- Proper error boundaries
- Loading and error states
- Accessibility attributes

### Forbidden
- Pages Router usage
- Direct database queries (must use Prisma)
- Untyped API responses
- Client-side secrets
- Console.log in production code
- Any files from Vue/Svelte
- npm or yarn usage
- Redux, MobX, or Recoil

### Error Conditions
- Fail if TypeScript strict checks don't pass
- Fail if no error handling in tRPC procedures
- Fail if auth endpoints are unprotected
- Fail if environment variables are hardcoded

## Steps the Agent Must Follow
1. Initialize Next.js with TypeScript and strict configuration
2. Set up project structure with clear separation of concerns
3. Configure Tailwind CSS with custom design tokens
4. Install and configure shadcn-ui with theme provider
5. Set up tRPC with proper error handling and logging
6. Configure Prisma with audit fields and soft deletes
7. Implement authentication with session management
8. Create reusable layout components with loading states
9. Add comprehensive error boundaries
10. Set up testing infrastructure with example tests
11. Configure git hooks for pre-commit checks
12. Create Docker Compose for local development
13. Add CI/CD workflows for GitHub Actions

## Quality Gates
### Local Validation
```bash
# Must all pass
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm build
pnpm test:e2e
```

### Test Coverage
- Minimum coverage: 70% for utilities, 80% for API
- Critical paths that must be tested:
  - Authentication flow (login/logout/session)
  - Protected route access
  - API error handling
  - Form validation

### Performance Budget
- Lighthouse score: >90 for performance
- First Contentful Paint: <1.8s
- Time to Interactive: <3.9s

## Integration Points
### Providers & Context
- ThemeProvider for dark mode
- SessionProvider for auth
- QueryClient for data fetching
- TRPCProvider for API

### Environment Variables
```env
# Required
NODE_ENV=development|production
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>

# OAuth (if enabled)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional
SENTRY_DSN=
NEXT_PUBLIC_ANALYTICS_ID=
```

### Middleware & Hooks
- Auth middleware for protected routes
- Request logging middleware
- Rate limiting on API routes
- CORS configuration

### Dependencies on Other Cartridges
- Can compose with: auth-standard, crud-trpc-prisma, analytics-events
- Requires: None

## Examples (Golden Implementation)

### Example 1: Protected tRPC Procedure
```typescript
// server/api/routers/user.ts
import { z } from 'zod';
import { 
  createTRPCRouter, 
  protectedProcedure,
  TRPCError 
} from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      bio: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const updated = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            ...input,
            updatedAt: new Date(),
          },
        });
        
        return { success: true, user: updated };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update profile',
          cause: error,
        });
      }
    }),
});
```

### Example 2: Error Boundary Component
```typescript
// app/providers.tsx
'use client';

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <pre className="mt-2 text-sm text-gray-500">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
```

## Anti-patterns
- **Don't:** Use `any` types in TypeScript
  **Do instead:** Define proper interfaces and types
  
- **Don't:** Handle errors with console.log
  **Do instead:** Use proper error boundaries and logging service

- **Don't:** Store sensitive data in localStorage
  **Do instead:** Use secure httpOnly cookies via NextAuth

- **Don't:** Make direct database calls from components
  **Do instead:** Use tRPC procedures with proper authorization

## Version History & Migration
### Changelog
- **v1.0.0**: Production-ready version
  - Complete testing setup
  - Error handling and logging
  - Performance optimizations
  - Security best practices
  - Team conventions enforced

### Breaking Changes
- v0.1.0 → v1.0.0: Complete restructure, not directly upgradeable

### Migration Guide
From prototype (v0.1.0) to productizing (v1.0.0):
1. Back up existing code
2. Generate fresh scaffold with v1.0.0
3. Migrate business logic piece by piece
4. Update environment variables
5. Run comprehensive tests

## Notes for AI Agents
- Always include proper TypeScript types
- Generate comprehensive error handling
- Include loading and error states for all async operations
- Follow accessibility best practices (ARIA labels, semantic HTML)
- Generate tests alongside implementation
- Use conventional commits for any git operations
- Include helpful comments for complex logic
- Ensure all user inputs are validated on both client and server

## References
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [tRPC Best Practices](https://trpc.io/docs/bestpractices)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
