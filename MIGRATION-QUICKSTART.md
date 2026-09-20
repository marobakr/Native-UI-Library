# 🚀 Migration Quick Start

This guide shows you exactly how to start and manage the autonomous migration from Angular to Native components.

---

## TL;DR - One Command to Rule Them All

```bash
npm run migrate:start
```

Copy the generated prompt → Paste into GitHub Copilot Chat → Watch it work autonomously.

---

## The Magic Commands

### 1️⃣ Start Fresh Migration

```bash
npm run migrate:start
```

**What it does:**
- Resets migration state
- Generates a complete prompt for GitHub Copilot
- Shows you exactly what to paste into Copilot Chat

**Use when:**
- Starting migration for the first time
- Want to restart from scratch

**Example output:**
```
🚀 Starting Fresh Migration

═══════════════════════════════════════

✅ Migration initialized

📋 Copy the following prompt and paste into GitHub Copilot Chat:

═══════════════════════════════════════

# Autonomous Migration Command

## Starting Fresh Migration

---

## Instruction for GitHub Copilot Agent

@native-ui-engineer

Start the autonomous migration workflow.

[... full prompt ...]

═══════════════════════════════════════

💡 Tip: The agent will work autonomously. Just paste this prompt!
```

### 2️⃣ Resume from Checkpoint

```bash
npm run migrate:resume
```

**What it does:**
- Reads last checkpoint
- Generates resume prompt
- Shows current progress

**Use when:**
- Continuing migration after a break
- GitHub Copilot conversation ended
- Want to continue from where you left off

**Example output:**
```
🔄 Resuming Migration

═══════════════════════════════════════

Current Status:
- Phase: component-migration
- Step: analyze-component
- Component: button
- Last Checkpoint: discovery-complete

Progress:
- Completed: 3/15 components

📋 Copy the following prompt and paste into GitHub Copilot Chat:

[... resume prompt ...]
```

### 3️⃣ Check Status

```bash
npm run migrate:status
```

**What it does:**
- Shows current migration state
- Shows progress
- Shows next action
- Tells you which command to run

**Use when:**
- Want to see where you are
- Check progress
- Not sure what to do next

**Example output:**
```
📊 Migration Status

═══════════════════════════════════════

Phase: component-migration
Step: implement-native
Current Component: button

Progress:
  Completed Components: 3/15
  Phases Completed: discovery

Last Checkpoint: discovery-complete

Next Action:
  Phase: component-migration
  Step: implement-native
  Action: Implement native button component

═══════════════════════════════════════

✅ Can resume from checkpoint
   Run: npm run migrate:resume
```

### 4️⃣ Reset Everything

```bash
npm run migrate:reset
```

**What it does:**
- Resets migration state to initial
- Clears all progress
- Starts from zero

**Use when:**
- Want to start completely fresh
- Migration went wrong
- Want to test the workflow

---

## The Complete Workflow

### Step-by-Step: First Time

1. **Initialize and Start**
   ```bash
   npm run migrate:start
   ```

2. **Copy the Prompt**
   - The script outputs a complete prompt
   - Copy everything from the output

3. **Open GitHub Copilot Chat**
   - In your IDE, open Copilot Chat
   - Paste the prompt
   - Press Enter

4. **Watch It Work**
   - The `@native-ui-engineer` agent activates
   - It reads the workflow definition
   - It reads the current state
   - It executes steps autonomously
   - It reports progress as it works

5. **Agent Works Until Checkpoint**
   - The agent will work continuously
   - It updates state files as it goes
   - It creates checkpoints at phase boundaries
   - It stops at checkpoints or blockers

6. **When Agent Stops**
   - Check the checkpoint message
   - Run `npm run migrate:status` to see progress
   - Run `npm run migrate:resume` to continue
   - Paste the new prompt into Copilot Chat

### Step-by-Step: Resuming

1. **Check Current Status**
   ```bash
   npm run migrate:status
   ```

2. **Generate Resume Prompt**
   ```bash
   npm run migrate:resume
   ```

3. **Copy and Paste**
   - Copy the generated prompt
   - Paste into GitHub Copilot Chat
   - Agent resumes from last checkpoint

4. **Continue Until Done**
   - Repeat resume → paste → work → checkpoint
   - Until migration is complete

