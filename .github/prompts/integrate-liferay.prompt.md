# Prompt: Integrate Component with Liferay

## Context
You are creating Liferay-specific integration documentation and examples for a native component, without modifying the core component library.

## Objective
Provide clear, production-ready guidance for using the native component within Liferay DXP/Portal environments.

## Prerequisites
- Native component completed and validated
- Understanding of Liferay fragments
- Understanding of Liferay themes
- Understanding of Liferay's content management

## Input Required
- Component name: `[COMPONENT_NAME]`
- Component location: `src/components/[component-name]/`
- Liferay version: `[7.x]`

## Tasks

### 1. Create Liferay Fragment

Create a Liferay fragment collection structure:

```
liferay-integration/
└── fragments/
    └── vodafone-ui-[component-name]/
        ├── fragment.json
        ├── configuration.json
        ├── index.html
        ├── main.js
        └── styles.css
```

#### fragment.json
```json
{
  "cssPath": "styles.css",
  "configurationPath": "configuration.json",
  "htmlPath": "index.html",
  "jsPath": "main.js",
  "name": "Vodafone [Component Name]",
  "type": "component",
  "thumbnail": "thumbnail.png"
}
```

#### configuration.json
Define configurable options for Liferay content editors:

```json
{
  "fieldSets": [
    {
      "label": "General",
      "fields": [
        {
          "name": "variant",
          "label": "Variant",
          "description": "Visual style variant",
          "type": "select",
          "dataType": "string",
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
          "name": "size",
          "label": "Size",
          "type": "select",
          "dataType": "string",
          "defaultValue": "medium",
          "typeOptions": {
            "validValues": [
              {"value": "small", "label": "Small"},
              {"value": "medium", "label": "Medium"},
              {"value": "large", "label": "Large"}
            ]
          }
        }
      ]
    },
    {
      "label": "Content",
      "fields": [
        {
          "name": "content",
          "label": "Content",
          "type": "text",
          "dataType": "string",
          "defaultValue": "Default text"
        }
      ]
    },
    {
      "label": "Behavior",
      "fields": [
        {
          "name": "disabled",
          "label": "Disabled",
          "type": "checkbox",
          "dataType": "bool",
          "defaultValue": false
        }
      ]
    }
  ]
}
```

#### index.html
FreeMarker template that uses the native component:

```html
[#-- Vodafone [Component Name] Fragment --]
[#-- Uses the native UI library component with Liferay configuration --]

<div class="fragment-vodafone-[component-name]" data-fragment-id="${fragmentEntryLinkNamespace}">
  
  [#-- Include the native component markup --]
  [#-- This is where the NATIVE component HTML structure goes --]
  [#-- Inject Liferay configuration values into the markup --]
  
  <[element] 
    class="vf-[component-name] vf-[component-name]--${configuration.variant} vf-[component-name]--${configuration.size}"
    data-component="[component-name]"
    [#if configuration.disabled]disabled[/#if]
  >
    [#-- Component structure from native library --]
    <div class="vf-[component-name]__element">
      ${configuration.content}
    </div>
  </[element]>
  
</div>

[#-- Fragment initialization script --]
<script>
  (function() {
    // Wait for native library to load
    if (typeof Vf[ComponentName] === 'undefined') {
      console.warn('Vodafone UI Library not loaded');
      return;
    }
    
    // Initialize component
    const fragmentRoot = document.querySelector('[data-fragment-id="${fragmentEntryLinkNamespace}"]');
    const componentElement = fragmentRoot.querySelector('[data-component="[component-name]"]');
    
    if (componentElement) {
      // Create component instance
      const component = new Vf[ComponentName](componentElement, {
        variant: '${configuration.variant}',
        size: '${configuration.size}'
      });
      
      // Store instance for potential cleanup
      fragmentRoot._componentInstance = component;
      
      // Handle fragment-specific events
      componentElement.addEventListener('vf-[component-name]:action', function(event) {
        // Send analytics to Liferay if available
        if (window.Analytics) {
          Analytics.send('[component-name]Action', {
            fragmentId: '${fragmentEntryLinkNamespace}',
            variant: '${configuration.variant}',
            size: '${configuration.size}'
          });
        }
        
        // Custom fragment logic
        console.log('[Component Name] action:', event.detail);
      });
    }
  })();
</script>
```

