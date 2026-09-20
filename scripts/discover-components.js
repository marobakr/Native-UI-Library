#!/usr/bin/env node

/**
 * Component Discovery Script
 * 
 * This script discovers components from the Angular UI library (remote repository)
 * and tracks conversion status in components-status.json
 * 
 * Usage:
 *   npm run discover           - Discover components from Angular repo
 *   npm run status             - Show current conversion status
 *   npm run discover:update    - Re-scan and update component list
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const statusFile = resolve(rootDir, 'components-status.json');

/**
 * Angular UI Library Reference
 */
const ANGULAR_REPO = {
  url: 'https://github.com/Mohamed-Adel-Web/vf-UI-components.git',
  componentsPath: 'projects/ui/src/lib',
};

/**
 * Fetch directory contents from GitHub API
 */
async function fetchGitHubContents(owner, repo, path = '') {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from GitHub: ${error.message}`);
    return null;
  }
}

/**
 * Extract owner and repo from GitHub URL
 */
function parseGitHubUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
}

/**
 * Discover components from Angular repository
 */
async function discoverComponents() {
  console.log('🔍 Discovering components from Angular UI library...\n');
  console.log(`Repository: ${ANGULAR_REPO.url}`);
  console.log(`Components path: ${ANGULAR_REPO.componentsPath}\n`);

  const { owner, repo } = parseGitHubUrl(ANGULAR_REPO.url);
  
  if (!owner || !repo) {
    console.error('❌ Invalid GitHub repository URL');
    return null;
  }

  // Fetch components directory
  const contents = await fetchGitHubContents(owner, repo, ANGULAR_REPO.componentsPath);
  
  if (!contents || !Array.isArray(contents)) {
    console.error('❌ Failed to fetch components from repository');
    console.log('\n💡 Tip: Check if the repository is public and the path is correct');
    return null;
  }

  // Filter for component directories
  const componentDirs = contents.filter(item => item.type === 'dir');
  
  console.log(`✅ Found ${componentDirs.length} component directories\n`);

  // Create component list
  const components = componentDirs.map(dir => ({
    name: dir.name,
    path: dir.path,
    url: dir.html_url,
    status: 'not-started',
    priority: 'medium',
    complexity: 'unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return components;
}

/**
 * Load existing status file
 */
function loadStatus() {
  if (existsSync(statusFile)) {
    const content = readFileSync(statusFile, 'utf-8');
    return JSON.parse(content);
  }
  return null;
}

/**
 * Save status file
 */
function saveStatus(data) {
  writeFileSync(statusFile, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n💾 Status saved to: components-status.json`);
}

/**
 * Merge discovered components with existing status
 */
function mergeStatus(discovered, existing) {
  if (!existing) {
    return {
      lastUpdated: new Date().toISOString(),
      repository: ANGULAR_REPO.url,
      totalComponents: discovered.length,
      components: discovered,
    };
  }

  // Create a map of existing components
  const existingMap = new Map(
    existing.components.map(comp => [comp.name, comp])
  );

  // Merge: keep existing data for known components, add new ones
  const merged = discovered.map(disc => {
    const existing = existingMap.get(disc.name);
    if (existing) {
      // Keep existing status data, update timestamp
      return {
        ...existing,
        path: disc.path, // Update path in case it changed
        url: disc.url,
        updatedAt: new Date().toISOString(),
      };
    }
    return disc; // New component
  });

  // Find new components
  const existingNames = new Set(existing.components.map(c => c.name));
  const newComponents = merged.filter(c => !existingNames.has(c.name));

  if (newComponents.length > 0) {
    console.log(`\n🆕 Found ${newComponents.length} new component(s):`);
    newComponents.forEach(c => console.log(`   - ${c.name}`));
  }

  return {
    lastUpdated: new Date().toISOString(),
    repository: ANGULAR_REPO.url,
    totalComponents: merged.length,
    components: merged,
  };
}

/**
 * Display status summary
 */