---

## What Happens Behind the Scenes

### The State Machine

The migration uses a state machine stored in `.migration/state.json`:

```json
{
  "currentPhase": "discovery",
  "currentStep": "extract-design-tokens",
  "currentComponent": null,
  "lastCheckpoint": "discovery-complete",
  "canResume": true,
  "nextAction": {
    "phase": "component-migration",
    "step": "select-next-component",
    "instruction": "Select next component to migrate"
  },
  "progress": {
    "phasesCompleted": ["discovery"],
    "componentsCompleted": ["button", "icon"],
    "totalComponents": 15,
    "completedComponents": 2
  }
}
```

### The Workflow Definition

The agent reads `.github/workflows/migration-workflow.md` which defines:
- All phases (Discovery → Component Migration → Validation → Integration)
- All steps within each phase
- Verification criteria for each step
- Transition rules between phases
- Checkpoint locations

### The Agent

The `@native-ui-engineer` agent is defined in `.github/agents/migration-agent.md`:
- Knows how to execute the workflow autonomously
- Reads state to know where it is
- Reads workflow to know what to do next
- Updates state after every action
- Creates checkpoints at phase boundaries
- Reports progress continuously

---

## Example Session

### Starting Fresh

```bash
$ npm run migrate:start

🚀 Starting Fresh Migration

═══════════════════════════════════════

✅ Migration initialized

📋 Copy the following prompt and paste into GitHub Copilot Chat:

═══════════════════════════════════════

# Autonomous Migration Command

## Starting Fresh Migration

---

## Instruction for GitHub Copilot Agent

@native-ui-engineer

Start the autonomous migration workflow.

**Your Mission:**
Execute the migration workflow autonomously following these instructions:

1. **Read State:**
   - Read `.migration/state.json` to understand current position
   - Read `.github/workflows/migration-workflow.md` for workflow definition
   - Read `.github/agents/migration-agent.md` for your operating instructions

2. **Execute Current Phase:**
   - Current Phase: discovery
   - Current Step: initial-scan
   - Next Action: Start migration by discovering Angular UI Library structure

3. **Work Autonomously:**
   - Execute each step in the workflow
   - Verify your work after each step
   - Update state.json and manifest.json as you progress
   - Create checkpoints at logical stopping points
   - Continue until you reach a checkpoint or complete the phase

[... rest of prompt ...]

═══════════════════════════════════════

💡 Tip: The agent will work autonomously. Just paste this prompt!
```

### Agent Working

```
You: [paste the prompt]

@native-ui-engineer:
✅ Migration agent activated

📖 Reading state...
- Current Phase: not-started
- Next Action: discovery / initial-scan

📖 Reading workflow...
- Loaded: .github/workflows/migration-workflow.md
- Phase 1: Discovery
- Step 1: initial-scan

🔄 Executing: discovery / initial-scan
1. Cloning Angular repository...
   Source:https://git.vf-eg.internal.vodafone.com/WEB/vf-dynamic-catalog-components/-/tree/master
   Destination: .temp/angular-ui-library/
2. Cloning... [progress]
3. Repository cloned successfully
4. Scanning structure...
   Found: src/components/ (12 components)
   Found: src/styles/ (shared styles)
   Found: src/tokens/ (design tokens)
5. Updating state.json...
   currentPhase: "discovery"
   currentStep: "initial-scan"

✅ Completed: discovery / initial-scan
📊 Progress: 0/12 components (discovery phase)
⏭️  Next: discovery / find-design-system

🔄 Executing: discovery / find-design-system
1. Searching for design token files...
2. Found: src/tokens/colors.scss
3. Found: src/tokens/typography.scss
4. Found: src/styles/variables.scss
5. Documenting token locations...
6. Updating manifest.json...
   tokenFiles: ["src/tokens/colors.scss", ...]

✅ Completed: discovery / find-design-system
⏭️  Next: discovery / extract-design-tokens

🔄 Executing: discovery / extract-design-tokens
1. Extracting color tokens from src/tokens/colors.scss...
   Found: $vf-red: #e60000
   Found: $vf-white: #ffffff
   [... more tokens ...]
2. Verifying values against Angular source...
   ✅ $vf-red: #e60000 (line 12 in colors.scss)
   ✅ $vf-white: #ffffff (line 15 in colors.scss)
3. Writing to tokens/colors.css...
4. Extracting typography tokens...
[... continues autonomously ...]

🎯 Checkpoint Reached: discovery-complete
Phase: discovery
Progress: All design tokens extracted, 12 components discovered
Can Resume: Yes
Next Phase: component-migration

I've reached the discovery-complete checkpoint.

Summary:
- ✅ Extracted 47 design tokens
- ✅ Discovered 12 components
- ✅ Built dependency graph
- ✅ Created migration inventory

Ready to start component migration. Run `npm run migrate:resume` to continue.
```

