# VibeCore: Reliable Vibe Coding via Markdown Cartridges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cartridges](https://img.shields.io/badge/cartridges-4-blue)]()
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

### Two-Tier System

We use a simple two-tier approach:

1. **🎨 Prototyping** - Frontend-only with mock data for rapid UI/UX iteration
2. **🚀 Production** - Full-stack with real backend for deployable applications

## Quick Start

### Option 1: Use Ready-to-Copy Prompts (Easiest!)

We provide complete, self-contained prompts ready to copy-paste:

```bash
# For UI Mockups (no backend):
1. Open: cartridges/ready-to-use/prototyping/1-next-mockup.md
2. Copy ALL content (Cmd+A, Cmd+C)
3. Paste into Cursor/Lovable/v0
4. Customize the inputs section
5. Press Enter → Beautiful mockup with fake data!

# For Full-Stack Apps (with backend):
1. Open: cartridges/ready-to-use/production/1-next-full-stack.md
2. Copy ALL content (Cmd+A, Cmd+C)
3. Paste into Cursor/Lovable/v0
4. Customize the inputs section
5. Press Enter → Complete deployable application!
```

### Option 2: Use Individual Cartridges

For more control, use the cartridge system directly:

```markdown
# Paste this loader first:
You are an AI coding assistant. Follow the "Cartridge" strictly.
If a default in your tool conflicts with the Cartridge, the Cartridge wins.

# Then paste a cartridge from /cartridges/<tier>/<name>.md

# Finally add your inputs:
## My Inputs
appName: MyAwesomeApp
primaryColor: indigo
features: [dashboard, user-management, analytics]
```

## Repository Structure

```
cartridges/
├── prototyping/     # Frontend-only with mock data
│   ├── next-baseline.md
│   └── dashboard-mockup.md
├── production/      # Full-stack with real backend
│   ├── next-baseline.md
│   └── crud-resource.md
└── ready-to-use/    # Complete copy-paste prompts
    ├── prototyping/
    │   └── 1-next-mockup.md    # Full mockup prompt
    └── production/
        └── 1-next-full-stack.md # Full app prompt

stacks/              # Tech stack presets (YAML)
validators/          # Cartridge linting and validation
tools/              # Helper prompts and loaders
docs/               # Guides and examples
```

## Cartridge Tiers Explained

### 🎨 Prototyping Tier
- **Purpose:** Rapid UI/UX validation with beautiful mockups
- **Backend:** None - frontend only with mock data
- **Database:** None - uses localStorage for persistence
- **Authentication:** Fake auth with localStorage
- **Use Cases:** 
  - Design sprints and workshops
  - Client demos and presentations
  - Concept validation
  - User testing
  - Investor pitches
- **Output:** Interactive, beautiful mockups that look real
- **Time to Result:** ~5 minutes

### 🚀 Production Tier
- **Purpose:** Build real, deployable applications
- **Backend:** Complete with API, database, auth
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Real OAuth and session management
- **Use Cases:**
  - SaaS applications
  - Enterprise software
  - Startup MVPs
  - Production deployments
- **Output:** Full-stack applications ready for Vercel
- **Time to Result:** ~15 minutes

## How It Works

### Prototyping Workflow
```mermaid
1. Need to validate UI/UX?
   ↓
2. Copy prototyping prompt
   ↓
3. Paste into AI tool
   ↓
4. Get beautiful mockup with fake data
   ↓
5. Show to stakeholders
   ↓
6. Iterate on design
```

### Production Workflow
```mermaid
1. Ready to build real app?
   ↓
2. Copy production prompt
   ↓
3. Paste into AI tool
   ↓
4. Get full-stack application
   ↓
5. Configure environment
   ↓
6. Deploy to Vercel
```

## Available Stacks

