# GitHub Copilot Instructions - Native UI Library

## Project Overview

This is a **Native UI Library** that provides framework-independent web components based on the Vodafone Egypt Angular UI Library. The components are built using standard web technologies (HTML, CSS, JavaScript) and are designed for use in Liferay and other non-Angular environments.

## Core Principles

### 1. Framework Independence
- **No Angular dependencies** - This is a clean native implementation
- **No framework assumptions** - Components work in any environment
- **Standards-based** - Use Web Components/Custom Elements where appropriate

### 2. HTML-First Architecture
- **Explicit HTML structure** - Primary component markup must be hard-coded in HTML files
- **No dynamic DOM generation** - Do NOT use innerHTML, createElement, appendChild to build the entire component structure
- **Separation of concerns**:
  - HTML → Structure and semantic markup
  - CSS → Presentation and styling
  - JavaScript → Behavior, interactions, state management, accessibility enhancements

### 3. CMS Independence
- **No Liferay-specific syntax** in source components
- **No FreeMarker templates** in the library
- **Clean, portable components** that work anywhere
- Liferay integration happens at the implementation layer, not in the library

### 4. Reference-Only Angular Library
- The Angular library at `https://github.com/Mohamed-Adel-Web/vf-UI-components.git` is **READ ONLY**
- Use it to understand:
  - Component structure and hierarchy
  - Visual design and layout
  - Variants and states
  - Behavior and interactions
  - Accessibility patterns
  - Responsive behavior
  - RTL/LTR support
  - Localization strategy
  - Design tokens and theming
  - Public APIs and props
  - Documentation and stories
  - Test coverage
  - Component relationships
- **Never copy Angular code directly**
- **Never modify the Angular repository**
- **Never include the Angular repository in this project**

## Repository Structure

```
native-ui-library/
├── .github/                           # GitHub Copilot configuration
│   ├── copilot-instructions.md        # This file
│   ├── instructions/                  # Domain-specific instructions
│   ├── prompts/                       # Reusable prompt templates
│   ├── agents/                        # Custom GitHub Copilot agent
│   └── skills/                        # Specialized skills
├── src/                               # Component source files
│   ├── components/                    # Individual components
│   │   └── button/
│   │       ├── button.html            # Explicit component markup
│   │       ├── button.css             # Component styles
│   │       ├── button.js              # Component behavior
│   │       └── button.test.js         # Component tests
│   └── utils/                         # Shared utilities
├── tokens/                            # Design tokens (CSS custom properties)
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── theme.css
├── playground/                        # Local development environment
│   └── index.html                     # Component showcase
├── dist/                              # Built/compiled output
├── PROJECT-CONTEXT.md                 # Project context and decisions
├── package.json                       # Dependencies and scripts
└── README.md                          # Project documentation
```

## Development Workflow

### Phase 1: Discovery
1. Analyze the Angular UI Library structure
2. Identify components and their relationships
3. Document component variants, states, and behaviors
4. Map design tokens and theming strategy

### Phase 2: Component Analysis
1. Select a component from the Angular library
2. Understand its structure, props, and behavior
3. Identify accessibility patterns (ARIA attributes, keyboard navigation)
4. Document responsive and RTL/LTR considerations
5. Extract design tokens used by the component

### Phase 3: Native Implementation
1. Create explicit HTML structure (no dynamic generation)
2. Implement CSS with design tokens
3. Add JavaScript for behavior and state management
4. Implement accessibility features
5. Ensure responsive and RTL/LTR support
6. Create component documentation

### Phase 4: Validation
1. Test component functionality
2. Verify accessibility (WCAG compliance)
3. Test responsive behavior
4. Test RTL/LTR switching
5. Cross-browser testing
6. Performance validation

### Phase 5: Liferay Integration (Future)
1. Document Liferay integration patterns
2. Provide usage examples for Liferay developers
3. Create Liferay-specific documentation

## Code Quality Standards