### Checking Status

```bash
$ npm run migrate:status

📊 Migration Status

═══════════════════════════════════════

Phase: discovery
Step: extract-design-tokens

Progress:
  Completed Components: 0/12
  Phases Completed: None

Last Checkpoint: None

Next Action:
  Phase: discovery
  Step: extract-design-tokens
  Action: Extract design tokens from Angular library

═══════════════════════════════════════

▶️  In progress
   Agent is currently working
```

### Resuming

```bash
$ npm run migrate:resume

🔄 Resuming Migration

═══════════════════════════════════════

Current Status:
- Phase: discovery
- Last Checkpoint: discovery-complete
- Completed: 0/12 components

📋 Copy the following prompt and paste into GitHub Copilot Chat:

[... resume prompt ...]
```

---

## Key Files You'll See

### `.migration/` Directory

```
.migration/
├── state.json              # Current workflow state
├── manifest.json           # Component inventory and progress
├── missing-info.json       # Recorded missing information
├── verification-log.json   # Verification results
├── checkpoints.json        # Checkpoint history
└── analysis/               # Component analysis results
    ├── button.json
    ├── input.json
    └── ...
```

### Workflow Files

```
.github/
├── workflows/
│   └── migration-workflow.md    # Complete workflow definition
├── agents/
│   └── migration-agent.md       # Agent instructions
├── skills/
│   └── ...                      # Domain-specific skills
└── instructions/
    └── ...                      # Technical instructions
```

---

## Troubleshooting

### "Cannot resume - no checkpoint found"

**Cause:** No checkpoint has been created yet

**Solution:**
```bash
npm run migrate:start
```

### "Agent stops unexpectedly"

**Cause:** Agent encountered a blocker

**Solution:**
1. Check agent's last message for blocker description
2. Resolve the blocker (e.g., missing info, error)
3. Run `npm run migrate:resume` to continue

### "State seems wrong"

**Cause:** State file corrupted or manual edit went wrong

**Solution:**
```bash
npm run migrate:reset
npm run migrate:start
```

### "Want to start over"

**Solution:**
```bash
npm run migrate:reset
npm run migrate:start
```

---

## Tips for Success

1. **Let It Work**
   - Don't interrupt the agent mid-workflow
   - Wait for checkpoints
   - The agent will report progress

2. **Check Status Frequently**
   ```bash
   npm run migrate:status
   ```

3. **Trust the Verification**
   - The agent verifies its work at each step
   - It won't invent values
   - It will record missing information

4. **Resume Often**
   - GitHub Copilot conversations can timeout
   - Just run `migrate:resume` to continue
   - No progress is lost

5. **Review Checkpoints**
   - At each checkpoint, review what was done
   - Check the verification log
   - Check for missing information

6. **Read the Reports**
   - The agent reports what it's doing
   - It reports verification results
   - It reports missing information
   - It reports blockers

---

## What You DON'T Need to Do

- ❌ Manually tell the agent each step
- ❌ Manually update state files
- ❌ Manually track progress
- ❌ Manually verify design values
- ❌ Remember where you left off

## What You DO Need to Do

- ✅ Run the migration commands
- ✅ Copy the generated prompts
- ✅ Paste into GitHub Copilot Chat
- ✅ Let the agent work
- ✅ Resume when it reaches checkpoints

---

## That's It!

The entire autonomous migration is triggered by **one command**:

```bash
npm run migrate:start
```

Then just:
1. Copy the prompt
2. Paste into Copilot Chat
3. Watch it work
4. Resume when needed

The agent does the rest autonomously.

---

**Happy Migrating! 🚀**