function displayStatus(status) {
  if (!status) {
    console.log('❌ No status file found. Run "npm run discover" first.');
    return;
  }

  console.log('\n📊 Component Conversion Status\n');
  console.log(`Repository: ${status.repository}`);
  console.log(`Last updated: ${new Date(status.lastUpdated).toLocaleString()}`);
  console.log(`Total components: ${status.totalComponents}\n`);

  // Count by status
  const statusCounts = {
    'not-started': 0,
    'in-progress': 0,
    'completed': 0,
    'needs-review': 0,
  };

  status.components.forEach(comp => {
    statusCounts[comp.status] = (statusCounts[comp.status] || 0) + 1;
  });

  console.log('Status breakdown:');
  console.log(`  ⚪ Not started: ${statusCounts['not-started']}`);
  console.log(`  🟡 In progress: ${statusCounts['in-progress']}`);
  console.log(`  🟢 Completed: ${statusCounts['completed']}`);
  console.log(`  🔵 Needs review: ${statusCounts['needs-review']}\n`);

  // Group by priority
  const byPriority = {
    high: [],
    medium: [],
    low: [],
  };

  status.components.forEach(comp => {
    if (comp.status !== 'completed') {
      byPriority[comp.priority].push(comp);
    }
  });

  if (byPriority.high.length > 0) {
    console.log('🔴 High Priority (Not Started):');
    byPriority.high.forEach(c => {
      const icon = c.status === 'not-started' ? '⚪' : '🟡';
      console.log(`   ${icon} ${c.name} (${c.complexity})`);
    });
    console.log('');
  }

  if (byPriority.medium.length > 0 && byPriority.medium.length <= 10) {
    console.log('🟠 Medium Priority (Not Started):');
    byPriority.medium.slice(0, 10).forEach(c => {
      const icon = c.status === 'not-started' ? '⚪' : '🟡';
      console.log(`   ${icon} ${c.name} (${c.complexity})`);
    });
    if (byPriority.medium.length > 10) {
      console.log(`   ... and ${byPriority.medium.length - 10} more`);
    }
    console.log('');
  }

  // Show recently completed
  const completed = status.components.filter(c => c.status === 'completed');
  if (completed.length > 0) {
    console.log('✅ Recently Completed:');
    completed.slice(-5).forEach(c => {
      console.log(`   🟢 ${c.name}`);
    });
    console.log('');
  }

  // Next suggested component
  const nextComponent = status.components.find(
    c => c.status === 'not-started' && c.priority === 'high'
  ) || status.components.find(
    c => c.status === 'not-started' && c.priority === 'medium'
  );

  if (nextComponent) {
    console.log('💡 Suggested next component to convert:');
    console.log(`   📦 ${nextComponent.name}`);
    console.log(`   📁 ${nextComponent.path}`);
    console.log(`   🔗 ${nextComponent.url}\n`);
    console.log(`   Use: @native-ui-engineer analyze the ${nextComponent.name} component\n`);
  }
}

/**
 * Main function
 */
async function main() {
  const command = process.argv[2] || 'discover';

  switch (command) {
    case 'discover':
    case 'update':
      const discovered = await discoverComponents();
      if (discovered) {
        const existing = loadStatus();
        const merged = mergeStatus(discovered, existing);
        saveStatus(merged);
        displayStatus(merged);
      }
      break;

    case 'status':
      const status = loadStatus();
      displayStatus(status);
      break;

    case 'list':
      const listStatus = loadStatus();
      if (listStatus) {
        console.log('\n📋 All Components:\n');
        listStatus.components.forEach((comp, idx) => {
          const icon = {
            'not-started': '⚪',
            'in-progress': '🟡',
            'completed': '🟢',
            'needs-review': '🔵',
          }[comp.status] || '⚪';
          console.log(`${idx + 1}. ${icon} ${comp.name} (${comp.status}, ${comp.priority})`);
        });
        console.log('');
      }
      break;

    default:
      console.log('Usage:');
      console.log('  npm run discover        - Discover components from Angular repo');
      console.log('  npm run status          - Show conversion status');
      console.log('  npm run discover:update - Re-scan and update component list');
      console.log('  node scripts/discover-components.js list - List all components');
  }
}

main().catch(console.error);
