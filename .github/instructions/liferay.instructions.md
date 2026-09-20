# Liferay Integration Instructions

## Purpose
This document provides guidance for integrating the Native UI Library with Liferay DXP/Portal, while keeping the library itself CMS-independent.

## Core Principle: Separation of Concerns

**CRITICAL**: The Native UI Library source code must remain completely independent of Liferay.

```
┌─────────────────────────────────────┐
│  Native UI Library (This Repo)      │
│  - Pure HTML/CSS/JS                 │
│  - Framework-independent            │
│  - CMS-independent                  │
│  - No FreeMarker syntax             │
│  - No Liferay dependencies          │
└─────────────────────────────────────┘
              │
              │ Integration Layer
              ▼
┌─────────────────────────────────────┐
│  Liferay Implementation             │
│  - FreeMarker templates             │
│  - Liferay fragments                │
│  - Theme integration                │
│  - Content mapping                  │
└─────────────────────────────────────┘
```

## Integration Approaches

### 1. Static Resources (Simplest)

Deploy the library as static resources in Liferay's theme:

```
liferay-theme/
└── src/
    └── css/
        └── custom/
            └── native-ui-library/
                ├── tokens/
                │   └── theme.css
                └── components/
                    ├── button.css
                    ├── card.css
                    └── ...
    └── js/
        └── native-ui-library/
            ├── components/
            │   ├── button.js
            │   ├── card.js
            │   └── ...
            └── init.js
```

Reference in theme's `portal_normal.ftl`:

```ftl
<link rel="stylesheet" href="${css_folder}/custom/native-ui-library/theme.css">
<script src="${javascript_folder}/native-ui-library/init.js" defer></script>
```

### 2. Liferay Fragments (Recommended)

Create Liferay fragments that wrap the native components:

```
fragments/
└── vodafone-ui/
    └── button/
        ├── index.html
        ├── main.js
        ├── styles.css
        └── fragment.json
```

**Fragment: index.html**
```html
<!-- This is where Liferay-specific logic lives -->
<div class="fragment-button">
  <button 
    class="vf-button vf-button--${configuration.variant}" 
    data-component="button"
    type="button"
  >
    <span class="vf-button__label">
      ${configuration.text}
    </span>
  </button>
</div>

<script>
  // Fragment configuration is available here
  const config = fragmentElement.querySelector('.fragment-button');
  // Initialize native component
  if (typeof VfButton !== 'undefined') {
    new VfButton(config.querySelector('[data-component="button"]'));
  }
</script>
```

**Fragment: fragment.json**
```json
{
  "configurationPath": "configuration.json",
  "cssPath": "styles.css",
  "htmlPath": "index.html",
  "jsPath": "main.js",
  "name": "Vodafone Button",
  "type": "component"
}
```

**Fragment: configuration.json**
```json
{
  "fieldSets": [
    {
      "fields": [
        {
          "name": "text",
          "label": "Button Text",
          "type": "text",
          "defaultValue": "Click me"
        },
        {
          "name": "variant",
          "label": "Variant",
          "type": "select",
          "defaultValue": "primary",
          "typeOptions": {
            "validValues": [
              {"value": "primary", "label": "Primary"},
              {"value": "secondary", "label": "Secondary"},
              {"value": "outline", "label": "Outline"}
            ]
          }
        },
        {
          "name": "url",
          "label": "Link URL",
          "type": "text",
          "defaultValue": ""
        }
      ]
    }
  ]
}
```

### 3. Liferay Web Components (Advanced)

If using Custom Elements, register them globally:

```javascript
// In Liferay theme's main.js or fragment
import { VfButton } from '/o/native-ui-library/components/button.js';

// Register custom element
if (!customElements.get('vf-button')) {
  customElements.define('vf-button', VfButton);
}
```

Then use in Liferay content:

```html
<vf-button variant="primary" size="large">
  Click me
</vf-button>
```

## Content Mapping

Liferay structures map to component props:

### Example: Card Component with Web Content

**Native Component (Pure):**
```html
<!-- card.html -->
<article class="vf-card" data-component="card">
  <div class="vf-card__image-container">
    <img class="vf-card__image" src="" alt="">
  </div>
  <div class="vf-card__content">
    <h3 class="vf-card__title">Title</h3>
    <p class="vf-card__description">Description</p>
  </div>
</article>
```

