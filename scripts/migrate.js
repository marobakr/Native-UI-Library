#!/usr/bin/env node

/**
 * Autonomous Migration Runner
 * 
 * This script prepares and triggers the autonomous migration workflow.
 * It generates the exact prompt to paste into GitHub Copilot.
 * 
 * Usage:
 *   npm run migrate:start   - Start fresh migration
 *   npm run migrate:resume  - Resume from last checkpoint
 *   npm run migrate:status  - Show current status
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// File paths
const migrationDir = resolve(rootDir, '.migration');
const stateFile = resolve(migrationDir, 'state.json');
const manifestFile = resolve(migrationDir, 'manifest.json');

// Ensure migration directory exists
if (!existsSync(migrationDir)) {
  mkdirSync(migrationDir, { recursive: true });
}

/**
 * Initialize migration state
 */
function initializeState() {
  const initialState = {
    version: '1.0.0',
    initialized: new Date().toISOString(),
    currentPhase: 'not-started',
    currentStep: null,
    currentComponent: null,
    lastCheckpoint: null,
    canResume: false,
    nextAction: {
      phase: 'discovery',
      step: 'initial-scan',
      instruction: 'Start migration by discovering Angular UI Library structure'
    },
    progress: {
      phasesCompleted: [],
      componentsCompleted: [],
      totalComponents: 0,
      completedComponents: 0
    }
  };

  writeFileSync(stateFile, JSON.stringify(initialState, null, 2));
  console.log('✅ Migration state initialized');
  return initialState;
}

/**
 * Load current state
 */
function loadState() {
  if (!existsSync(stateFile)) {
    return initializeState();
  }
  
  const content = readFileSync(stateFile, 'utf-8');
  return JSON.parse(content);
}

/**
 * Generate migration prompt for GitHub Copilot
 */
function generateMigrationPrompt(state, mode = 'start') {
  const prompt = [];

  // Header
  prompt.push('# Autonomous Migration Command');
  prompt.push('');

  if (mode === 'resume' && state.canResume) {
    // Resume from checkpoint
    prompt.push(`## Resuming Migration`);
    prompt.push('');
    prompt.push(`**Current Status:**`);
    prompt.push(`- Phase: ${state.currentPhase}`);
    prompt.push(`- Step: ${state.currentStep || 'N/A'}`);
    prompt.push(`- Component: ${state.currentComponent || 'N/A'}`);
    prompt.push(`- Last Checkpoint: ${state.lastCheckpoint}`);
    prompt.push('');
    prompt.push(`**Progress:**`);
    prompt.push(`- Completed: ${state.progress.completedComponents}/${state.progress.totalComponents} components`);
    prompt.push('');
  } else {
    // Start fresh
    prompt.push('## Starting Fresh Migration');
    prompt.push('');
  }

  // Main instruction
  prompt.push('---');
  prompt.push('');
  prompt.push('## Instruction for GitHub Copilot Agent');
  prompt.push('');
  prompt.push('@native-ui-engineer');
  prompt.push('');

  if (mode === 'resume' && state.canResume) {
    prompt.push(`Resume the autonomous migration from the last checkpoint.`);
  } else {
    prompt.push(`Start the autonomous migration workflow.`);
  }

  prompt.push('');
  prompt.push('**Your Mission:**');
  prompt.push('Execute the migration workflow autonomously following these instructions:');
  prompt.push('');
  prompt.push('1. **Read State:**');
  prompt.push('   - Read `.migration/state.json` to understand current position');
  prompt.push('   - Read `.github/workflows/migration-workflow.md` for workflow definition');
  prompt.push('   - Read `.github/agents/migration-agent.md` for your operating instructions');
  prompt.push('');
  prompt.push('2. **Execute Current Phase:**');
  prompt.push(`   - Current Phase: ${state.nextAction.phase}`);
  prompt.push(`   - Current Step: ${state.nextAction.step}`);
  prompt.push(`   - Next Action: ${state.nextAction.instruction}`);
  prompt.push('');
  prompt.push('3. **Work Autonomously:**');
  prompt.push('   - Execute each step in the workflow');
  prompt.push('   - Verify your work after each step');
  prompt.push('   - Update state.json and manifest.json as you progress');
  prompt.push('   - Create checkpoints at logical stopping points');
  prompt.push('   - Continue until you reach a checkpoint or complete the phase');
  prompt.push('');
  prompt.push('4. **Key Rules:**');
  prompt.push('   - ❌ NEVER invent design values');
  prompt.push('   - ✅ ALWAYS extract from Angular source');
  prompt.push('   - ✅ Record missing information instead of guessing');
  prompt.push('   - ✅ Verify every extracted value against source');
  prompt.push('   - ✅ Update state.json after every action');
  prompt.push('');
  prompt.push('5. **Report Progress:**');
  prompt.push('   - Tell me what phase/step you\'re working on');
  prompt.push('   - Show verification results');
  prompt.push('   - Report any missing information found');
  prompt.push('   - Let me know when you reach a checkpoint');
  prompt.push('');
  prompt.push('**Angular Source:**https://git.vf-eg.internal.vodafone.com/WEB/vf-dynamic-catalog-components/-/tree/master');
  prompt.push('');
  prompt.push('---');
  prompt.push('');
  prompt.push('**Now begin autonomous execution. Work through the workflow step by step.**');

  return prompt.join('\n');
}

