#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const CartridgeLinter = require('../validators/cartridge-lint');

console.log('🚀 VibeCore - Validating All Cartridges\n');

const cartridgesDir = path.join(__dirname, '..', 'cartridges');
const tiers = ['prototype', 'productizing', 'production'];

let totalFiles = 0;
let validFiles = 0;
let invalidFiles = 0;
const issues = [];

for (const tier of tiers) {
  const tierPath = path.join(cartridgesDir, tier);
  
  if (!fs.existsSync(tierPath)) {
    console.log(`⚠️  Tier directory not found: ${tier}`);
    continue;
  }
  
  const files = fs.readdirSync(tierPath).filter(f => f.endsWith('.md'));
  
  console.log(`\n📂 Validating ${tier} tier (${files.length} cartridges)`);
  
  for (const file of files) {
    const filePath = path.join(tierPath, file);
    const linter = new CartridgeLinter();
    
    // Suppress console output during validation
    const originalLog = console.log;
    console.log = () => {};
    
    const result = linter.lint(filePath);
    
    // Restore console
    console.log = originalLog;
    
    totalFiles++;
    
    if (result.valid) {
      validFiles++;
      console.log(`  ✅ ${file}`);
    } else {
      invalidFiles++;
      console.log(`  ❌ ${file}`);
      issues.push({
        file: `${tier}/${file}`,
        errors: result.errors,
        warnings: result.warnings
      });
    }
  }
}

console.log('\n' + '='.repeat(50));
console.log('📊 Validation Summary\n');
console.log(`Total cartridges: ${totalFiles}`);
console.log(`✅ Valid: ${validFiles}`);
console.log(`❌ Invalid: ${invalidFiles}`);

if (issues.length > 0) {
  console.log('\n⚠️  Issues Found:\n');
  for (const issue of issues) {
    console.log(`📄 ${issue.file}`);
    if (issue.errors.length > 0) {
      console.log('  Errors:');
      issue.errors.forEach(e => console.log(`    • ${e.message}`));
    }
    if (issue.warnings.length > 0) {
      console.log('  Warnings:');
      issue.warnings.forEach(w => console.log(`    • ${w.message}`));
    }
  }
  process.exit(1);
} else {
  console.log('\n✨ All cartridges are valid!');
}
