#!/usr/bin/env node

/**
 * Cartridge Linter
 * Validates cartridge files for proper structure, required sections, and stack compliance
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Required sections in order
const REQUIRED_SECTIONS = [
  'Purpose',
  'Stack Contract',
  'Development Style',
  'Inputs',
  'Outputs',
  'Guardrails',
  'Steps the Agent Must Follow',
  'Quality Gates',
  'Integration Points',
  'Examples',
  'Version History'
];

// Valid tiers
const VALID_TIERS = ['prototype', 'productizing', 'production'];

// Valid statuses
const VALID_STATUSES = ['draft', 'stable', 'deprecated'];

class CartridgeLinter {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stacks = {};
    this.loadStacks();
  }

  loadStacks() {
    const stacksDir = path.join(__dirname, '..', 'stacks');
    if (!fs.existsSync(stacksDir)) {
      this.error('Stacks directory not found');
      return;
    }

    const stackFiles = fs.readdirSync(stacksDir).filter(f => f.endsWith('.yml'));
    for (const file of stackFiles) {
      try {
        const content = fs.readFileSync(path.join(stacksDir, file), 'utf8');
        const stack = yaml.load(content);
        this.stacks[stack.name] = stack;
      } catch (err) {
        this.error(`Failed to load stack ${file}: ${err.message}`);
      }
    }
  }

  error(message, line = null) {
    this.errors.push({ message, line });
  }

  warning(message, line = null) {
    this.warnings.push({ message, line });
  }

  validateFrontMatter(frontMatter) {
    // Check required fields
    const requiredFields = ['cartridge', 'name', 'tier', 'stack', 'version', 'owner', 'status'];
    for (const field of requiredFields) {
      if (!(field in frontMatter)) {
        this.error(`Missing required front matter field: ${field}`);
      }
    }

    // Validate cartridge flag
    if (frontMatter.cartridge !== true) {
      this.error('Front matter cartridge field must be true');
    }

    // Validate tier
    if (frontMatter.tier && !VALID_TIERS.includes(frontMatter.tier)) {
      this.error(`Invalid tier: ${frontMatter.tier}. Must be one of: ${VALID_TIERS.join(', ')}`);
    }

    // Validate stack exists
    if (frontMatter.stack && !this.stacks[frontMatter.stack]) {
      this.error(`Unknown stack: ${frontMatter.stack}. Available stacks: ${Object.keys(this.stacks).join(', ')}`);
    }

    // Validate version format (semver)
    if (frontMatter.version && !/^\d+\.\d+\.\d+/.test(frontMatter.version)) {
      this.error(`Invalid version format: ${frontMatter.version}. Use semver (e.g., 1.0.0)`);
    }

    // Validate status
    if (frontMatter.status && !VALID_STATUSES.includes(frontMatter.status)) {
      this.error(`Invalid status: ${frontMatter.status}. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    // Validate owner format
    if (frontMatter.owner && !frontMatter.owner.startsWith('@')) {
      this.warning(`Owner should start with @ (e.g., @username): ${frontMatter.owner}`);
    }

    return frontMatter.stack;
  }

  validateSections(content) {
    const lines = content.split('\n');
    const foundSections = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('## ')) {
        const section = line.substring(3).trim();
        foundSections.push(section);
      }
    }

    // Check required sections
    for (const section of REQUIRED_SECTIONS) {
      if (!foundSections.some(s => s.startsWith(section))) {
        this.error(`Missing required section: ## ${section}`);
      }
    }

    // Check section order
    const orderedSections = foundSections.filter(s => 
      REQUIRED_SECTIONS.some(rs => s.startsWith(rs))
    );
    
    let lastIndex = -1;
    for (const section of orderedSections) {
      const expectedIndex = REQUIRED_SECTIONS.findIndex(rs => section.startsWith(rs));
      if (expectedIndex < lastIndex) {
        this.warning(`Section "${section}" is out of order. Expected order: ${REQUIRED_SECTIONS.join(', ')}`);
      }
      lastIndex = expectedIndex;
    }
  }

  validateStackCompliance(content, stackName) {
    if (!stackName || !this.stacks[stackName]) return;

    const stack = this.stacks[stackName];
    const forbidden = stack.forbidden || [];
    
    // Check for forbidden terms in content
    for (const term of forbidden) {
      // Create patterns to check for imports, requires, or usage
      const patterns = [
        new RegExp(`import.*from.*['"\`].*${term}.*['"\`]`, 'gi'),
        new RegExp(`require\\(.*['"\`].*${term}.*['"\`].*\\)`, 'gi'),
        new RegExp(`from.*['"\`].*${term}.*['"\`]`, 'gi'),
      ];

      for (const pattern of patterns) {
        if (pattern.test(content)) {
          this.error(`Forbidden technology "${term}" detected in examples for stack "${stackName}"`);
        }
      }

      // Also check for framework-specific patterns
      if (term === 'vue' && /new Vue\(|createApp\(/gi.test(content)) {
        this.error(`Vue.js code detected but forbidden in stack "${stackName}"`);
      }
      if (term === 'svelte' && /<script.*lang="ts">|\.svelte/gi.test(content)) {
        this.error(`Svelte code detected but forbidden in stack "${stackName}"`);
      }
      if (term === 'redux' && /createStore|useDispatch|useSelector/gi.test(content)) {
        this.error(`Redux code detected but forbidden in stack "${stackName}"`);
      }
    }

    // Validate required technologies are mentioned
    const requiredTechs = [
      stack.framework,
      stack.language,
      stack.orm,
      stack.api,
    ].filter(Boolean);

    for (const tech of requiredTechs) {
      const techName = typeof tech === 'string' ? tech.split('@')[0] : tech;
      const techRegex = new RegExp(techName, 'i');
      if (!techRegex.test(content)) {
        this.warning(`Expected technology "${techName}" not mentioned in cartridge content`);
      }
    }
  }

  validateQualityGates(content) {
    const qualityGatesSection = this.extractSection(content, 'Quality Gates');
    if (!qualityGatesSection) return;

    // Check for bash commands
    if (!qualityGatesSection.includes('```bash') && !qualityGatesSection.includes('```sh')) {
      this.error('Quality Gates section must include runnable bash commands');
    }

    // Check for common commands based on tier
    const lines = content.split('\n');
    const tierLine = lines.find(l => l.includes('tier:'));
    if (tierLine) {
      const tier = tierLine.split(':')[1].trim();
      
      if (tier === 'productizing' || tier === 'production') {
        const expectedCommands = ['lint', 'typecheck', 'test'];
        for (const cmd of expectedCommands) {
          if (!qualityGatesSection.includes(cmd)) {
            this.warning(`Expected command containing "${cmd}" in Quality Gates for ${tier} tier`);
          }
        }
      }
    }
  }

  validateExamples(content) {
    const examplesSection = this.extractSection(content, 'Examples');
    if (!examplesSection) return;

    // Check for code blocks
    if (!examplesSection.includes('```')) {
      this.error('Examples section must include code blocks');
    }

    // Check for proper language tags
    const codeBlockRegex = /```(\w+)?/g;
    let match;
    while ((match = codeBlockRegex.exec(examplesSection)) !== null) {
      if (!match[1]) {
        this.warning('Code blocks in Examples should specify a language (e.g., ```typescript)');
      }
    }
  }

  extractSection(content, sectionName) {
    const lines = content.split('\n');
    let inSection = false;
    let sectionContent = [];
    
    for (const line of lines) {
      if (line.startsWith('## ') && line.includes(sectionName)) {
        inSection = true;
        continue;
      }
      if (inSection && line.startsWith('## ')) {
        break;
      }
      if (inSection) {
        sectionContent.push(line);
      }
    }
    
    return sectionContent.join('\n');
  }

  lint(filePath) {
    console.log(`\n🔍 Linting: ${filePath}\n`);

    if (!fs.existsSync(filePath)) {
      this.error(`File not found: ${filePath}`);
      return this.report();
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract and validate front matter
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) {
      this.error('Missing front matter');
    } else {
      try {
        const frontMatter = yaml.load(frontMatterMatch[1]);
        const stackName = this.validateFrontMatter(frontMatter);
        
        // Get content without front matter
        const bodyContent = content.substring(frontMatterMatch[0].length);
        
        // Run validations
        this.validateSections(bodyContent);
        this.validateStackCompliance(bodyContent, stackName);
        this.validateQualityGates(bodyContent);
        this.validateExamples(bodyContent);
        
      } catch (err) {
        this.error(`Invalid YAML in front matter: ${err.message}`);
      }
    }

    return this.report();
  }

  report() {
    const hasErrors = this.errors.length > 0;
    const hasWarnings = this.warnings.length > 0;

    if (hasErrors) {
      console.log('❌ Errors found:\n');
      this.errors.forEach(({ message, line }) => {
        console.log(`  • ${message}${line ? ` (line ${line})` : ''}`);
      });
    }

    if (hasWarnings) {
      console.log('\n⚠️  Warnings:\n');
      this.warnings.forEach(({ message, line }) => {
        console.log(`  • ${message}${line ? ` (line ${line})` : ''}`);
      });
    }

    if (!hasErrors && !hasWarnings) {
      console.log('✅ Cartridge is valid!\n');
    }

    console.log('\n📊 Summary:');
    console.log(`  Errors: ${this.errors.length}`);
    console.log(`  Warnings: ${this.warnings.length}`);

    // Exit with error code if errors found
    if (hasErrors) {
      process.exit(1);
    }

    return {
      valid: !hasErrors,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node cartridge-lint.js <cartridge-file.md>');
    console.log('\nExample:');
    console.log('  node validators/cartridge-lint.js cartridges/productizing/next-baseline.md');
    process.exit(1);
  }

  const linter = new CartridgeLinter();
  linter.lint(args[0]);
}

module.exports = CartridgeLinter;