**Liferay Fragment (FreeMarker):**
```html
<!-- card fragment index.html -->
[#if webContent??]
  <article class="vf-card" data-component="card">
    <div class="vf-card__image-container">
      [#if webContent.image??]
        <img 
          class="vf-card__image" 
          src="${webContent.image.getData()}" 
          alt="${webContent.image.getAttribute("alt")}"
        >
      [/#if]
    </div>
    <div class="vf-card__content">
      <h3 class="vf-card__title">${webContent.title.getData()}</h3>
      <p class="vf-card__description">${webContent.description.getData()}</p>
    </div>
  </article>
[/#if]

<script>
  // Initialize native component
  const cardElement = fragmentElement.querySelector('[data-component="card"]');
  if (cardElement && typeof VfCard !== 'undefined') {
    new VfCard(cardElement);
  }
</script>
```

## Dynamic Content Patterns

### Pattern 1: Server-Side Rendering (FreeMarker)

Liferay renders the HTML with data, native components enhance behavior:

```ftl
<div class="vf-dropdown" data-component="dropdown">
  <button class="vf-dropdown__trigger" type="button">
    Select an option
  </button>
  <ul class="vf-dropdown__menu" hidden>
    [#list options as option]
      <li class="vf-dropdown__item" data-value="${option.value}">
        ${option.label}
      </li>
    [/#list]
  </ul>
</div>

<script>
  // Native component handles interactions only
  new VfDropdown(document.querySelector('[data-component="dropdown"]'));
</script>
```

### Pattern 2: Client-Side Rendering (AJAX)

Fetch data from Liferay headless APIs, render with JavaScript:

```javascript
// fragment main.js
async function loadContent() {
  const response = await fetch('/o/headless-delivery/v1.0/web-content/' + contentId);
  const data = await response.json();
  
  const card = document.querySelector('[data-component="card"]');
  const cardInstance = new VfCard(card);
  
  // Update component with data
  cardInstance.update({
    title: data.contentFields.find(f => f.name === 'title').contentFieldValue.data,
    description: data.contentFields.find(f => f.name === 'description').contentFieldValue.data,
    imageUrl: data.contentFields.find(f => f.name === 'image').contentFieldValue.link
  });
}
```

### Pattern 3: Progressive Enhancement

Start with server-rendered HTML, enhance with JavaScript:

```ftl
<!-- Server renders full content -->
<article class="vf-card" data-component="card" data-content-id="${webContent.articleId}">
  <div class="vf-card__image-container">
    <img class="vf-card__image" src="${webContent.image.getData()}" alt="">
  </div>
  <div class="vf-card__content">
    <h3 class="vf-card__title">${webContent.title.getData()}</h3>
    <p class="vf-card__description">${webContent.description.getData()}</p>
  </div>
</article>

<script>
  // JavaScript enhances with interactions (no re-rendering)
  const card = document.querySelector('[data-component="card"]');
  new VfCard(card); // Adds click handlers, accessibility, etc.
</script>
```

## Theme Integration

### Design Tokens in Liferay

Override design tokens in Liferay theme's CSS:

```css
/* liferay-theme/src/css/_custom.scss */

/* Import native library tokens as base */
@import 'native-ui-library/tokens/theme.css';

/* Override with Liferay-specific values */
:root {
  /* Use Liferay's color scheme */
  --vf-color-primary: ${primary-color};
  --vf-color-secondary: ${secondary-color};
  
  /* Use Liferay's spacing */
  --vf-space-base: 8px;
  
  /* Liferay-specific shadows */
  --vf-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Dark mode support */
[data-theme="dark"] {
  --vf-color-surface: #1a1a1a;
  --vf-color-text-primary: #ffffff;
}
```

### RTL Support in Liferay

Liferay sets the `dir` attribute automatically:

```html
<html dir="${languageUtil.get(locale, 'lang.dir')}">
```

The native components use CSS logical properties, so RTL works automatically.

## Liferay-Specific Enhancements

### Localization

Use Liferay's localization in fragments:

```html
<button class="vf-button" data-component="button">
  <span class="vf-button__label">
    ${languageUtil.get(locale, "submit")}
  </span>
</button>
```

### Permissions

Check permissions in FreeMarker before rendering:

```ftl
[#if permissionChecker.hasPermission(groupId, "com.liferay.portal.kernel.model.Group", scopeGroupId, "VIEW")]
  <article class="vf-card" data-component="card">
    <!-- Card content -->
  </article>
[/#if]
```

### Analytics Integration

Add Liferay Analytics Cloud tracking:

