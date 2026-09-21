# Update & Sync Guide

## Overview

This guide explains how to keep your Native UI Library in sync with the Angular UI Library when changes occur.

---

## 🔍 Check for Updates

When you want to see if the Angular repository has changed:

```bash
npm run migrate:check-updates
```

### What it does:

1. Pulls latest Angular repository (or clones if first time)
2. Compares with last known state
3. Detects:
   - **NEW** components (exist in Angular, not in Native)
   - **UPDATED** components (exist in both, but Angular changed)
   - **UNCHANGED** components (no changes detected)
   - **DELETED** components (removed from Angular)

### Example Output:

```text
🔍 Checking for Angular UI Library updates...

📥 Updating Angular repository...
   ✅ Pull complete

📊 Repository Status:
   Current commit: abc12345
   Last tracked:   xyz78910

   Angular components: 10
   Native components:  8

═══════════════════════════════════════

⚠️  Changes detected!

🆕 NEW components (2):
   - badge
   - chip

🔄 UPDATED components (2):
   - button
   - tabs

✅ UNCHANGED (6):
   accordion, table, drawer, dialog, toast, sidebar-nav

═══════════════════════════════════════

📋 Suggested actions:

   Add new components:
   npm run migrate:add badge
   npm run migrate:add chip

   Sync updated components:
   npm run migrate:sync button
   npm run migrate:sync tabs

═══════════════════════════════════════
```

---

## 🆕 Add New Component

When Angular has a **new** component that doesn't exist in your Native library:

```bash
npm run migrate:add <component-name>
```

### Example:

```bash
npm run migrate:add badge
```

### What it does:

1. Generates a Copilot prompt for creating the new component
2. Tells Copilot to:
   - Analyze Angular source for `badge`
   - Create `src/components/badge/` directory
   - Implement all files (HTML, CSS, JS, tests, docs)
   - Add tracking information

### Workflow:

```bash
# 1. Run the command
npm run migrate:add badge

# 2. Copy the generated prompt
# 3. Paste into GitHub Copilot Chat
# 4. Wait for Copilot to create the component
# 5. Review the created files
# 6. Test the component
# 7. Commit changes
```

---

## 🔄 Sync Existing Component

When an **existing** component was updated in Angular:

```bash
npm run migrate:sync <component-name>
```

### Example:

```bash
npm run migrate:sync button
```

### What it does:

1. Generates a Copilot prompt for re-migrating the component
2. Tells Copilot to:
   - Analyze latest Angular source for `button`
   - Update existing `src/components/button/` files
   - Preserve structure but update implementation
   - Update tests and documentation

### Workflow:

```bash
# 1. Run the command
npm run migrate:sync button

# 2. Copy the generated prompt
# 3. Paste into GitHub Copilot Chat
# 4. Wait for Copilot to update the component
# 5. Review the changes (git diff)
# 6. Test the updated component
# 7. Commit changes
```

---

## 📊 Complete Workflow Example

### Scenario: Angular has been updated

```bash
# Step 1: Check for updates
npm run migrate:check-updates
```

Output shows:
- NEW: `badge`, `chip`
- UPDATED: `button`, `tabs`

```bash
# Step 2: Add new components one by one
npm run migrate:add badge
# → Paste prompt to Copilot
# → Wait for completion

npm run migrate:add chip
# → Paste prompt to Copilot
# → Wait for completion

# Step 3: Sync updated components
npm run migrate:sync button
# → Paste prompt to Copilot
# → Wait for completion

npm run migrate:sync tabs
# → Paste prompt to Copilot
# → Wait for completion

# Step 4: Review all changes
git status
git diff

# Step 5: Test components
npm run test

# Step 6: Commit
git add .
git commit -m "sync: update from Angular (badge, chip added; button, tabs synced)"
git push
```

---

## 🔁 Regular Update Schedule

### Recommended workflow:

1. **Weekly check:**
   ```bash
   npm run migrate:check-updates
   ```

2. **If changes found:**
   - Run `migrate:add` for new components
   - Run `migrate:sync` for updated components
   - Review and test all changes
   - Create PR for review

3. **After PR approval:**
   - Merge to main branch
   - Deploy updated library

---

## 📝 Tracking File

The system maintains `.migration/source-tracking.json` to track:

```json
{
  "version": "1.0.0",
  "lastUpdate": "2026-09-21T13:00:00.000Z",
  "angularRepo": {
    "url": "https://github.com/Mohamed-Adel-Web/vf-UI-components.git",
    "branch": "master",
    "lastCommit": "abc123def456",
    "lastPull": "2026-09-21T13:00:00.000Z"
  },
  "components": {
    "button": {
      "lastMigratedCommit": "abc123def456",
      "lastMigrated": "2026-09-21T10:00:00.000Z"
    }
  }
}
```

This file is automatically updated by:
- `migrate:check-updates` (commit tracking)
- Copilot agent (component tracking after migration)

---

## ⚙️ Configuration

### Angular Repository URL

Configured in `scripts/check-updates.js`:

```javascript
const ANGULAR_REPO_URL = 'https://github.com/Mohamed-Adel-Web/vf-UI-components.git';
```

Update this if your Angular repository moves.

---

## 🚨 Troubleshooting

### Issue: "Failed to update repository"

**Cause:** Git pull failed or clone failed.

**Solution:**
1. Check internet connection
2. Verify repository URL is correct
3. Delete `.temp/angular-ui-library/` and try again

---

### Issue: "Component already exists" (when running add)

**Cause:** Component exists in Native but not tracked.

**Solution:**
Use `migrate:sync` instead of `migrate:add`:
```bash
npm run migrate:sync <component>
```

---

### Issue: Copilot wants to re-migrate everything

**Cause:** Wrong command used or state.json corrupted.

**Solution:**
1. Use `migrate:sync <name>` for single component
2. Make sure `.temp/angular-ui-library/` exists
3. Check `.migration/source-tracking.json` is valid

---

## 💡 Tips

### 1. Review before committing
Always review changes with `git diff` before committing synced components.

### 2. Test after sync
Run tests and manually check components in playground after each sync.

### 3. One component at a time
Don't sync all components at once — easier to review and debug.

### 4. Create separate PRs
For better review, create separate PRs for:
- New components
- Updated components
- Each major feature

### 5. Document breaking changes
If Angular component API changed significantly, document it in the PR.

---

## 📚 Related Documentation

- **[MIGRATION-QUICKSTART.md](./MIGRATION-QUICKSTART.md)** - Initial migration guide
- **[MIGRATION-ARCHITECTURE-DIAGRAM.md](./MIGRATION-ARCHITECTURE-DIAGRAM.md)** - System architecture
- **[PROJECT-CONTEXT.md](./PROJECT-CONTEXT.md)** - Project decisions

---

## 🎯 Summary Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run migrate:check-updates` | Check for Angular changes | Weekly / before starting work |
| `npm run migrate:add <name>` | Add new component | After check-updates shows NEW |
| `npm run migrate:sync <name>` | Update existing component | After check-updates shows UPDATED |
| `npm run migrate:status` | Show migration progress | Check current state |

---

**Keep your Native UI Library in sync with Angular effortlessly!** 🚀
