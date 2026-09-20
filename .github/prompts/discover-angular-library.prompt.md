# Prompt: Discover Angular UI Library

## Context
You need to explore and document the Angular UI Library structure to understand available components and their organization.

## Objective
Create a comprehensive inventory of the Angular library without cloning or modifying it.

## Reference Repository
`https://github.com/Mohamed-Adel-Web/vf-UI-components.git`

## Tasks

### 1. Remote Repository Inspection

Explore the repository structure via GitHub:

```markdown
## Repository Structure

Document the following:
- Project type (Angular workspace, monorepo, etc.)
- Main directories and their purposes
- Component location (e.g., projects/ui/src/lib/)
- Documentation location (README, Storybook, etc.)
- Design token location (theme files, Tailwind config)
- Test file patterns
```

### 2. Component Inventory

List all components found in the library:

```markdown
## Component Inventory

Create a table:

| Component | Location | Complexity | Priority | Status |
|-----------|----------|------------|----------|--------|
| Button | projects/ui/src/lib/button/ | Low | High | Not Started |
| Card | projects/ui/src/lib/card/ | Medium | High | Not Started |
| Modal | projects/ui/src/lib/modal/ | High | Medium | Not Started |

**Complexity Levels:**
- Low: Simple, self-contained components (Button, Badge, Icon)
- Medium: Components with some state (Card, Alert, Tooltip)
- High: Complex interactions (Modal, Dropdown, DatePicker)

**Priority:**
- High: Core UI components, frequently used
- Medium: Common but not critical
- Low: Nice-to-have, specialized
```

### 3. Dependency Analysis

Document how components relate to each other:

```markdown
## Component Dependencies

Identify:
- Which components use other components
- Shared utilities or services
- Common base classes
- Composition patterns

Example:
- Modal uses Button for close action
- Card can contain Button in footer
- All components use Icon for visual elements
```

### 4. Design System Analysis

Extract design system information:

```markdown
## Design System

### Color Palette
Document primary, secondary, semantic colors

### Typography
Font families, sizes, weights, line heights

### Spacing
Spacing scale (xs, sm, md, lg, xl)

### Components
- Number of components
- Component categories (forms, layout, feedback, etc.)

### Variants
Common variant patterns (size, color, state)
```

### 5. Storybook/Documentation Analysis

If Storybook or docs are available:

```markdown
## Documentation Structure

- Storybook URL (if deployed)
- Available stories per component
- Interactive examples
- Props documentation
- Usage guidelines
```

### 6. Technology Stack

Document the Angular library's tech stack:

```markdown
## Technology Stack

- Angular version
- TypeScript version
- Styling approach (SCSS, Tailwind, CSS-in-JS)
- Build tool (Angular CLI, Nx, etc.)
- Testing framework
- Storybook version (if used)
- Design token system
```

### 7. File Structure Pattern

Document the component file organization:

```markdown
## Component File Structure

Typical component structure:
```
component-name/
├── component-name.component.ts      # Component logic
├── component-name.component.html    # Template
├── component-name.component.scss    # Styles
├── component-name.component.spec.ts # Tests
├── component-name.stories.ts        # Storybook stories
└── component-name.variants.ts       # CVA variants (if used)
```

### 8. Conversion Priority

Prioritize components for conversion:

```markdown
## Conversion Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Design tokens extraction
- [ ] Utility functions
- [ ] Button
- [ ] Input
- [ ] Icon

### Phase 2: Core Components (Week 3-4)
- [ ] Card
- [ ] Badge
- [ ] Alert
- [ ] Checkbox
- [ ] Radio

### Phase 3: Complex Components (Week 5-6)
- [ ] Dropdown/Select
- [ ] Modal
- [ ] Tabs
- [ ] Accordion

### Phase 4: Advanced (Week 7+)
- [ ] Data Table
- [ ] Date Picker
- [ ] Form Validation
- [ ] Toast/Snackbar
```

### 9. Create Discovery Document

Generate a comprehensive discovery document:

```markdown
# Angular UI Library Discovery Report

## Executive Summary
- Total components: [NUMBER]
- Component categories: [LIST]
- Design token count: [NUMBER]
- Estimated conversion effort: [TIMEFRAME]

## Component Catalog
[DETAILED LIST]

## Design Tokens
[TOKEN INVENTORY]

## Dependencies
[DEPENDENCY GRAPH]

## Recommendations
- Start with [COMPONENT] because [REASON]
- Consider [APPROACH] for [SCENARIO]
- Watch out for [CHALLENGE]

## Open Questions
- [QUESTION 1]
- [QUESTION 2]
```

## Analysis Guidelines

### What to Look For

#### Component Complexity
- Lines of code
- Number of child components
- State management complexity
- Accessibility requirements
- Animation/transitions

#### Reusability
- Used by other components?
- Can be broken into smaller parts?
- Dependencies on external libraries?

#### Variants
- How many visual variants?
- How many size options?
- Conditional rendering complexity

#### State Management
- Simple internal state?
- Complex state with side effects?
- Requires external state management?

### What to Document

For each component:
```markdown
## [Component Name]

**Purpose**: Brief description

**Complexity**: Low/Medium/High

**Props/Inputs**:
- prop1: type - description
- prop2: type - description

**Variants**: List all variants

**Dependencies**: List component dependencies

**Accessibility**: ARIA patterns used

**Responsive**: Responsive behavior notes

**RTL Support**: Yes/No, notes

**Priority**: High/Medium/Low

**Conversion Notes**: Special considerations
```

## Tools and Resources

### GitHub API (Optional)
Use GitHub's web interface or API to explore:
```bash
# List directory contents
https://api.github.com/repos/Mohamed-Adel-Web/vf-UI-components/contents/projects/ui/src/lib

# View file content
https://api.github.com/repos/Mohamed-Adel-Web/vf-UI-components/contents/projects/ui/src/lib/button/button.component.ts
```

### Manual Exploration
- Browse repository on GitHub
- Read README and documentation
- Check package.json for dependencies
- Review Storybook if deployed

## Deliverables

After discovery, create:

1. **COMPONENT-INVENTORY.md**
   - Complete list of components
   - Priority ranking
   - Complexity assessment

2. **DESIGN-TOKENS.md**
   - Extracted design tokens
   - Token categories
   - Mapping to native CSS custom properties

3. **CONVERSION-PLAN.md**
   - Phase-by-phase roadmap
   - Dependencies between components
   - Estimated effort per component

4. **TECHNICAL-NOTES.md**
   - Angular-specific patterns to avoid
   - Accessibility patterns to preserve
   - Performance considerations
   - Browser compatibility notes

## Validation

Discovery is complete when:
- [ ] All components identified and documented
- [ ] Design tokens extracted
- [ ] Component relationships mapped
- [ ] Conversion priorities established
- [ ] Technical challenges identified
- [ ] Roadmap created

## Next Steps

After discovery:
1. Review findings with team
2. Validate priorities
3. Select first component for analysis
4. Use **analyze-component.prompt.md** for deep dive

---

Use this prompt to thoroughly understand the Angular library before starting any conversion work.
