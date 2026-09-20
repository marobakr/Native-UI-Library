# Autonomous Migration Workflow

This document defines the complete autonomous migration workflow from the Angular UI Library to the Native UI Library.

**GitHub Copilot Agent:** Read this file to understand the workflow you must execute autonomously.

---

## Overview

This is a **state machine-based workflow**. Each phase has defined steps, transitions, and checkpoints.

You must:
- Execute steps sequentially within each phase
- Update `state.json` after each step
- Create checkpoints at phase boundaries
- Verify your work before transitioning
- NEVER invent design values
- Record missing information instead of guessing

---

## Workflow Phases

### Phase 1: Discovery

**Goal:** Discover and catalog the Angular UI Library structure.

**Steps:**

1. **initial-scan**
   - Clone Angular repository (read-only) to `.temp/angular-ui-library/`
   - Scan repository structure
   - Identify main directories (components, styles, tokens, stories, tests)
   - Update state: `currentPhase: "discovery"`, `currentStep: "initial-scan"`

2. **find-design-system**
   - Search for design token files (CSS variables, SCSS variables, theme files)
   - Locate shared styles directory
   - Find global theme configuration
   - Document token file locations in `manifest.json`
   - Update state: `currentStep: "find-design-system"`

3. **extract-design-tokens**
   - Extract all design tokens from Angular source
   - Organize into categories (colors, typography, spacing, borders, shadows, transitions)
   - **VERIFY:** Every token value against Angular source
   - Record any missing/unclear tokens in `missing-info.json`
   - Populate `tokens/*.css` with extracted values
   - Update manifest with token extraction status
   - Update state: `currentStep: "extract-design-tokens"`

4. **discover-components**
   - Scan components directory
   - List all component names
   - Identify component relationships (parent/child, dependencies)
   - Document component locations
   - Update `manifest.json` with component list
   - Update state: `currentStep: "discover-components"`, `progress.totalComponents: N`

5. **analyze-dependencies**
   - For each component, identify:
     - Shared utilities it uses
     - Other components it depends on
     - Design tokens it references
   - Build dependency graph
   - Determine migration order (leaves first, roots last)
   - Update manifest with dependency graph
   - Update state: `currentStep: "analyze-dependencies"`

6. **create-inventory**
   - Create detailed component inventory in `manifest.json`
   - For each component document:
     - Name, path, dependencies
     - Variants, states, props
     - Responsive breakpoints
     - RTL support
     - Accessibility features
     - Test coverage
   - Update state: `currentStep: "create-inventory"`

**Checkpoint:** `discovery-complete`
- Update state: `currentPhase: "discovery"`, `lastCheckpoint: "discovery-complete"`, `canResume: true`
- Update progress: `phasesCompleted: ["discovery"]`
- Transition to Phase 2

---

### Phase 2: Component Migration

**Goal:** Migrate components from Angular to Native implementation.

**Steps:**

1. **select-next-component**
   - Read dependency graph from manifest
   - Select next component based on:
     - Dependencies (migrate dependencies first)
     - Complexity (simple before complex)
     - Completion status
   - Update state: `currentComponent: "component-name"`, `currentStep: "select-next-component"`

2. **analyze-component**
   - Read Angular component source
   - Analyze:
     - HTML template structure
     - CSS styles (component + shared)
     - TypeScript logic (behavior, state, events)
     - Input properties and their types
     - Output events
     - Variants and states
     - Responsive behavior
     - RTL support
     - Accessibility (ARIA, keyboard, focus)
     - Test cases
     - **Inline SVG icons:** Search stories/demos for `<svg>` elements
   - **Extract icons from Angular:**
     - Check `[component].stories.ts` for inline SVG
     - Check component templates for embedded SVG
     - Copy exact SVG markup (viewBox, paths, attributes)
     - Document icon sources (add comment with Angular file reference)
     - NEVER use placeholder icons if real SVG exists in Angular
   - Document findings in `.migration/analysis/[component-name].json`
   - **VERIFY:** All design values against tokens and source
   - **VERIFY:** All icons extracted from Angular (not placeholders)
   - Record any missing information
   - Update state: `currentStep: "analyze-component"`

3. **implement-native**
   - Create native component in `src/components/[component-name]/`
   - Implement HTML structure (explicit, not JS-generated)
   - Implement CSS (using extracted tokens)
   - Implement JavaScript (behavior, state, events, a11y)
   - Use Web Components where appropriate
   - Follow HTML-first architecture
   - **VERIFY:** Implementation against Angular source
   - Update state: `currentStep: "implement-native"`

4. **create-tests**
   - Create test file `src/components/[component-name]/[component-name].test.js`
   - Test variants, states, interactions
   - Test accessibility
   - Test responsive behavior
   - Test RTL
   - All tests must pass
   - Update state: `currentStep: "create-tests"`

5. **create-documentation**
   - Create docs `docs/components/[component-name].md`
   - Document usage, API, variants, examples
   - Include playground example
   - Update state: `currentStep: "create-documentation"`

