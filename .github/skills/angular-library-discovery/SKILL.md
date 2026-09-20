# Skill: Angular Library Discovery

## Overview

This skill provides expertise in exploring and documenting the Angular UI Library structure without cloning or modifying it.

## When to Use This Skill

Use this skill when you need to:
- Explore the Angular repository for the first time
- Create an inventory of available components
- Understand the library's architecture
- Extract design tokens from the Angular library
- Plan the conversion roadmap
- Document component relationships

## Prerequisites

- Access to the Angular repository: `https://github.com/Mohamed-Adel-Web/vf-UI-components.git`
- Understanding of Angular project structure
- Familiarity with design systems

## Step-by-Step Process

### Step 1: Repository Structure Analysis

**Goal:** Understand the high-level organization

**Actions:**
1. Browse the repository on GitHub
2. Identify the project type (Angular workspace, monorepo, etc.)
3. Locate the main source directories
4. Find documentation (README, Storybook, etc.)

**Questions to Answer:**
- What type of Angular project is this?
- Where are the components located?
- Is there a Storybook?
- What build tools are used?
- What styling approach is used (SCSS, Tailwind, etc.)?

**Output:** Repository structure document

### Step 2: Component Discovery

**Goal:** Create complete component inventory

**Actions:**
1. Navigate to the component directory (e.g., `projects/ui/src/lib/`)
2. List all component directories
3. For each component, note:
   - Component name
   - File structure
   - Apparent complexity
   - Dependencies on other components

**Template:**
```markdown
## Component Inventory

| Component | Location | Files | Complexity | Dependencies |
|-----------|----------|-------|------------|--------------|
| Button | projects/ui/src/lib/button/ | 5 | Low | Icon |
| Card | projects/ui/src/lib/card/ | 6 | Medium | Button, Badge |
```

**Output:** `COMPONENT-INVENTORY.md`

### Step 3: Design Token Extraction

**Goal:** Identify and document all design tokens

**Actions:**
1. Look for token/theme files:
   - `styles/theme.css` or similar
   - Tailwind config (`tailwind.config.js`)
   - SCSS variables (`_variables.scss`, `_tokens.scss`)
2. Extract token categories:
   - Colors
   - Typography
   - Spacing
   - Borders
   - Shadows
   - Transitions
3. Map Angular tokens to native CSS custom properties

**Example Mapping:**
```markdown
## Design Token Mapping

### Colors
| Angular Token | Value | Native Token |
|---------------|-------|--------------|
| $color-primary | #e60000 | --vf-color-primary |
| $color-secondary | #333333 | --vf-color-secondary |

### Spacing
| Angular Token | Value | Native Token |
|---------------|-------|--------------|
| $space-sm | 8px | --vf-space-sm |
| $space-md | 16px | --vf-space-md |
```

**Output:** `DESIGN-TOKENS.md`

### Step 4: Component Categorization

**Goal:** Group components by type and complexity

**Categories:**
- **Forms:** Input, Checkbox, Radio, Select, etc.
- **Buttons:** Button, IconButton, etc.
- **Feedback:** Alert, Toast, Modal, etc.
- **Layout:** Card, Grid, Container, etc.
- **Navigation:** Menu, Tabs, Breadcrumb, etc.
- **Data Display:** Table, List, Badge, etc.

**Complexity Levels:**
- **Low:** Simple, self-contained (Button, Badge, Icon)
- **Medium:** Some state management (Card, Alert, Tooltip)
- **High:** Complex interactions (Modal, Dropdown, DatePicker)

**Output:** Categorized component list

### Step 5: Dependency Mapping

**Goal:** Understand component relationships

**Actions:**
1. For each component, identify:
   - Which components it uses
   - Which components use it
   - Shared utilities or services
2. Create a dependency graph

**Example:**
```markdown
## Component Dependencies

### Button
- **Used by:** Card, Modal, Alert, Form
- **Uses:** Icon
- **Shared:** None

### Modal
- **Used by:** None (top-level)
- **Uses:** Button, Icon
- **Shared:** FocusTrap utility
```

**Output:** Dependency map

### Step 6: Priority Ranking

**Goal:** Determine conversion order

**Criteria for Priority:**
- **High Priority:**
  - Frequently used
  - Required by other components
  - Simple to convert
  - Core UI patterns

- **Medium Priority:**
  - Moderately used
  - Some dependencies
  - Moderate complexity

- **Low Priority:**
  - Rarely used
  - Complex
  - Nice-to-have

**Output:** Prioritized conversion list

### Step 7: Storybook Analysis (if available)

**Goal:** Understand component variants and usage

**Actions:**
1. Find Storybook URL (if deployed) or run locally
2. For each component, document:
   - Available stories
   - Variants demonstrated
   - Interactive examples
   - Props documentation
3. Take screenshots of key variants

**Output:** Storybook documentation notes

### Step 8: Technical Analysis

**Goal:** Understand the tech stack