### HTML
- Semantic HTML5 elements
- Proper heading hierarchy
- Valid, accessible markup
- Clean, readable structure
- Meaningful class names (BEM or similar)

### CSS
- CSS custom properties for theming
- Mobile-first responsive design
- RTL/LTR support via logical properties
- No hard-coded colors or sizes (use tokens)
- BEM or similar naming convention

### JavaScript
- ES6+ modern syntax
- Clear, documented functions
- Proper event handling and cleanup
- No memory leaks
- Progressive enhancement

### Accessibility
- WCAG 2.1 AA compliance
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader testing

## Design Tokens

Design tokens must be implemented as CSS custom properties:

```css
:root {
  /* Colors */
  --vf-color-primary: #e60000;
  --vf-color-secondary: #333333;
  
  /* Spacing */
  --vf-space-xs: 4px;
  --vf-space-sm: 8px;
  
  /* Typography */
  --vf-font-size-base: 16px;
  --vf-line-height-base: 1.5;
  
  /* Shadows */
  --vf-shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
}
```

## Component Conventions

### File Structure
Each component lives in its own directory:
```
src/components/button/
├── button.html       # Component markup template
├── button.css        # Component styles
├── button.js         # Component behavior
├── button.test.js    # Unit tests
├── button.stories.js # Storybook stories (optional)
└── README.md         # Component documentation
```

### Naming
- Component files: `component-name.html`, `component-name.css`, `component-name.js`
- Classes: `vf-component-name`, `vf-component-name--variant`, `vf-component-name__element`
- Custom elements: `<vf-component-name>`
- CSS custom properties: `--vf-component-property`

### Documentation
Each component must include:
- Description and purpose
- Props/attributes and their types
- Variants and states
- Usage examples
- Accessibility notes
- Browser support
- Known issues

## GitHub Copilot Usage

### When to Use the Custom Agent
Use the `@native-ui-engineer` agent for:
- Discovering components in the Angular library
- Analyzing Angular components for conversion
- Converting Angular components to native
- Validating native component implementations
- Planning Liferay integration

### Using Prompts
Prompts are reusable templates in `.github/prompts/`:
- Use them as starting points for common tasks
- Customize with specific component names and requirements
- Chain prompts for complex workflows

### Using Skills
Skills in `.github/skills/` provide specialized capabilities:
- **angular-library-discovery**: Explore and document the Angular library
- **component-analysis**: Deep-dive into a specific Angular component
- **angular-to-native**: Convert Angular components to native
- **component-validation**: Verify native component quality

## Anti-Patterns to Avoid

### ❌ DO NOT
- Copy Angular code line-by-line
- Use innerHTML to generate component markup
- Hard-code design values (colors, sizes, etc.)
- Include Angular dependencies
- Add Liferay/FreeMarker syntax to source components
- Modify the Angular reference repository
- Create unnecessary abstractions
- Use framework-specific patterns

### ✅ DO
- Reimagine components as native web components
- Write explicit HTML structure
- Use CSS custom properties for theming
- Create framework-independent components
- Document integration patterns separately
- Keep components simple and focused
- Follow web standards

## Getting Help

1. Reference `.github/instructions/` for domain-specific guidance
2. Use `.github/prompts/` for common task templates
3. Invoke `@native-ui-engineer` agent for complex workflows
4. Consult `PROJECT-CONTEXT.md` for historical decisions
5. Review the Angular library for design reference

## Quality Checklist

Before marking a component complete:
- [ ] HTML structure is explicit and semantic
- [ ] CSS uses design tokens (no hard-coded values)
- [ ] JavaScript is clean and well-documented
- [ ] Component is accessible (WCAG AA)
- [ ] Keyboard navigation works
- [ ] RTL/LTR support is implemented
- [ ] Responsive behavior is correct
- [ ] Tests are written and passing
- [ ] Documentation is complete
- [ ] No Angular dependencies
- [ ] No dynamic DOM generation for structure
- [ ] Cross-browser tested

---

**Remember**: This library must be a clean, native reimplementation. The Angular library is a design reference, not a code template.
