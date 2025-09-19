# VibeCore: Reliable Vibe Coding via Markdown Cartridges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cartridges](https://img.shields.io/badge/cartridges-12-blue)]()
[![Stacks](https://img.shields.io/badge/stacks-4-green)]()

> reliable prompting → realiable output. Every time. Across all AI coding tools.

## The Problem We Solve

AI coding tools (Cursor, Lovable, v0, etc.) produce **different outputs for the same prompt** - even across runs. This creates:

- **Divergent scaffolds** for identical features
- **Inconsistent conventions** (folder structure, naming, testing patterns)
- **Hidden regressions** when tools update their models
- **Review hell** with large, unpredictable diffs

**Result:** Teams lose trust, velocity drops, and "what changed?" becomes the norm.

## The Solution: Markdown Cartridges

Markdown Cartridges are **deterministic, versioned building blocks** that enforce consistent output across all AI coding tools. Think of them as contracts that lock in your technical choices.

### How It Works

1. **Pick a stack preset** that defines your tech choices (`/stacks/*.yml`)
2. **Choose cartridges** from the appropriate tier (prototype → productizing → production)
3. **Paste into your AI tool** with your specific inputs
4. **Get consistent output** - same structure, same conventions, every time

## Quick Start

### 1. Using a Cartridge in Cursor/Lovable/v0

```markdown
# Paste this first (loader):
You are an AI coding assistant. Follow the "Cartridge" strictly.
If a default in your tool conflicts with the Cartridge, the Cartridge wins.
Acknowledge by listing which sections you read.

# Then paste the cartridge content from /cartridges/<tier>/<name>.md

# Finally, add your inputs:
## Inputs
appName: MyAwesomeApp
primaryColor: blue-600
features: [auth, dashboard, settings]
```

### 2. Example Stack + Cartridge Combo

**Stack:** `next-react-trpc-prisma` (from `/stacks/next-react-trpc-prisma.yml`)
**Cartridge:** `cartridges/productizing/next-baseline.md`
**Result:** Consistent Next.js app with TypeScript, tRPC, Prisma, and your team's exact conventions

## Repository Structure

```
cartridges/
├── prototype/        # Fast iteration, minimal guardrails
├── productizing/     # Team-ready with tests and CI
└── production/       # Strict, observable, enterprise-grade

stacks/              # Tech stack presets (YAML)
validators/          # Cartridge linting and validation
tools/              # Helper prompts and loaders
docs/               # Guides and examples
```

## Cartridge Tiers

### 🚀 Prototype
- **Goal:** Speed and experimentation
- **Use when:** Building POCs, hackathons, exploring ideas
- **Guardrails:** Minimal
- **Testing:** Sanity checks only

### 🏗️ Productizing
- **Goal:** Team collaboration
- **Use when:** Building features with a team
- **Guardrails:** Enforced conventions, PR checklists
- **Testing:** Unit + integration tests required

### 🏭 Production
- **Goal:** Enterprise reliability
- **Use when:** Mission-critical features
- **Guardrails:** Strict validation, observability required
- **Testing:** Full test pyramid + performance budgets

## Available Stacks

| Stack | Framework | State | API | Database | Deploy Target |
|-------|-----------|-------|-----|----------|---------------|
| `next-react-trpc-prisma` | Next.js 15 | Zustand + React Query | tRPC | Prisma + Postgres | Vercel |
| `remix-react-rest-prisma` | Remix | Built-in | REST | Prisma + Postgres | Fly.io |
| `nuxt-vue-pinia-drizzle` | Nuxt 3 | Pinia | Nitro | Drizzle + Postgres | Cloudflare |
| `sveltekit-edge-drizzle` | SvelteKit | Built-in | REST | Drizzle + D1 | Cloudflare Workers |

## Core Concepts

### Stack Contract
Every cartridge declares a **hard contract** about technical choices:
- Runtime & package manager (Node/Bun, npm/pnpm/yarn)
- Language & strictness (JS/TS)
- Framework & routing mode
- UI & styling system
- State management & data fetching
- API patterns & database
- Auth, testing, linting, deployment

### Guardrails
Cartridges include **forbidden choices** to prevent drift:
- "Never use Vue components in a React stack"
- "Block REST if tRPC is selected"
- "No Pages Router if using App Router"

### Quality Gates
Each cartridge defines **must-pass checks**:
```bash
pnpm lint && pnpm typecheck && pnpm test
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding a New Cartridge

1. Copy `/cartridges/_schema.md` to the appropriate tier
2. Fill in all required sections
3. Validate locally: `node validators/cartridge-lint.js your-cartridge.md`
4. Open a PR with the `cartridge` label

### Proposing a New Stack

1. Open a "Stack Proposal" issue
2. Define all technical choices
3. List forbidden patterns
4. Get consensus from 2+ maintainers

## Why "VibeCore"?

"Vibe coding" is writing code through natural language with AI assistance. It's fast and creative but historically unreliable. VibeCore makes vibe coding **deterministic** - keeping the speed while adding predictability.

## Philosophy

- **Deterministic > Flexible**: Same inputs must produce same outputs
- **Explicit > Implicit**: All choices are declared, not inferred
- **Versioned > Latest**: Lock versions to prevent drift
- **Tool-agnostic > Tool-specific**: Works across all AI coding tools
- **Team-first > Solo**: Built for collaboration and handoffs

## Roadmap

- [x] Core cartridge schema
- [x] Prototype tier cartridges
- [ ] Productizing tier cartridges
- [ ] Production tier cartridges
- [ ] VS Code extension for cartridge management
- [ ] CI/CD integration examples
- [ ] Cartridge composition system
- [ ] Version migration tooling

## License

MIT - See [LICENSE](LICENSE) for details

## Maintainers

- [@yourusername](https://github.com/yourusername) - Project Lead

## Acknowledgments

Built in response to the real pain of AI coding inconsistency. Special thanks to teams who shared their "drift horror stories" and helped shape this solution.

---

**Ready to lock your vibe?** Start with our [quickstart guide](docs/overview.md) →