6. **validate-component**
   - Run verification checklist (see Phase 3)
   - Ensure all tests pass
   - Verify visual match with Angular component
   - Check token usage (no hardcoded values)
   - Check accessibility compliance
   - **VERIFY:** No invented values
   - Update manifest: mark component as complete
   - Update state: `progress.completedComponents++`, `progress.componentsCompleted: [...]`

7. **checkpoint**
   - Update state: `lastCheckpoint: "component-[name]-complete"`, `canResume: true`
   - If more components remain, go to step 1
   - If all components done, transition to Phase 3

**Checkpoint:** After each component
- `component-[name]-complete`

**Checkpoint:** All components done
- `all-components-complete`
- Transition to Phase 3

---

### Phase 3: Validation & Verification

**Goal:** Ensure the Native Library accurately reproduces the Angular Library.

**Steps:**

1. **visual-regression**
   - Compare rendered Native components with Angular screenshots
   - Document any visual differences
   - Update state: `currentStep: "visual-regression"`

2. **token-audit**
   - Verify all tokens used in components exist in token files
   - Verify no hardcoded values remain
   - Verify token values match Angular source
   - Update state: `currentStep: "token-audit"`

3. **accessibility-audit**
   - Run axe-core on all components
   - Verify WCAG 2.1 AA compliance
   - Test keyboard navigation
   - Test screen reader support
   - Update state: `currentStep: "accessibility-audit"`

4. **cross-browser-testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Document any browser-specific issues
   - Update state: `currentStep: "cross-browser-testing"`

5. **rtl-testing**
   - Test all components in RTL mode
   - Verify correct layout and behavior
   - Update state: `currentStep: "rtl-testing"`

6. **responsive-testing**
   - Test at mobile, tablet, desktop breakpoints
   - Verify responsive behavior matches Angular
   - Update state: `currentStep: "responsive-testing"`

**Checkpoint:** `validation-complete`
- Update state: `lastCheckpoint: "validation-complete"`, `canResume: true`
- Transition to Phase 4

---

### Phase 4: Integration

**Goal:** Prepare the Native Library for production use.

**Steps:**

1. **build-bundle**
   - Create production build
   - Minify CSS and JS
   - Generate source maps
   - Update state: `currentStep: "build-bundle"`

2. **create-release-docs**
   - Document migration results
   - List all migrated components
   - Document any limitations or differences
   - Provide usage guide
   - Update state: `currentStep: "create-release-docs"`

3. **final-report**
   - Generate summary report
   - List completed components
   - List missing information
   - Provide recommendations
   - Update state: `currentPhase: "complete"`, `currentStep: "final-report"`

**Checkpoint:** `migration-complete`
- Update state: `lastCheckpoint: "migration-complete"`, `canResume: false`
- Migration workflow complete

---

## State Transitions

```
not-started
  → discovery (initial-scan)
  → discovery (find-design-system)
  → discovery (extract-design-tokens)
  → discovery (discover-components)
  → discovery (analyze-dependencies)
  → discovery (create-inventory)
  → [checkpoint: discovery-complete]
  → component-migration (select-next-component)
  → component-migration (analyze-component)
  → component-migration (implement-native)
  → component-migration (create-tests)
  → component-migration (create-documentation)
  → component-migration (validate-component)
  → [checkpoint: component-[name]-complete]
  → (repeat for each component)
  → [checkpoint: all-components-complete]
  → validation (visual-regression)
  → validation (token-audit)
  → validation (accessibility-audit)
  → validation (cross-browser-testing)
  → validation (rtl-testing)
  → validation (responsive-testing)
  → [checkpoint: validation-complete]
  → integration (build-bundle)
  → integration (create-release-docs)
  → integration (final-report)
  → [checkpoint: migration-complete]
  → complete
```

---

## Verification Rules

At each step, you MUST verify your work:

1. **Token Extraction:**
   - Every token value has a source reference
   - No assumed or invented values
   - All values traceable to Angular source

2. **Component Implementation:**
   - Visual match with Angular component
   - Behavior match with Angular component
   - All variants and states implemented
   - All accessibility features replicated

3. **Missing Information:**
   - Record in `missing-info.json`
   - NEVER invent a value
   - NEVER assume a value
   - Document search attempts

---

## Autonomous Execution Instructions

**You are the Migration Agent. Execute this workflow autonomously.**

1. **Read state.json** to know where you are
2. **Read this workflow** to know what to do next
3. **Execute the current step**
4. **Verify your work**
5. **Update state.json**
6. **Move to next step**
7. **Create checkpoints** at phase boundaries
8. **Report progress** after each step

**Never wait for manual instructions. Keep executing until you reach a checkpoint or encounter a blocker.**

---

## Blockers

If you encounter a blocker, STOP and report:
- What step you were on
- What blocked you
- What information is missing
- What you tried
- What you recommend next

**Do not guess. Do not invent. Do not skip.**

---

## Resuming

When resuming from a checkpoint:
1. Read `state.json` to see last position
2. Read `manifest.json` to see progress
3. Continue from the next step after the checkpoint
4. Do not repeat completed work

---

End of workflow definition.