**Actions:**
1. Review `package.json`:
   - Angular version
   - Dependencies
   - Dev dependencies
   - Build scripts
2. Review configuration files:
   - `angular.json`
   - `tsconfig.json`
   - Tailwind config (if used)
3. Note any patterns or approaches used:
   - Class Variance Authority (CVA)
   - Tailwind merge
   - Custom build steps

**Output:** Technical notes document

### Step 9: Conversion Roadmap

**Goal:** Create phased conversion plan

**Actions:**
1. Group components into phases
2. Consider dependencies (convert dependencies first)
3. Estimate effort for each component
4. Create timeline

**Example Roadmap:**
```markdown
## Conversion Roadmap

### Phase 1: Foundation (Week 1-2)
- Design tokens extraction ✓
- Utility functions ✓
- Button (3 days)
- Icon (2 days)
- Badge (2 days)

### Phase 2: Forms (Week 3-4)
- Input (4 days)
- Checkbox (3 days)
- Radio (3 days)
- Select (5 days)

### Phase 3: Layout & Feedback (Week 5-6)
- Card (4 days)
- Alert (3 days)
- Modal (5 days)
- Toast (4 days)

### Phase 4: Advanced (Week 7+)
- Tabs (5 days)
- Dropdown (6 days)
- DatePicker (8 days)
- Table (10 days)
```

**Output:** `CONVERSION-PLAN.md`

### Step 10: Documentation

**Goal:** Consolidate all discovery findings

**Actions:**
1. Create comprehensive discovery document
2. Include all findings
3. Add recommendations
4. Note open questions
5. Provide next steps

**Output:** `docs/DISCOVERY-REPORT.md`

## Deliverables

After completing this skill, you should have:

1. **COMPONENT-INVENTORY.md**
   - Complete list of components
   - Categorization
   - Complexity ratings

2. **DESIGN-TOKENS.md**
   - All design tokens extracted
   - Mapping to native CSS custom properties

3. **CONVERSION-PLAN.md**
   - Phased roadmap
   - Dependencies mapped
   - Effort estimates

4. **docs/DISCOVERY-REPORT.md**
   - Comprehensive findings
   - Recommendations
   - Next steps

## Tips and Best Practices

### Remote Repository Exploration

**Without Cloning:**
- Use GitHub's web interface
- View files directly in browser
- Search code with GitHub search
- Use GitHub's file tree navigation

**GitHub URLs:**
```
# List directory contents (API)
https://api.github.com/repos/Mohamed-Adel-Web/vf-UI-components/contents/projects/ui/src/lib

# View file content (Web)
https://github.com/Mohamed-Adel-Web/vf-UI-components/blob/master/projects/ui/src/lib/button/button.component.ts
```

### What to Look For

**In Component Files:**
- `@Input()` decorators → Props to support
- `@Output()` decorators → Events to dispatch
- `ngClass`, `[class]` → CSS variants to implement
- `*ngIf`, `*ngFor` → Conditional rendering to handle
- ARIA attributes → Accessibility patterns to preserve

**In Style Files:**
- CSS/SCSS variables → Design tokens
- Class naming patterns → BEM or other conventions
- Media queries → Responsive breakpoints
- `[dir="rtl"]` → RTL patterns

**In Template Files:**
- Element structure → HTML hierarchy
- Content projection (`<ng-content>`) → Slot patterns
- Attribute bindings → Props/attributes to support

### Common Patterns to Note

1. **Variant Pattern:**
   ```typescript
   @Input() variant: 'primary' | 'secondary' = 'primary';
   ```
   → Implement as CSS classes: `.vf-component--primary`

2. **Size Pattern:**
   ```typescript
   @Input() size: 'small' | 'medium' | 'large' = 'medium';
   ```
   → Implement as CSS classes: `.vf-component--small`

3. **State Pattern:**
   ```typescript
   @Input() disabled = false;
   ```
   → Implement as attribute: `element.hasAttribute('disabled')`

4. **Event Pattern:**
   ```typescript
   @Output() clicked = new EventEmitter<void>();
   ```
   → Dispatch custom event: `'vf-component:clicked'`

## Validation

Discovery is complete when you can answer:

- [ ] How many components exist?
- [ ] What are the core/frequently-used components?
- [ ] What design tokens are used?
- [ ] How do components relate to each other?
- [ ] What's the recommended conversion order?
- [ ] What are the technical challenges?
- [ ] What's the estimated timeline?

## Next Steps

After discovery:
1. Review findings with stakeholders
2. Validate priorities
3. Select first component to analyze
4. Use **component-analysis skill** for deep dive
5. Begin conversion with high-priority components

## Related Resources

- Prompt: `.github/prompts/discover-angular-library.prompt.md`
- Instructions: `.github/instructions/angular-reference.instructions.md`
- Next Skill: `.github/skills/component-analysis/`

---

This skill helps you systematically explore the Angular library and create a solid foundation for the conversion project.
