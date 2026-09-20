import { VfButton, initButtons } from './button.js';

function createButton(html) {
  document.body.innerHTML = html;
  return document.querySelector('[data-component="button"]');
}

describe('VfButton', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('syncs aria-disabled/aria-busy from existing attributes on init', () => {
    const el = createButton(
      '<button class="vf-button vf-button--primary vf-button--md" data-component="button" disabled>Button</button>',
    );
    new VfButton(el);

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');
  });

  it('setDisabled toggles disabled and aria-disabled', () => {
    const el = createButton(
      '<button class="vf-button vf-button--primary vf-button--md" data-component="button">Button</button>',
    );
    const button = new VfButton(el);

    button.setDisabled(true);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');

    button.setDisabled(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.hasAttribute('aria-disabled')).toBe(false);
  });

  it('setLoading toggles aria-busy without disabling the button', () => {
    const el = createButton(
      '<button class="vf-button vf-button--primary vf-button--md" data-component="button">Button</button>',
    );
    const button = new VfButton(el);

    button.setLoading(true);
    expect(el.getAttribute('aria-busy')).toBe('true');
    expect(el.hasAttribute('disabled')).toBe(false);

    button.setLoading(false);
    expect(el.hasAttribute('aria-busy')).toBe(false);
  });

  it('setVariant swaps the variant modifier class exclusively', () => {
    const el = createButton(
      '<button class="vf-button vf-button--primary vf-button--md" data-component="button">Button</button>',
    );
    const button = new VfButton(el);

    button.setVariant('danger');
    expect(el.classList.contains('vf-button--danger')).toBe(true);
    expect(el.classList.contains('vf-button--primary')).toBe(false);
  });

  it('setSize swaps the size modifier class exclusively', () => {
    const el = createButton(
      '<button class="vf-button vf-button--primary vf-button--md" data-component="button">Button</button>',
    );
    const button = new VfButton(el);

    button.setSize('lg');
    expect(el.classList.contains('vf-button--lg')).toBe(true);
    expect(el.classList.contains('vf-button--md')).toBe(false);
  });

  it('setFullWidth toggles the full-width modifier class', () => {
    const el = createButton(
      '<button class="vf-button vf-button--primary vf-button--md" data-component="button">Button</button>',
    );
    const button = new VfButton(el);

    button.setFullWidth(true);
    expect(el.classList.contains('vf-button--full-width')).toBe(true);

    button.setFullWidth(false);
    expect(el.classList.contains('vf-button--full-width')).toBe(false);
  });
});

describe('initButtons', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('enhances every matching element within the given root', () => {
    document.body.innerHTML = `
      <div id="root">
        <button class="vf-button" data-component="button" disabled>A</button>
        <a href="#" class="vf-button" data-component="button">B</a>
      </div>
    `;
    const instances = initButtons(document.getElementById('root'));

    expect(instances).toHaveLength(2);
    expect(instances[0].element.getAttribute('aria-disabled')).toBe('true');
  });
});