| Stack | Framework | State | API | Database | Deploy Target |
|-------|-----------|-------|-----|----------|---------------|
| `next-react-trpc-prisma` | Next.js 15 | Zustand + React Query | tRPC | Prisma + Postgres | Vercel |
| `remix-react-rest-prisma` | Remix | Built-in | REST | Prisma + Postgres | Fly.io |
| `nuxt-vue-pinia-drizzle` | Nuxt 3 | Pinia | Nitro | Drizzle + Postgres | Cloudflare |
| `sveltekit-edge-drizzle` | SvelteKit | Built-in | REST | Drizzle + D1 | Cloudflare Workers |

## Real-World Example: Building a Startup

Let's say you receive this prompt:

> "Build me portfolioagents.io - a startup that turns resumes into AI-powered portfolio sites"

### Step 1: Start with Prototyping (5 minutes)
```bash
# Validate the UI/UX first
1. Copy cartridges/ready-to-use/prototyping/1-next-mockup.md
2. Paste into Cursor
3. Customize inputs with your branding
4. Get beautiful mockup to show stakeholders
```

### Step 2: Build Production Version (15 minutes)
```bash
# Once design is approved
1. Copy cartridges/ready-to-use/production/1-next-full-stack.md
2. Paste into Cursor
3. Customize with real features
4. Deploy to production
```

## Key Benefits

### Why Two Tiers?
- **Clear Separation:** Mock data vs Real backend - no confusion
- **Faster Iteration:** Validate UI before building backend
- **Better Workflow:** Design → Approve → Build
- **Cost Effective:** Don't build backend until design is validated

### Why Ready-to-Use?
- **Zero Assembly:** Complete prompts, not fragments
- **Self-Contained:** Everything in one file
- **Beginner Friendly:** Just copy and paste
- **Time Saving:** No need to understand cartridge system

## Core Concepts

### Deterministic Output
Every cartridge specifies exact:
- Tech stack choices
- File structure
- Naming conventions
- Code patterns
- Testing approach

### Guardrails
Cartridges include "forbidden" lists to prevent drift:
- No Vue in React projects
- No npm if using pnpm
- No Pages Router if using App Router

### Quality Gates
Each cartridge defines validation steps:
```bash
# Prototyping
pnpm build  # Just needs to build

# Production
pnpm lint && pnpm typecheck && pnpm test
```

## Philosophy

- **Deterministic > Flexible**: Same inputs must produce same outputs
- **Explicit > Implicit**: All choices are declared, not inferred
- **Versioned > Latest**: Lock versions to prevent drift
- **Tool-agnostic > Tool-specific**: Works across all AI coding tools
- **Simple > Complex**: Two tiers instead of many

## Getting Started

### For Designers/PMs (Prototyping)
1. Open `cartridges/ready-to-use/prototyping/`
2. Copy the entire markdown file
3. Paste into any AI coding tool
4. Customize the inputs
5. Get your mockup!

### For Developers (Production)
1. Open `cartridges/ready-to-use/production/`
2. Copy the entire markdown file
3. Paste into any AI coding tool
4. Customize the inputs
5. Deploy your app!

## Roadmap

- [x] Core cartridge schema  
- [x] Prototyping tier (frontend-only with mock data)
- [x] Production tier (full-stack applications)
- [x] Ready-to-use copy-paste prompts
- [x] Real-world startup examples
- [ ] More example cartridges
- [ ] VS Code extension for cartridge management
- [ ] Web-based cartridge builder
- [ ] Community cartridge marketplace

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide
1. Choose a tier (prototyping or production)
2. Copy the schema from `/cartridges/_schema.md`
3. Fill in all sections
4. Validate: `npm run lint:cartridge your-cartridge.md`
5. Submit PR

## License

MIT - See [LICENSE](LICENSE) for details

## Maintainers

- [@yourusername](https://github.com/yourusername) - Project Lead

## Acknowledgments

Built to solve the real pain of AI coding inconsistency. Special thanks to teams who shared their "drift horror stories" and helped shape this solution.

---

**Ready to make your AI coding deterministic?** 

🎨 **Start prototyping** → [Copy a mockup prompt](cartridges/ready-to-use/prototyping/)

🚀 **Build production** → [Copy a full-stack prompt](cartridges/ready-to-use/production/)