#### main.js
Additional fragment-specific JavaScript:

```javascript
/**
 * Vodafone [Component Name] Fragment
 * Additional fragment-specific functionality
 */

// This file is for fragment-specific enhancements
// The core component logic remains in the native library

// Fragment-level configuration
const fragmentNamespace = fragmentElement.dataset.fragmentId || 'default';

// Get component instance
const componentElement = fragmentElement.querySelector('[data-component="[component-name]"]');

if (componentElement && typeof Vf[ComponentName] !== 'undefined') {
  // Component is already initialized in index.html
  // This is for additional fragment-specific customizations
  
  // Example: Add Liferay-specific event handling
  componentElement.addEventListener('vf-[component-name]:action', function(event) {
    // Handle in Liferay context
    console.log('Fragment event:', event);
  });
}
```

#### styles.css
Fragment-specific style overrides (use sparingly):

```css
/**
 * Vodafone [Component Name] Fragment Styles
 * 
 * NOTE: The native component styles are loaded globally via theme.
 * This file is ONLY for fragment-specific overrides or adjustments.
 * Keep it minimal!
 */

.fragment-vodafone-[component-name] {
  /* Fragment container styles */
  margin: var(--vf-space-md) 0;
}

/* Liferay edit mode specific adjustments */
.has-edit-mode-menu .fragment-vodafone-[component-name] {
  /* Styles for when fragment is being edited */
  outline: 1px dashed rgba(0, 0, 0, 0.2);
}
```

### 2. Create Theme Integration Guide

Document how to include the library in a Liferay theme:

```markdown
# Liferay Theme Integration

## Installation

### Option 1: Include in Theme (Recommended)

1. Copy the native UI library to your theme:

```
liferay-theme/
└── src/
    └── css/
        └── vodafone-ui/
            ├── tokens/
            │   └── theme.css
            └── components/
                └── [component-name]/
                    └── [component-name].css
    └── js/
        └── vodafone-ui/
            └── components/
                └── [component-name]/
                    └── [component-name].js
```

2. Include in `portal_normal.ftl`:

```ftl
<head>
  <!-- Other head content -->
  
  <!-- Vodafone UI Library Styles -->
  <link rel="stylesheet" href="${css_folder}/vodafone-ui/tokens/theme.css">
  <link rel="stylesheet" href="${css_folder}/vodafone-ui/components/[component-name]/[component-name].css">
</head>

<body>
  <!-- Body content -->
  
  <!-- Vodafone UI Library Scripts -->
  <script src="${javascript_folder}/vodafone-ui/components/[component-name]/[component-name].js" defer></script>
</body>
```

### Option 2: CDN/External Hosting

Host the library externally and reference it:

```ftl
<head>
  <link rel="stylesheet" href="https://cdn.example.com/vodafone-ui/1.0.0/vodafone-ui.min.css">
</head>

<body>
  <script src="https://cdn.example.com/vodafone-ui/1.0.0/vodafone-ui.min.js" defer></script>
</body>
```

### Option 3: Client Extension (Liferay 7.4+)

Create a Client Extension for the library:

```
vodafone-ui-client-extension/
├── client-extension.yaml
└── static/
    ├── css/
    │   └── vodafone-ui.css
    └── js/
        └── vodafone-ui.js
```

## Design Token Customization

Override design tokens in your theme's `_custom.scss`:

```scss
/* Import native library tokens */
@import 'vodafone-ui/tokens/theme';

/* Override with Liferay site-specific values */
:root {
  /* Use Liferay's colors */
  --vf-color-primary: ${primary-color};
  --vf-color-secondary: ${secondary-color};
  
  /* Adjust for Liferay's layout */
  --vf-space-base: 8px;
}
```
```

