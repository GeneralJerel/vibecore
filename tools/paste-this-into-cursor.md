# How to Use Cartridges in AI Coding Tools

This guide shows you how to use VibeCore cartridges in Cursor, Lovable, v0, or any AI coding assistant.

## Quick Start (Copy & Paste)

### Step 1: The Loader (paste this first)

```
You are an AI coding assistant. Follow the "Cartridge" instructions strictly.

CRITICAL RULES:
1. The Cartridge defines all technical choices - follow them exactly
2. If your default behavior conflicts with the Cartridge, the Cartridge wins
3. Generate all code according to the Cartridge's Stack Contract
4. Implement all items in the Cartridge's Quality Gates
5. Respect all Guardrails - especially the "Forbidden" section
6. Follow the exact steps listed in "Steps the Agent Must Follow"

Acknowledge by listing the main sections you've read from the Cartridge.
```

### Step 2: The Cartridge (paste the full content)

Copy the entire content of your chosen cartridge from `/cartridges/<tier>/<name>.md`

### Step 3: Your Inputs (customize these)

```markdown
## My Inputs

appName: my-awesome-app
description: A project management tool for remote teams
features: 
  - User authentication with Google OAuth
  - Project CRUD operations
  - Real-time collaboration
primaryColor: indigo
authProviders: [google, github]
```

## Complete Example

Here's a full example using the Next.js baseline cartridge:

````markdown
You are an AI coding assistant. Follow the "Cartridge" instructions strictly.

CRITICAL RULES:
1. The Cartridge defines all technical choices - follow them exactly
2. If your default behavior conflicts with the Cartridge, the Cartridge wins
3. Generate all code according to the Cartridge's Stack Contract
4. Implement all items in the Cartridge's Quality Gates
5. Respect all Guardrails - especially the "Forbidden" section
6. Follow the exact steps listed in "Steps the Agent Must Follow"

Acknowledge by listing the main sections you've read from the Cartridge.

---

[PASTE FULL CARTRIDGE CONTENT HERE]

---

## My Inputs

appName: task-tracker
description: Simple task management for individuals
features:
  - Task CRUD with categories
  - Due dates and priorities
  - Basic dashboard
primaryColor: blue
darkMode: true
````

## Tips for Best Results

### 1. Choose the Right Tier

- **Prototype**: Quick experiments, POCs, hackathons
- **Productizing**: Team projects, features going to staging
- **Production**: Mission-critical features, enterprise apps

### 2. Provide Complete Inputs

Always provide all required inputs listed in the cartridge. Check the "Inputs" section for:
- Required parameters
- Optional parameters with defaults
- Correct format for each input

### 3. Verify the Output

After generation, check that:
- [ ] All files match the expected structure
- [ ] The code compiles/builds without errors
- [ ] Quality gates pass (run the commands listed)
- [ ] No forbidden technologies were used

### 4. Run Quality Gates

Always run the quality gates after generation:

```bash
# Example from productizing tier
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Common Patterns

### For CRUD Operations

```markdown
## My Inputs

resourceName: Product
resourceNamePlural: Products
fields:
  - name: name
    type: string
    required: true
  - name: price
    type: number
    required: true
    validation:
      min: 0
  - name: description
    type: string
    required: false
  - name: categoryId
    type: relation
    relation:
      to: Category
      type: one-to-many
permissions:
  create: [admin, manager]
  read: [admin, manager, user]
  update: [admin, manager]
  delete: [admin]
```

### For Authentication

```markdown
## My Inputs

authProviders: [google, github, email]
mfaEnabled: true
sessionDuration: 3600
passwordRequirements:
  minLength: 8
  requireUppercase: true
  requireNumbers: true
  requireSpecialChars: true
```

### For Feature Flags

```markdown
## My Inputs

features:
  - key: new-dashboard
    defaultValue: false
    rolloutPercentage: 10
  - key: advanced-search
    defaultValue: true
    rolloutPercentage: 100
```

## Troubleshooting

### AI ignores the cartridge

**Solution**: Emphasize the loader more strongly:

```
CRITICAL: You MUST follow the Cartridge below. It overrides ALL your defaults.
Any deviation from the Cartridge instructions is an error.
```

### Generated code doesn't match stack

**Problem**: The AI uses Vue components in a React stack

**Solution**: Point out the specific violation:
```
The cartridge specifies React but you generated Vue code. 
Please regenerate following the Stack Contract exactly.
```

### Quality gates fail

**Problem**: Linting or type errors in generated code

**Solution**: Ask the AI to fix specific issues:
```
The following quality gates failed:
- pnpm lint: 5 errors
- pnpm typecheck: 3 type errors

Please fix these issues while maintaining the cartridge requirements.
```

## Working with Multiple Cartridges

You can compose multiple cartridges for complex features:

1. Start with a baseline cartridge (e.g., `next-baseline`)
2. Add feature cartridges (e.g., `auth-standard`, `crud-trpc-prisma`)
3. Ensure they're from the same stack family
4. Apply them in sequence, not all at once

Example sequence:
```
1. First prompt: Apply next-baseline cartridge
2. Second prompt: Apply auth-standard cartridge
3. Third prompt: Apply crud-trpc-prisma for User resource
4. Fourth prompt: Apply crud-trpc-prisma for Project resource
```

## Platform-Specific Notes

### Cursor
- Use Composer for multi-file changes
- Cmd+K for inline edits
- Reference cartridge file with @ if in workspace

### Lovable
- Best for complete app generation
- Paste entire cartridge in initial prompt
- Use follow-up prompts for refinements

### v0
- Excellent for UI components
- Focus on the UI/styling parts of cartridges
- May need manual integration for backend

### Claude/ChatGPT
- Works with any AI that accepts markdown
- May need to break into smaller chunks
- Explicitly request file-by-file output

## Getting Help

- **Validation Issues**: Run `npm run lint:cartridge <path>` locally
- **Stack Questions**: Check `/stacks/*.yml` for available options
- **Contributing**: See [CONTRIBUTING.md](../CONTRIBUTING.md)
- **Issues**: Report at [GitHub Issues](https://github.com/yourusername/vibecore/issues)
