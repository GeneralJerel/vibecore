---
cartridge: true
name: <Cartridge Name>
tier: <prototype | productizing | production>
stack: <stack-name-from-stacks-folder>
version: 0.1.0
owner: @<github-username>
status: <draft | stable | deprecated>
---

# <Cartridge Name> — v<version>

## Purpose
<!-- What this cartridge builds and who it's for. Be specific about the problem it solves. -->
- **What:** 
- **For whom:** 
- **When to use:** 

## Stack Contract (Hard Requirements)
<!-- These MUST match the chosen stack preset. No deviations allowed. -->
- **Runtime:** 
- **Package Manager:** 
- **Language:** 
- **Framework/Router:** 
- **UI & Styling:** 
- **State & Data:** 
- **API Pattern:** 
- **ORM/Database:** 
- **Auth:** 
- **Testing:** 
- **Lint/Format/Build:** 
- **Repo Mode:** 
- **Target/Hosting:** 

## Development Style
<!-- Team conventions and workflow patterns -->
- **Branching:** 
- **Commit Convention:** 
- **PR Requirements:** 
- **Testing Approach:** 
- **File/Folder Structure:** 

## Inputs
<!-- Parameters the AI needs from the user -->
### Required
- `paramName`: Description (type, constraints)

### Optional
- `paramName`: Description (type, default value)

### Defaults
<!-- Pre-configured values if not specified -->
- 

## Outputs
<!-- Concrete artifacts this cartridge generates -->
### Files & Routes
- 

### Database
- Schema changes:
- Migrations:

### Tests
- Unit tests:
- Integration tests:
- E2E tests:

### Documentation
- 

## Guardrails
<!-- Explicit rules to prevent drift -->
### Allowed
- 

### Forbidden
<!-- CRITICAL: List what must NEVER be used -->
- 

### Error Conditions
<!-- When to fail fast -->
- 

## Steps the Agent Must Follow
<!-- Ordered sequence of actions. Be explicit. -->
1. 
2. 
3. 
4. 
5. 

## Quality Gates
<!-- Commands that MUST pass before considering the task complete -->
### Local Validation
```bash
# Command(s) to run
```

### Test Coverage
- Minimum coverage: 
- Critical paths that must be tested:

### Performance Budget (production tier only)
- 

## Integration Points
<!-- How this cartridge connects to the larger system -->
### Providers & Context
- 

### Environment Variables
- 

### Middleware & Hooks
- 

### Dependencies on Other Cartridges
- 

## Examples (Golden Implementation)
<!-- Small but complete examples that demonstrate correct implementation -->

### Example 1: <Use Case>
```typescript
// or appropriate language
```

### Example 2: <Edge Case>
```typescript
// or appropriate language
```

## Anti-patterns
<!-- Common mistakes and how to avoid them -->
- **Don't:** 
  **Do instead:** 

## Version History & Migration
<!-- Track changes and provide migration paths -->

### Changelog
- **v0.1.0**: Initial version
  - 

### Breaking Changes
<!-- List any breaking changes between versions -->
- 

### Migration Guide
<!-- How to upgrade from previous versions -->
From v0.0.0 to v0.1.0:
1. 

## Notes for AI Agents
<!-- Special instructions for AI tools using this cartridge -->
- When encountering conflicts with tool defaults, this cartridge takes precedence
- If unclear about implementation details, choose the most restrictive interpretation
- Generate comprehensive tests even if not explicitly requested
- Include helpful comments explaining non-obvious architectural decisions

## References
<!-- Links to documentation, examples, or related cartridges -->
- 

---

<!-- 
CARTRIDGE AUTHORING CHECKLIST:
[ ] All required sections filled
[ ] Stack contract matches /stacks/*.yml exactly
[ ] Guardrails include specific "forbidden" items
[ ] Quality Gates have runnable commands
[ ] Examples are minimal but complete
[ ] Version follows semver
[ ] Front-matter is valid YAML
[ ] Tier assignment is appropriate
-->