### 3. Create Content Mapping Examples

Show how to map Liferay content structures to components:

```markdown
# Content Mapping Examples

## Web Content with Component

### Web Content Structure
```xml
<root>
  <dynamic-element name="title" type="text"/>
  <dynamic-element name="description" type="text"/>
  <dynamic-element name="image" type="image"/>
  <dynamic-element name="linkUrl" type="text"/>
  <dynamic-element name="linkText" type="text"/>
</root>
```

### Fragment Template
```html
[#if webContent??]
  <article 
    class="vf-card" 
    data-component="card"
  >
    [#if webContent.image??]
      <div class="vf-card__image-container">
        <img 
          class="vf-card__image"
          src="${webContent.image.getData()}"
          alt="${webContent.image.getAttribute('alt')!''}"
        >
      </div>
    [/#if]
    
    <div class="vf-card__content">
      <h3 class="vf-card__title">
        ${webContent.title.getData()}
      </h3>
      <p class="vf-card__description">
        ${webContent.description.getData()}
      </p>
      
      [#if webContent.linkUrl?? && webContent.linkUrl.getData()?has_content]
        <div class="vf-card__footer">
          <a 
            href="${webContent.linkUrl.getData()}"
            class="vf-button vf-button--primary"
            data-component="button"
          >
            <span class="vf-button__label">
              ${webContent.linkText.getData()!'Read More'}
            </span>
          </a>
        </div>
      [/#if]
    </div>
  </article>
  
  <script>
    // Initialize components
    if (typeof VfCard !== 'undefined') {
      const card = document.querySelector('[data-component="card"]');
      if (card) new VfCard(card);
    }
    if (typeof VfButton !== 'undefined') {
      const button = document.querySelector('[data-component="button"]');
      if (button) new VfButton(button);
    }
  </script>
[/#if]
```

## Asset Publisher Template

Display list of content with components:

```html
[#if entries?has_content]
  <div class="vf-card-grid">
    [#list entries as entry]
      [#assign webContent = entry.getAssetRenderer().getArticle()]
      
      <article class="vf-card" data-component="card">
        <!-- Card markup using webContent fields -->
      </article>
    [/#list]
  </div>
  
  <script>
    // Initialize all cards
    if (typeof VfCard !== 'undefined') {
      document.querySelectorAll('[data-component="card"]').forEach(card => {
        new VfCard(card);
      });
    }
  </script>
[/#if]
```
```

### 4. Create API Integration Examples

Show how to use with Liferay Headless APIs:

```markdown
# Headless API Integration

## Fetching Content

```javascript
// Fetch web content from Liferay Headless API
async function loadContent(contentId) {
  try {
    const response = await fetch(
      `/o/headless-delivery/v1.0/structured-contents/${contentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Include authentication if needed
        }
      }
    );
    
    const data = await response.json();
    
    // Map to component
    const componentElement = document.querySelector('[data-component="card"]');
    const component = new VfCard(componentElement);
    
    // Update component with API data
    component.update({
      title: data.contentFields.find(f => f.name === 'title')?.contentFieldValue?.data,
      description: data.contentFields.find(f => f.name === 'description')?.contentFieldValue?.data,
      imageUrl: data.contentFields.find(f => f.name === 'image')?.contentFieldValue?.link
    });
    
  } catch (error) {
    console.error('Failed to load content:', error);
  }
}
```

## Posting Form Data

```javascript
// Submit form data to Liferay
async function submitForm(formData) {
  const component = document.querySelector('[data-component="form"]');
  
  try {
    const response = await fetch('/o/headless-delivery/v1.0/form-documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Success feedback using component
      component.classList.add('vf-form--success');
    } else {
      // Error feedback
      component.classList.add('vf-form--error');
    }
  } catch (error) {
    component.classList.add('vf-form--error');
  }
}
```
```

### 5. Create Localization Guide

```markdown
# Localization in Liferay

## Using Liferay Language Keys

```html
<!-- Fragment template -->
<button class="vf-button vf-button--primary" data-component="button">
  <span class="vf-button__label">
    ${languageUtil.get(locale, "submit")}
  </span>
</button>
```

## Adding Custom Language Keys

1. Create language properties files:

```
Language.properties
submit=Submit
cancel=Cancel
loading=Loading...

Language_ar.properties
submit=إرسال
cancel=إلغاء
loading=جاري التحميل...
```

2. Use in fragments:

```html
<button class="vf-button" data-component="button">
  <span class="vf-button__label">
    ${languageUtil.get(locale, "vodafone.ui.submit")}
  </span>
</button>
```

## RTL Support

Liferay automatically sets `dir` attribute:

```html
<html dir="${languageUtil.get(locale, 'lang.dir')}">
```

The native components use CSS logical properties, so RTL works automatically.
```

### 6. Create Analytics Integration Guide

```markdown
# Analytics Integration

## Liferay Analytics Cloud

```javascript
// Fragment event handling with Analytics
componentElement.addEventListener('vf-[component-name]:action', function(event) {
  // Send to Liferay Analytics Cloud
  if (window.Analytics) {
    Analytics.send('componentInteraction', {
      componentType: '[component-name]',
      variant: event.detail.variant,
      fragmentId: fragmentEntryLinkNamespace,
      pageId: Liferay.ThemeDisplay.getPlid(),
      userId: Liferay.ThemeDisplay.getUserId()
    });
  }
});
```

## Google Analytics

```javascript
// Send to Google Analytics
componentElement.addEventListener('vf-[component-name]:action', function(event) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'component_interaction', {
      'event_category': 'ui_component',
      'event_label': '[component-name]',
      'value': event.detail.value
    });
  }
});
```
```

### 7. Create Testing Guide for Liferay

```markdown
# Testing in Liferay

## Fragment Testing

### Manual Testing
1. Deploy fragment to Liferay
2. Add fragment to a page
3. Configure fragment settings
4. Verify component renders correctly
5. Test in edit mode and view mode
6. Test with different configurations

### Automated Testing
Use Liferay's testing framework:

```java
@Test
public void testFragmentRenders() {
    // Test fragment rendering
}
```

## Theme Testing

### Local Development
1. Start Liferay locally
2. Deploy theme with native library
3. Create test page
4. Add fragments
5. Verify styles load correctly
6. Verify JavaScript initializes

## Compatibility Testing
- [ ] Liferay 7.3
- [ ] Liferay 7.4
- [ ] Liferay DXP
- [ ] Liferay Portal CE

## Permissions Testing
Test with different user roles:
- [ ] Guest user
- [ ] Authenticated user
- [ ] Content editor
- [ ] Administrator
```

## Deliverables

Create the following integration documentation:

1. **liferay-integration/README.md**
   - Overview of integration approach
   - Installation instructions
   - Quick start guide

2. **liferay-integration/fragments/[component-name]/**
   - Complete fragment implementation
   - Configuration options
   - Usage examples

3. **liferay-integration/docs/theme-integration.md**
   - Theme setup guide
   - Asset library setup
   - Design token customization

4. **liferay-integration/docs/content-mapping.md**
   - Web content structure examples
   - Asset publisher templates
   - Content mapping patterns

5. **liferay-integration/docs/api-integration.md**
   - Headless API examples
   - Form submission
   - Dynamic content loading

6. **liferay-integration/examples/**
   - Complete working examples
   - Sample pages
   - Template snippets

## Validation

Liferay integration is complete when:
- [ ] Fragment works in Liferay
- [ ] Configuration options work
- [ ] Component renders correctly
- [ ] JavaScript initializes properly
- [ ] Styles apply correctly
- [ ] Works in edit and view modes
- [ ] Localization works
- [ ] RTL support works
- [ ] Analytics integration works
- [ ] Documentation complete
- [ ] Examples provided

## Next Steps

1. Deploy fragment to test environment
2. Validate with content editors
3. Create user training materials
4. Document best practices
5. Create troubleshooting guide

---

Use this prompt to create production-ready Liferay integration for native components.
