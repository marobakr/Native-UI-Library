#!/usr/bin/env node

/**
 * Check for updates in Angular UI Library
 * 
 * This script:
 * - Pulls latest Angular repository
 * - Compares with last known state
 * - Detects NEW components
 * - Detects UPDATED components
 * - Suggests which commands to run
 * 
 * Usage:
 *   npm run migrate:check-updates
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const ANGULAR_REPO_URL = 'https://github.com/Mohamed-Adel-Web/vf-UI-components.git';
const ANGULAR_LOCAL_PATH = resolve(rootDir, '.temp/angular-ui-library');
const TRACKING_FILE = resolve(rootDir, '.migration/source-tracking.json');
const NATIVE_COMPONENTS_PATH = resolve(rootDir, 'src/components');

/**
 * Initialize tracking file if it doesn't exist
 */
function initializeTracking() {
  const tracking = {
    version: '1.0.0',
    lastUpdate: new Date().toISOString(),
    angularRepo: {
      url: ANGULAR_REPO_URL,
      branch: 'master',
      lastCommit: null,
      lastPull: null
    },
    components: {},
    tokens: {
      lastExtracted: null,
      sourceFile: 'projects/ui/styles/theme.css',
      sourceHash: null
    }
  };
  
  writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2));
  return tracking;
}

/**
 * Load tracking data
 */
function loadTracking() {
  if (!existsSync(TRACKING_FILE)) {
    return initializeTracking();
  }
  return JSON.parse(readFileSync(TRACKING_FILE, 'utf-8'));
}

/**
 * Save tracking data
 */
function saveTracking(tracking) {
  tracking.lastUpdate = new Date().toISOString();
  writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2));
}

/**
 * Clone or pull Angular repository
 */
function updateAngularRepo() {
  console.log('📥 Updating Angular repository...\n');
  
  try {
    if (existsSync(ANGULAR_LOCAL_PATH)) {
      console.log('   Pulling latest changes...');
      execSync('git pull origin master', {
        cwd: ANGULAR_LOCAL_PATH,
        stdio: 'pipe'
      });
      console.log('   ✅ Pull complete\n');
    } else {
      console.log('   Cloning repository (first time)...');
      execSync(`git clone ${ANGULAR_REPO_URL} ${ANGULAR_LOCAL_PATH}`, {
        stdio: 'pipe'
      });
      console.log('   ✅ Clone complete\n');
    }
    return true;
  } catch (error) {
    console.error('   ❌ Failed to update repository:', error.message);
    return false;
  }
}

/**
 * Get current commit hash
 */
function getCurrentCommit() {
  try {
    const commit = execSync('git rev-parse HEAD', {
      cwd: ANGULAR_LOCAL_PATH,
      encoding: 'utf-8'
    }).trim();
    return commit;
  } catch (error) {
    console.error('Failed to get commit hash:', error.message);
    return null;
  }
}

/**
 * Get hash of a file
 */
function getFileHash(filePath) {
  if (!existsSync(filePath)) return null;
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    return createHash('md5').update(content).digest('hex');
  } catch {
    return null;
  }
}

/**
 * Get list of components from Angular repository
 */
function getAngularComponents() {
  const componentsPath = join(ANGULAR_LOCAL_PATH, 'projects/ui/src/lib');
  
  if (!existsSync(componentsPath)) {
    console.error('❌ Components path not found:', componentsPath);
    return [];
  }
  
  try {
    return readdirSync(componentsPath)
      .filter(name => {
        const fullPath = join(componentsPath, name);
        const stat = statSync(fullPath);
        // Exclude utils, foundations, and hidden files
        return stat.isDirectory() && 
               name !== 'utils' && 
               name !== 'foundations' && 
               !name.startsWith('.');
      })
      .sort();
  } catch (error) {
    console.error('Failed to read components:', error.message);
    return [];
  }
}

/**
 * Get list of native components
 */
function getNativeComponents() {
  if (!existsSync(NATIVE_COMPONENTS_PATH)) {
    return [];
  }
  
  try {
    return readdirSync(NATIVE_COMPONENTS_PATH)
      .filter(name => {
        const fullPath = join(NATIVE_COMPONENTS_PATH, name);
        const stat = statSync(fullPath);
        return stat.isDirectory() && !name.startsWith('.');
      })
      .sort();
  } catch {
    return [];
  }
}

/**
 * Check if component has changed in Angular
 */
