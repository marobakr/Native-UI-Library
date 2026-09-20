# GitHub Copilot Usage Guide

This guide explains how to use GitHub Copilot to convert Angular components to native web components using the custom `@native-ui-engineer` agent.

## Quick Start

### 1. Discover Components (First Time)

```bash
npm run discover
```

This command:
- 🔍 Scans the Angular UI library repository
- 📋 Creates `components-status.json` with all discovered components
- 📊 Shows conversion status and suggests next component

### 2. Check Status Anytime

```bash
npm run status
```

Shows:
- ✅ Completed components
- 🟡 In-progress components
- ⚪ Not started components
- 💡 Suggested next component to convert

### 3. Update Component List

When new components are added to the Angular library:

```bash
npm run discover:update
```

This re-scans the repository and updates the status file with new components.

## Using GitHub Copilot

### Method 1: GitHub Copilot Chat (Recommended)

Open GitHub Copilot Chat in VS Code and use the custom agent:

#### Discover Available Components
```
@native-ui-engineer what components are available to convert?
```

The agent will:
- Read `components-status.json`
- Show you the current status
- Suggest the next component to work on

#### Analyze a Component
```
@native-ui-engineer analyze the button component
```

The agent will:
- Read the Angular component from the reference repo
- Extract structure, props, events, variants
- Document accessibility patterns
- Create analysis document in `docs/component-analysis/button.md`

#### Convert a Component
```
@native-ui-engineer convert the button component to native
```

The agent will:
- Read the analysis document
- Create HTML, CSS, and JavaScript files
- Implement tests
- Create documentation
- Add to playground
- Update status to "completed"

#### Validate a Component
```
@native-ui-engineer validate the button component
```

The agent will:
- Run quality checks
- Test functionality
- Verify accessibility
- Check browser compatibility
- Generate validation report

### Method 2: GitHub Copilot in IDE

Use inline completions and code generation:

1. **Open the component file** you want to work on
2. **Write a comment** describing what you need:
   ```javascript
   // Create a native button component with variants: primary, secondary, outline
   // Support sizes: small, medium, large
   // Include accessibility features
   ```
3. **Let Copilot generate** the code

### Method 3: GitHub Copilot Workspace

For complex workflows, use GitHub Copilot Workspace:

1. **Open Copilot Workspace** in your IDE
2. **Create a task**: "Convert Button component from Angular to native"
3. **Copilot will**:
   - Analyze the Angular component
   - Generate plan
   - Create files
   - Run tests
   - Update status

## Agent Commands Reference

### Discovery & Planning
```
@native-ui-engineer discover the Angular UI library
@native-ui-engineer what components need to be converted?
@native-ui-engineer suggest the next component to work on
@native-ui-engineer update the component list
```

### Component Analysis
```
@native-ui-engineer analyze the [component-name] component
@native-ui-engineer what are the variants of [component-name]?
@native-ui-engineer what props does [component-name] have?
@native-ui-engineer what accessibility features does [component-name] have?
```

### Component Conversion
```
@native-ui-engineer convert the [component-name] component to native
@native-ui-engineer implement the HTML for [component-name]
@native-ui-engineer implement the CSS for [component-name]
@native-ui-engineer implement the JavaScript for [component-name]
@native-ui-engineer write tests for [component-name]
```

### Validation
```
@native-ui-engineer validate the [component-name] component
@native-ui-engineer test accessibility for [component-name]
@native-ui-engineer check browser compatibility for [component-name]
```

### Liferay Integration (Future)
```
@native-ui-engineer create a Liferay fragment for [component-name]
@native-ui-engineer show Liferay integration examples for [component-name]
```

## Workflow Example

Here's a complete workflow for converting the Button component:

### Step 1: Check Status
```bash
npm run status
```

Output:
```
💡 Suggested next component to convert:
   📦 button
   📁 projects/ui/src/lib/button
   🔗 https://github.com/...
```

### Step 2: Analyze Component
In GitHub Copilot Chat:
```
@native-ui-engineer analyze the button component from 
https://github.com/Mohamed-Adel-Web/vf-UI-components/tree/master/projects/ui/src/lib/button
```

Copilot will:
- Fetch component files
- Analyze structure
- Create `docs/component-analysis/button.md`

### Step 3: Convert Component
```
@native-ui-engineer convert the button component to native
```

Copilot will:
- Create `src/components/button/button.html`
- Create `src/components/button/button.css`
- Create `src/components/button/button.js`
- Create `src/components/button/button.test.js`
- Create `src/components/button/README.md`
- Update `src/index.js`
- Add to playground

### Step 4: Test Component
```bash
npm run dev
```

Open http://localhost:3000 and test the button in the playground.

### Step 5: Validate
```
@native-ui-engineer validate the button component
```

### Step 6: Mark Complete
Update the status manually or let the agent do it:
```
@native-ui-engineer mark button as completed
```

The agent will update `components-status.json`:
```json
{
  "name": "button",
  "status": "completed",
  "completedAt": "2026-09-20T..."
}
```

### Step 7: Check Status Again
```bash
npm run status
```

Button will now show as ✅ Completed, and the next component will be suggested.

## Status Management

### Component Status Values

- `not-started` ⚪ - Not yet worked on
- `in-progress` 🟡 - Currently being converted
- `needs-review` 🔵 - Needs code review
- `completed` 🟢 - Fully converted and validated

