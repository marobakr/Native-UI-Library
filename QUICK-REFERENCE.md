# Quick Reference Card

Essential commands and patterns for quick access.

## 🚀 Essential Commands

```bash
# Component Discovery
npm run discover          # First time: discover all components
npm run status           # Check conversion status
npm run discover:update  # Re-scan for new components
npm run components:list  # List all components

# Development
npm run dev              # Start playground (localhost:3000)
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run lint             # Lint code
npm run format           # Format code

# Build
npm run build            # Build for production
```

## 🤖 GitHub Copilot Commands

### Discovery & Status
```
@native-ui-engineer what components are available to convert?
@native-ui-engineer show me the conversion status
@native-ui-engineer suggest the next component to work on
```

### Component Workflow
```
# 1. Analyze
@native-ui-engineer analyze the button component

# 2. Convert
@native-ui-engineer convert the button component to native

# 3. Validate
@native-ui-engineer validate the button component

# 4. Create Liferay Fragment (future)
@native-ui-engineer create a Liferay fragment for button
```

### Help & Guidance
```
@native-ui-engineer explain the HTML-first principle
@native-ui-engineer show me an example of a completed component
@native-ui-engineer help me fix accessibility issues in button
```

## 📁 File Structure Template

```
src/components/[component-name]/
├── [component-name].html          # ⭐ Explicit HTML structure
├── [component-name].css           # 🎨 Token-driven styles
├── [component-name].js            # ⚡ Behavior enhancement
├── [component-name].test.js       # ✅ Unit tests
└── README.md                      # 📚 Documentation
```

## 🎯 Core Principles

### 1. HTML-First (MOST IMPORTANT)
```html
✅ DO: Explicit HTML structure
<button class="vf-button" data-component="button">
  <span class="vf-button__label">Click me</span>
</button>

❌ DON'T: JavaScript-generated structure
container.innerHTML = '<button>...</button>';
```

### 2. Design Tokens
```css
✅ DO: Use tokens
background: var(--vf-color-primary);

❌ DON'T: Hard-code values
background: #e60000;
```

### 3. Progressive Enhancement
```javascript
✅ DO: Enhance existing HTML
this.label = element.querySelector('.vf-button__label');
this.label.textContent = 'New text';

❌ DON'T: Create structure
element.appendChild(document.createElement('span'));
```

## 🔍 Component Status

**Check status anytime:**
```bash
npm run status
```

**Output:**
```
📊 Component Conversion Status
Total: 10 components

Status:
  ⚪ Not started: 8
  🟡 In progress: 1
  🟢 Completed: 1

💡 Next: button (high priority, low complexity)
```

## 📋 Conversion Workflow

```
1. Discovery     →  npm run discover
2. Analysis      →  @native-ui-engineer analyze [component]
3. Conversion    →  @native-ui-engineer convert [component]
4. Testing       →  npm run dev && npm test
5. Validation    →  @native-ui-engineer validate [component]
6. Mark Complete →  Update components-status.json
```

## 🎨 Design Tokens Reference

```css
/* Colors */
--vf-color-primary
--vf-color-secondary
--vf-color-success
--vf-color-warning
--vf-color-error

/* Spacing */
--vf-space-xs    /* 4px */
--vf-space-sm    /* 8px */
--vf-space-md    /* 16px */
--vf-space-lg    /* 24px */
--vf-space-xl    /* 32px */

/* Typography */
--vf-font-size-xs     /* 12px */
--vf-font-size-sm     /* 14px */
--vf-font-size-base   /* 16px */
--vf-font-size-lg     /* 20px */
--vf-font-weight-normal
--vf-font-weight-medium
--vf-font-weight-bold

/* Borders */
--vf-border-radius-sm
--vf-border-radius-md
--vf-border-radius-lg

/* Shadows */
--vf-shadow-sm
--vf-shadow-md
--vf-shadow-lg
```

## ✅ Quality Checklist

**Before marking complete:**
- [ ] HTML structure explicit (not JS-generated)
- [ ] CSS uses design tokens (no hard-coded values)
- [ ] JavaScript enhances (doesn't create structure)
- [ ] Tests passing (`npm test`)
- [ ] Accessibility validated (WCAG AA)
- [ ] Keyboard navigation works
- [ ] RTL/LTR support
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Documentation complete
- [ ] Tested in playground

## 🌐 Angular Reference

**Repository:** https://github.com/Mohamed-Adel-Web/vf-UI-components.git

**⚠️ READ ONLY** - Use for design reference, not code copying

**Location:** `projects/ui/src/lib/[component-name]/`

## 📚 Documentation Links

- **Full Guide:** [COPILOT-USAGE.md](./COPILOT-USAGE.md)
- **Best Practices:** [BEST-PRACTICES.md](./BEST-PRACTICES.md)
- **Project Context:** [PROJECT-CONTEXT.md](./PROJECT-CONTEXT.md)
- **GitHub Copilot Config:** `.github/copilot-instructions.md`

## 🆘 Troubleshooting

**Components not found?**
```bash
npm run discover
```

**Status not updating?**
```bash
npm run status
```

**GitHub API rate limit?**
```bash
# Wait a few minutes, or set GITHUB_TOKEN
export GITHUB_TOKEN=your_token
npm run discover
```

**Copilot not following instructions?**
```
@native-ui-engineer convert the button component using explicit HTML structure 
as specified in .github/instructions/native-components.instructions.md
```

## 🎓 Learning Path

**Day 1:** Read COPILOT-USAGE.md and BEST-PRACTICES.md
**Day 2:** Run `npm run discover` and analyze first component
**Day 3:** Convert first component (button - low complexity)
**Day 4:** Test and validate
**Day 5:** Convert second component
**Week 2:** Continue with medium complexity components
**Week 3+:** Advanced components and Liferay integration

---

**Keep this file handy for quick reference!**

Press `Ctrl+F` (or `Cmd+F`) to search for specific commands or patterns.
