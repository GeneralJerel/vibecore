# Contributing to VibeCore

Thank you for your interest in contributing to VibeCore! This guide will help you understand how to contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Contributing a New Cartridge](#contributing-a-new-cartridge)
- [Contributing a New Stack](#contributing-a-new-stack)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/vibecore.git
   cd vibecore
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Types of Contributions We Welcome

- **New Cartridges**: Standardized patterns for common features
- **Stack Presets**: New technology stack combinations
- **Documentation**: Improvements to guides and examples
- **Bug Fixes**: Issues with validators or tooling
- **Examples**: Real-world usage examples
- **Translations**: Help make VibeCore accessible globally

### Before You Start

1. Check existing [issues](https://github.com/yourusername/vibecore/issues) and [pull requests](https://github.com/yourusername/vibecore/pulls)
2. For new cartridges, search existing cartridges to avoid duplication
3. For significant changes, open an issue first to discuss

## Contributing a New Cartridge

### 1. Choose the Right Tier

- **prototyping/**: Frontend-only with mock data, for UI/UX validation
- **production/**: Full-stack with real backend, for deployable applications

### 2. Select a Stack

Your cartridge must target one of our existing stacks:
- `next-react-trpc-prisma`
- `remix-react-rest-prisma`
- `nuxt-vue-pinia-drizzle`
- `sveltekit-edge-drizzle`

Need a new stack? See [Contributing a New Stack](#contributing-a-new-stack).

### 3. Create Your Cartridge

1. Copy the schema template:
   ```bash
   cp cartridges/_schema.md cartridges/<tier>/<your-cartridge>.md
   ```

2. Fill in all required sections:
   - Front matter (YAML)
   - Purpose
   - Stack Contract
   - Development Style
   - Inputs/Outputs
   - Guardrails
   - Steps
   - Quality Gates
   - Examples
   - Version History

3. Validate your cartridge:
   ```bash
   npm run lint:cartridge cartridges/<tier>/<your-cartridge>.md
   ```

### 4. Test Your Cartridge

Test in at least one AI coding tool:

1. Copy the loader from `tools/paste-this-into-cursor.md`
2. Paste your cartridge content
3. Add sample inputs
4. Verify the generated code:
   - Matches expected output
   - Passes quality gates
   - Follows guardrails

### 5. Document Your Testing

In your PR, include:
- Which AI tools you tested with
- Screenshots or code samples of output
- Confirmation that quality gates pass

## Contributing a New Stack

### 1. Create a Stack Proposal

Open an issue using the "Stack Proposal" template with:
- Technology choices for all layers
- Justification for the stack
- Forbidden patterns
- Example use cases

### 2. Define the Stack

Create a YAML file in `/stacks/`:

```yaml
name: your-stack-name
runtime: node@20
pkgManager: pnpm
language: typescript-strict
framework: your-framework
ui:
  - ui-library
  - css-framework
state:
  - state-management
api: api-pattern
orm: orm-choice
db: database
auth: auth-solution
tests:
  - test-framework
lint: linting-setup
build: build-tool
repo: repo-structure
deploy: deployment-target

forbidden:
  - incompatible-tech-1
  - incompatible-tech-2

environment:
  KEY_NAME: "description"
```

### 3. Create Example Cartridges

Provide at least one cartridge for each tier using your stack.

## Style Guidelines

### Cartridge Writing

- Use clear, descriptive names
- Write comprehensive examples
- Include both positive and negative patterns
- Specify exact versions where applicable
- Use consistent formatting

### Code Examples

- Use TypeScript for type safety
- Include necessary imports
- Add helpful comments
- Show error handling
- Demonstrate best practices

### Documentation

- Use proper Markdown formatting
- Include code syntax highlighting
- Provide working examples
- Link to relevant references

## Testing

### Validator Testing

Run the linter on your cartridge:
```bash
npm run lint:cartridge cartridges/<tier>/<name>.md
```

### Manual Testing Checklist

- [ ] Cartridge generates expected file structure
- [ ] Generated code compiles without errors
- [ ] Quality gates pass (lint, typecheck, test)
- [ ] Guardrails are enforced
- [ ] Works in multiple AI tools

## Pull Request Process

### 1. Prepare Your PR

- Ensure all tests pass
- Update documentation if needed
- Add entries to relevant changelogs
- Bump version numbers appropriately

### 2. PR Title Format

Use conventional commits:
- `feat(cartridge): add auth-oauth2 cartridge`
- `fix(validator): correct section order checking`
- `docs: improve quickstart guide`
- `chore: update dependencies`

### 3. PR Description

Use our PR template and include:
- Clear description of changes
- Testing performed
- Screenshots/examples of output
- Related issues

### 4. Review Process

1. Automated checks will run
2. Maintainer will review within 48 hours
3. Address feedback promptly
4. Once approved, maintainer will merge

### 5. After Merge

- Delete your feature branch
- Pull the latest main branch
- Celebrate your contribution! 🎉

## Questions?

- Open an issue for bugs or unclear documentation
- Start a discussion for design decisions
- Reach out to maintainers for guidance

## Recognition

Contributors will be:
- Listed in our README
- Credited in release notes
- Given credit as cartridge owners

Thank you for helping make AI coding more reliable! 🚀