function hasComponentChanged(componentName, tracking, currentCommit) {
  const componentData = tracking.components[componentName];
  
  // If not tracked yet, it's new or needs checking
  if (!componentData) return true;
  
  // If last migrated commit is different from current
  if (componentData.lastMigratedCommit !== currentCommit) {
    return true;
  }
  
  // Check file hashes if available
  const componentPath = join(ANGULAR_LOCAL_PATH, 'projects/ui/src/lib', componentName);
  if (!existsSync(componentPath)) return false;
  
  // Get all files in component directory
  const files = readdirSync(componentPath).filter(f => !f.startsWith('.'));
  
  for (const file of files) {
    const filePath = join(componentPath, file);
    if (!statSync(filePath).isFile()) continue;
    
    const currentHash = getFileHash(filePath);
    const trackedHash = componentData.files?.[file];
    
    if (currentHash !== trackedHash) {
      return true;
    }
  }
  
  return false;
}

/**
 * Main check updates logic
 */
function checkUpdates() {
  console.log('🔍 Checking for Angular UI Library updates...\n');
  console.log('═══════════════════════════════════════\n');
  
  // 1. Update Angular repo
  if (!updateAngularRepo()) {
    console.error('Failed to update Angular repository. Exiting.');
    process.exit(1);
  }
  
  // 2. Load tracking data
  const tracking = loadTracking();
  
  // 3. Get current commit
  const currentCommit = getCurrentCommit();
  const lastCommit = tracking.angularRepo.lastCommit;
  
  console.log('📊 Repository Status:\n');
  console.log(`   Current commit: ${currentCommit?.substring(0, 8) || 'unknown'}`);
  console.log(`   Last tracked:   ${lastCommit?.substring(0, 8) || 'none'}\n`);
  
  // 4. Get component lists
  const angularComponents = getAngularComponents();
  const nativeComponents = getNativeComponents();
  
  console.log(`   Angular components: ${angularComponents.length}`);
  console.log(`   Native components:  ${nativeComponents.length}\n`);
  
  // 5. Categorize components
  const newComponents = [];
  const updatedComponents = [];
  const unchangedComponents = [];
  
  for (const component of angularComponents) {
    const existsInNative = nativeComponents.includes(component);
    
    if (!existsInNative) {
      // NEW component
      newComponents.push(component);
    } else {
      // Check if updated
      if (hasComponentChanged(component, tracking, currentCommit)) {
        updatedComponents.push(component);
      } else {
        unchangedComponents.push(component);
      }
    }
  }
  
  // 6. Check for deleted components
  const deletedComponents = nativeComponents.filter(
    comp => !angularComponents.includes(comp)
  );
  
  // 7. Display results
  console.log('═══════════════════════════════════════\n');
  
  if (newComponents.length === 0 && updatedComponents.length === 0 && deletedComponents.length === 0) {
    console.log('✅ No changes detected!\n');
    console.log('   Your native library is up to date with Angular.\n');
    return;
  }
  
  console.log('⚠️  Changes detected!\n');
  
  // NEW components
  if (newComponents.length > 0) {
    console.log(`🆕 NEW components (${newComponents.length}):\n`);
    newComponents.forEach(comp => {
      console.log(`   - ${comp}`);
    });
    console.log('');
  }
  
  // UPDATED components
  if (updatedComponents.length > 0) {
    console.log(`🔄 UPDATED components (${updatedComponents.length}):\n`);
    updatedComponents.forEach(comp => {
      console.log(`   - ${comp}`);
    });
    console.log('');
  }
  
  // DELETED components
  if (deletedComponents.length > 0) {
    console.log(`🗑️  DELETED from Angular (${deletedComponents.length}):\n`);
    deletedComponents.forEach(comp => {
      console.log(`   - ${comp} (exists in native, removed from Angular)`);
    });
    console.log('');
  }
  
  // UNCHANGED
  if (unchangedComponents.length > 0) {
    console.log(`✅ UNCHANGED (${unchangedComponents.length}):\n`);
    console.log(`   ${unchangedComponents.join(', ')}\n`);
  }
  
  // 8. Suggest commands
  console.log('═══════════════════════════════════════\n');
  console.log('📋 Suggested actions:\n');
  
  if (newComponents.length > 0) {
    console.log('   Add new components:\n');
    newComponents.forEach(comp => {
      console.log(`   npm run migrate:add ${comp}`);
    });
    console.log('');
  }
  
  if (updatedComponents.length > 0) {
    console.log('   Sync updated components:\n');
    updatedComponents.forEach(comp => {
      console.log(`   npm run migrate:sync ${comp}`);
    });
    console.log('');
  }
  
  if (deletedComponents.length > 0) {
    console.log('   ⚠️  Review deleted components (manual action needed)\n');
  }
  
  console.log('═══════════════════════════════════════\n');
  
  // 9. Update tracking with current commit
  tracking.angularRepo.lastCommit = currentCommit;
  tracking.angularRepo.lastPull = new Date().toISOString();
  saveTracking(tracking);
  
  console.log('💾 Tracking data updated.\n');
}

// Run the check
try {
  checkUpdates();
} catch (error) {
  console.error('\n❌ Error during update check:', error.message);
  process.exit(1);
}
