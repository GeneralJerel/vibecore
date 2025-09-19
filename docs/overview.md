# VibeCore Overview

## What is VibeCore?

VibeCore is a system of **Markdown Cartridges** that makes AI-assisted coding deterministic and reliable. It solves the problem of inconsistent outputs from AI coding tools (Cursor, Lovable, v0, etc.) by providing standardized, versioned templates that enforce specific technical choices.

## The Problem We Solve

When you use AI coding tools today, the same prompt can produce:
- Different tech stacks (Next.js vs Remix, npm vs pnpm)
- Different patterns (Redux vs Zustand, REST vs GraphQL)
- Different conventions (file structure, naming, testing approaches)

This creates:
- **Broken handoffs** between team members
- **Merge conflicts** from inconsistent code styles
- **Trust erosion** as teams can't rely on predictable outputs
- **Wasted time** fixing AI-generated inconsistencies

## The Solution: Markdown Cartridges

Cartridges are structured markdown documents that act as contracts between you and the AI. They specify:
- **Exact technical choices** (framework, database, auth, etc.)
- **Forbidden patterns** to prevent drift
- **Quality gates** that must pass
- **Step-by-step instructions** for the AI to follow

## Core Concepts

### 1. Stacks
Pre-defined technology combinations that work well together:
- `next-react-trpc-prisma` - Modern full-stack TypeScript
- `remix-react-rest-prisma` - SSR-first with REST
- `nuxt-vue-pinia-drizzle` - Vue ecosystem
- `sveltekit-edge-drizzle` - Edge-optimized

### 2. Tiers
Three levels of strictness based on your needs:
- **Prototype** - Fast iteration, minimal guardrails
- **Productizing** - Team-ready with testing and conventions
- **Production** - Enterprise-grade with full observability

### 3. Cartridges
Specific features or scaffolds that follow a stack:
- **Baselines** - Complete app scaffolds
- **Features** - Auth, CRUD, payments, etc.
- **Patterns** - Design systems, testing setups, CI/CD

## How It Works

### Step 1: Choose Your Stack
Pick from our pre-defined stacks or propose a new one. This locks in your fundamental tech choices.

### Step 2: Select Cartridges
Choose cartridges that match your needs:
- Start with a baseline cartridge for your app scaffold
- Add feature cartridges as needed
- All cartridges must be from the same stack family

### Step 3: Apply in Your AI Tool
1. Copy the loader prompt
2. Paste your cartridge content
3. Add your specific inputs
4. Get consistent, predictable output

### Step 4: Validate
Run the quality gates specified in the cartridge to ensure the generated code meets standards.

## Example Workflow

Building a SaaS app with Next.js:

```bash
# 1. Choose stack
Stack: next-react-trpc-prisma

# 2. Apply baseline
Cartridge: cartridges/productizing/next-baseline.md
Inputs: appName: "my-saas"

# 3. Add authentication
Cartridge: cartridges/productizing/auth-standard.md
Inputs: providers: [google, github]

# 4. Add CRUD for resources
Cartridge: cartridges/productizing/crud-trpc-prisma.md
Inputs: resourceName: "Project"

# 5. Validate
npm run lint
npm run typecheck
npm run test
```

## Benefits

### For Individuals
- **Faster development** - No decision paralysis
- **Better code quality** - Built-in best practices
- **Learning tool** - See how experts structure code

### For Teams
- **Consistency** - Everyone generates the same patterns
- **Onboarding** - New members productive immediately
- **Code reviews** - Predictable patterns to review
- **Standards enforcement** - Guardrails prevent drift

### For Organizations
- **Compliance** - Enforce security and regulatory requirements
- **Reduced risk** - Tested, proven patterns
- **Lower costs** - Less rework and debugging
- **Faster delivery** - Reliable from prototype to production

## Getting Started

### Quick Start
1. Browse cartridges in `/cartridges/`
2. Read the usage guide in `/tools/paste-this-into-cursor.md`
3. Try a prototype cartridge in your favorite AI tool
4. Run the quality gates to verify output

### Contributing
See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on:
- Creating new cartridges
- Proposing new stacks
- Improving existing patterns

### Validation
Test your cartridges locally:
```bash
npm install
npm run lint:cartridge path/to/cartridge.md
```

## Philosophy

### Deterministic > Flexible
We prioritize predictable outputs over maximum flexibility. Constraints enable consistency.

### Explicit > Implicit
Every technical choice is declared, not inferred. No hidden defaults.

### Versioned > Latest
Lock versions to prevent drift. Upgrade deliberately, not accidentally.

### Tool-agnostic > Tool-specific
Works with any AI that accepts markdown. Not locked to one platform.

## FAQ

### Q: Can I modify cartridges for my team?
A: Yes! Fork the repo and customize cartridges for your specific needs. The validator ensures they remain internally consistent.

### Q: What if I need a technology not in any stack?
A: Propose a new stack! Open an issue with your use case and we'll help you define it.

### Q: Do cartridges work with non-TypeScript projects?
A: While our examples focus on TypeScript, the concept works for any language. Contribute cartridges for Python, Go, Rust, etc.

### Q: How do cartridges stay updated?
A: Cartridges are versioned. We release updates for security patches and major framework changes. You choose when to upgrade.

### Q: Can I use multiple cartridges together?
A: Yes, as long as they're from the same stack family. Apply them sequentially for best results.

## Next Steps

1. **Explore**: Browse existing cartridges
2. **Try**: Use a cartridge in your AI tool
3. **Validate**: Run quality gates on generated code
4. **Contribute**: Share your patterns with the community

Ready to make your AI coding deterministic? Start with our [quickstart guide](../tools/paste-this-into-cursor.md) →