/**
 * Show migration status
 */
function showStatus(state) {
  console.log('\n📊 Migration Status\n');
  console.log('═══════════════════════════════════════\n');
  
  console.log(`Phase: ${state.currentPhase}`);
  console.log(`Step: ${state.currentStep || 'N/A'}`);
  
  if (state.currentComponent) {
    console.log(`Current Component: ${state.currentComponent}`);
  }
  
  console.log('');
  console.log('Progress:');
  console.log(`  Completed Components: ${state.progress.completedComponents}/${state.progress.totalComponents}`);
  console.log(`  Phases Completed: ${state.progress.phasesCompleted.join(', ') || 'None'}`);
  
  if (state.lastCheckpoint) {
    console.log(`\nLast Checkpoint: ${state.lastCheckpoint}`);
  }
  
  console.log('');
  console.log('Next Action:');
  console.log(`  Phase: ${state.nextAction.phase}`);
  console.log(`  Step: ${state.nextAction.step}`);
  console.log(`  Action: ${state.nextAction.instruction}`);
  
  console.log('\n═══════════════════════════════════════\n');
  
  if (state.canResume) {
    console.log('✅ Can resume from checkpoint');
    console.log('   Run: npm run migrate:resume');
  } else {
    console.log('▶️  Ready to start');
    console.log('   Run: npm run migrate:start');
  }
  
  console.log('');
}

/**
 * Main function
 */
function main() {
  const command = process.argv[2] || 'status';
  const state = loadState();

  switch (command) {
    case 'start': {
      console.log('\n🚀 Starting Fresh Migration\n');
      console.log('═══════════════════════════════════════\n');
      
      // Reset state
      const freshState = initializeState();
      
      // Generate prompt
      const prompt = generateMigrationPrompt(freshState, 'start');
      
      console.log('✅ Migration initialized\n');
      console.log('📋 Copy the following prompt and paste into GitHub Copilot Chat:\n');
      console.log('═══════════════════════════════════════\n');
      console.log(prompt);
      console.log('\n═══════════════════════════════════════\n');
      console.log('💡 Tip: The agent will work autonomously. Just paste this prompt!\n');
      break;
    }

    case 'resume': {
      if (!state.canResume) {
        console.log('\n⚠️  Cannot resume - no checkpoint found');
        console.log('   Run: npm run migrate:start\n');
        return;
      }

      console.log('\n🔄 Resuming Migration\n');
      console.log('═══════════════════════════════════════\n');
      
      // Generate resume prompt
      const prompt = generateMigrationPrompt(state, 'resume');
      
      console.log('📋 Copy the following prompt and paste into GitHub Copilot Chat:\n');
      console.log('═══════════════════════════════════════\n');
      console.log(prompt);
      console.log('\n═══════════════════════════════════════\n');
      console.log('💡 Tip: The agent will resume from where it left off!\n');
      break;
    }

    case 'status': {
      showStatus(state);
      break;
    }

    case 'reset': {
      console.log('\n⚠️  Resetting migration state...\n');
      const freshState = initializeState();
      console.log('✅ Migration state reset\n');
      showStatus(freshState);
      break;
    }

    default: {
      console.log('\n📖 Migration Commands:\n');
      console.log('  npm run migrate:start   - Start fresh migration');
      console.log('  npm run migrate:resume  - Resume from last checkpoint');
      console.log('  npm run migrate:status  - Show current status');
      console.log('  npm run migrate:reset   - Reset migration state');
      console.log('');
    }
  }
}

main();