```javascript
// fragment main.js
const button = document.querySelector('[data-component="button"]');
button.addEventListener('click', (event) => {
  // Send analytics event to Liferay
  if (window.Analytics) {
    window.Analytics.send('buttonClicked', {
      elementId: event.target.id,
      fragmentId: fragmentEntryLinkId
    });
  }
});
```

## Asset Libraries

For reusable components, create a Liferay Fragment Collection:

```
vodafone-ui-library/
├── button/
├── card/
├── dropdown/
├── modal/
└── collection.json
```

**collection.json:**
```json
{
  "name": "Vodafone UI Library",
  "description": "Native UI components for Vodafone Egypt"
}
```

Deploy as a fragment collection that can be imported across sites.

## Example: Complete Fragment

**Button Fragment with Liferay Integration:**

```html
<!-- index.html -->
<div class="fragment-vf-button">
  [#if configuration.url?has_content]
    <a 
      href="${configuration.url}"
      class="vf-button vf-button--${configuration.variant} vf-button--${configuration.size}"
      data-component="button"
      [#if configuration.openInNewTab]target="_blank" rel="noopener noreferrer"[/#if]
    >
      [#if configuration.iconStart?has_content]
        <span class="vf-button__icon vf-button__icon--start">
          <i class="${configuration.iconStart}"></i>
        </span>
      [/#if]
      <span class="vf-button__label">
        [#if configuration.useLanguageKey]
          ${languageUtil.get(locale, configuration.text)}
        [#else]
          ${configuration.text}
        [/#if]
      </span>
      [#if configuration.iconEnd?has_content]
        <span class="vf-button__icon vf-button__icon--end">
          <i class="${configuration.iconEnd}"></i>
        </span>
      [/#if]
    </a>
  [#else]
    <button 
      class="vf-button vf-button--${configuration.variant} vf-button--${configuration.size}"
      data-component="button"
      type="${configuration.type!"button"}"
      [#if configuration.disabled]disabled[/#if]
    >
      [#if configuration.iconStart?has_content]
        <span class="vf-button__icon vf-button__icon--start">
          <i class="${configuration.iconStart}"></i>
        </span>
      [/#if]
      <span class="vf-button__label">
        [#if configuration.useLanguageKey]
          ${languageUtil.get(locale, configuration.text)}
        [#else]
          ${configuration.text}
        [/#if]
      </span>
      [#if configuration.iconEnd?has_content]
        <span class="vf-button__icon vf-button__icon--end">
          <i class="${configuration.iconEnd}"></i>
        </span>
      [/#if]
    </button>
  [/#if]
</div>
```

```javascript
// main.js
const buttonElement = fragmentElement.querySelector('[data-component="button"]');

if (buttonElement && typeof VfButton !== 'undefined') {
  const button = new VfButton(buttonElement);
  
  // Listen for button events
  buttonElement.addEventListener('vf-button:click', (event) => {
    // Send analytics
    if (window.Analytics) {
      Analytics.send('buttonClicked', {
        fragmentId: fragmentEntryLinkId,
        buttonText: event.detail.text
      });
    }
  });
}
```

## Testing with Liferay

### Local Development

1. Run Liferay locally (Docker or bundle)
2. Deploy native library as theme resources
3. Create test fragments
4. Test in Liferay's page editor

### Fragment Testing Checklist

- [ ] Component renders correctly in fragment
- [ ] Configuration options work
- [ ] Localization displays correct strings
- [ ] RTL layout is correct
- [ ] Component works in edit and view modes
- [ ] Responsive behavior is correct
- [ ] Analytics events are sent
- [ ] Component works with Liferay's asset system

## Documentation for Liferay Developers

Provide a separate integration guide:

```
docs/liferay-integration/
├── README.md                    # Overview
├── getting-started.md           # Setup instructions
├── fragments/                   # Fragment examples
│   ├── button.md
│   ├── card.md
│   └── ...
├── patterns/                    # Integration patterns
│   ├── server-side-rendering.md
│   ├── client-side-rendering.md
│   └── progressive-enhancement.md
└── examples/                    # Complete examples
    ├── blog-listing/
    ├── product-catalog/
    └── ...
```

## Summary

**Key Principles:**

1. **Native library remains CMS-independent** - No Liferay code in src/
2. **Integration happens in Liferay layer** - FreeMarker, fragments, themes
3. **Server renders structure** - Native components enhance behavior
4. **Design tokens enable theming** - Override in Liferay theme
5. **Progressive enhancement** - Works with or without JavaScript
6. **Accessibility built-in** - No special Liferay configuration needed

---

**Remember**: The native library is portable. Liferay is just one consumer.