### Priority Levels

- `high` 🔴 - Core components, frequently used
- `medium` 🟠 - Common components
- `low` 🟢 - Nice-to-have, specialized

### Complexity Levels

- `low` - Simple, self-contained (Button, Badge)
- `medium` - Some state management (Card, Alert)
- `high` - Complex interactions (Dialog, Table)

### Manually Update Status

Edit `components-status.json`:

```json
{
  "name": "button",
  "status": "in-progress",
  "priority": "high",
  "complexity": "low",
  "assignee": "Your Name",
  "startedAt": "2026-09-20T10:00:00Z"
}
```

Then run:
```bash
npm run status
```

## Agent Context Files

The agent reads these files to understand the project:

### Always Available
- ✅ `.github/copilot-instructions.md` - Main instructions
- ✅ `PROJECT-CONTEXT.md` - Project decisions
- ✅ `components-status.json` - Component tracking
- ✅ `README.md` - Project overview

### Referenced as Needed
- 📋 `.github/instructions/*.md` - Domain-specific guides
- 📝 `.github/prompts/*.md` - Reusable prompts
- 🎯 `.github/skills/*.md` - Specialized skills
- 📊 `docs/component-analysis/*.md` - Component analysis docs

## Tips for Better Results

### 1. Be Specific
❌ Bad: "Convert a component"
✅ Good: "Convert the button component to native HTML/CSS/JS"

### 2. Reference the Angular Component
❌ Bad: "Create a button"
✅ Good: "Analyze and convert the button component from 
        https://github.com/Mohamed-Adel-Web/vf-UI-components/tree/master/projects/ui/src/lib/button"

### 3. Ask for What You Need
```
@native-ui-engineer I need help with:
1. Understanding the button variants in the Angular library
2. Creating the native HTML structure
3. Implementing accessibility features
```

### 4. Iterate and Refine
```
@native-ui-engineer the button hover state is not working correctly, 
please fix it based on the Angular implementation
```

### 5. Reference Instructions
```
@native-ui-engineer convert the button component following the 
HTML-first principle in .github/instructions/native-components.instructions.md
```

## Troubleshooting

### Agent Not Finding Components

**Problem**: Agent says "No components found"

**Solution**: Run discovery first:
```bash
npm run discover
```

### Agent Not Reading Status File

**Problem**: Agent doesn't know conversion status

**Solution**: Ensure `components-status.json` exists:
```bash
npm run status
```

### GitHub API Rate Limit

**Problem**: Discovery script fails with API error

**Solution**: 
1. Wait a few minutes (GitHub API has rate limits)
2. Or create a GitHub Personal Access Token and use it:
   ```bash
   export GITHUB_TOKEN=your_token_here
   npm run discover
   ```

### Agent Using Wrong Instructions

**Problem**: Agent not following the HTML-first principle

**Solution**: Be explicit in your prompt:
```
@native-ui-engineer convert the button component using explicit HTML structure 
(not JavaScript-generated) as specified in 
.github/instructions/native-components.instructions.md
```

## Best Practices

### 1. Always Start with Discovery
```bash
npm run discover
npm run status
```

### 2. One Component at a Time
Focus on completing one component before starting another.

### 3. Follow the Workflow
Discovery → Analysis → Conversion → Validation → Integration

### 4. Keep Status Updated
Update `components-status.json` as you progress.

### 5. Test in Playground
Always test components in the playground before marking complete:
```bash
npm run dev
```

### 6. Run Tests
```bash
npm test
```

### 7. Validate Accessibility
Use browser tools and screen readers to test accessibility.

### 8. Update Documentation
Keep component READMEs up to date.

## Continuous Workflow

### Daily Workflow
1. Check status: `npm run status`
2. Pick next component
3. Analyze with agent: `@native-ui-engineer analyze [component]`
4. Convert with agent: `@native-ui-engineer convert [component]`
5. Test: `npm run dev`
6. Validate: `@native-ui-engineer validate [component]`
7. Mark complete
8. Repeat

### Weekly Workflow
1. Update component list: `npm run discover:update`
2. Review completed components
3. Plan next components
4. Update priorities in `components-status.json`

### Monthly Workflow
1. Full re-discovery: `npm run discover:update`
2. Review all completed components
3. Update documentation
4. Plan Liferay integration for completed components

## Advanced Usage

### Custom Priorities

Edit `components-status.json` to set custom priorities:

```json
{
  "name": "button",
  "priority": "high",
  "reason": "Core component, used everywhere"
}
```

### Component Dependencies

Track dependencies in status:

```json
{
  "name": "dialog",
  "dependencies": ["button"],
  "notes": "Requires Button component to be completed first"
}
```

### Team Collaboration

Add assignees to components:

```json
{
  "name": "button",
  "status": "in-progress",
  "assignee": "john@example.com",
  "startedAt": "2026-09-20T10:00:00Z"
}
```

## Getting Help

### In Chat
```
@native-ui-engineer help me understand the conversion workflow
@native-ui-engineer explain the HTML-first principle
@native-ui-engineer show me an example of a completed component
```

### Check Documentation
- `.github/copilot-instructions.md` - Full agent instructions
- `.github/instructions/` - Detailed guides
- `PROJECT-CONTEXT.md` - Project decisions and context

---

**Happy Converting! 🚀**

Use `@native-ui-engineer` to guide you through every step of the conversion process.
