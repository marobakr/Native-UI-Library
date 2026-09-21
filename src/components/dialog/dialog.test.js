import { VfDialog, initDialogs } from './dialog.js';

function dialogTemplate() {
  return `
    <button type="button" id="trigger" data-dialog-open="d1">Open trigger</button>
    <div class="vf-dialog" data-component="dialog" id="d1" data-dismissible="true" inert>
      <div class="vf-dialog__backdrop" data-dialog-backdrop></div>
      <div class="vf-dialog__panel vf-dialog__panel--sm" role="alertdialog" aria-modal="true" aria-labelledby="d1-title" tabindex="-1" data-dialog-panel>
        <h2 id="d1-title">Suspend line?</h2>
        <button type="button" id="first-focusable" data-dialog-close>Keep active</button>
        <button type="button" id="last-focusable" data-dialog-close data-dialog-result="true">Suspend</button>
      </div>
    </div>
  `;
}

describe('VfDialog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
    VfDialog.openCount = 0;
  });

  it('renders closed by default and inert', () => {
    document.body.innerHTML = dialogTemplate();
    const dialog = new VfDialog(document.querySelector('.vf-dialog'));

    expect(dialog.isOpen).toBe(false);
    expect(dialog.element.hasAttribute('inert')).toBe(true);
  });

  it('opens via a [data-dialog-open] trigger and removes inert', () => {
    document.body.innerHTML = dialogTemplate();
    new VfDialog(document.querySelector('.vf-dialog'));

    document.getElementById('trigger').click();

    const dialog = document.querySelector('.vf-dialog');
    expect(dialog.classList.contains('vf-dialog--open')).toBe(true);
    expect(dialog.hasAttribute('inert')).toBe(false);
  });

  it('moves focus into the panel using the default first-tabbable autoFocus', async () => {
    document.body.innerHTML = dialogTemplate();
    const dialog = new VfDialog(document.querySelector('.vf-dialog'));

    dialog.open();
    await Promise.resolve();

    expect(document.activeElement).toBe(document.getElementById('first-focusable'));
  });

  it('focuses the panel itself when autoFocus is "dialog"', async () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    root.dataset.autofocus = 'dialog';
    const dialog = new VfDialog(root);

    dialog.open();
    await Promise.resolve();

    expect(document.activeElement).toBe(dialog.panel);
  });

  it('focuses the first heading when autoFocus is "first-heading"', async () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    root.dataset.autofocus = 'first-heading';
    const dialog = new VfDialog(root);

    dialog.open();
    await Promise.resolve();

    expect(document.activeElement).toBe(document.getElementById('d1-title'));
  });

  it('locks and releases body scroll', () => {
    document.body.innerHTML = dialogTemplate();
    const dialog = new VfDialog(document.querySelector('.vf-dialog'));

    dialog.open();
    expect(document.body.style.overflow).toBe('hidden');

    dialog.close();
    expect(document.body.style.overflow).toBe('');
  });

  it('emits vf-dialog:close with no result on backdrop click', () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    const spy = vi.fn();
    root.addEventListener('vf-dialog:close', spy);
    const dialog = new VfDialog(root);
    dialog.open();

    dialog.backdrop.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.result).toBeUndefined();
    expect(dialog.isOpen).toBe(false);
  });

  it('does not close on backdrop click when data-dismissible is false', () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    root.dataset.dismissible = 'false';
    const dialog = new VfDialog(root);
    dialog.open();

    dialog.backdrop.click();

    expect(dialog.isOpen).toBe(true);
  });

  it('emits vf-dialog:close on Escape when dismissible', () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    const spy = vi.fn();
    root.addEventListener('vf-dialog:close', spy);
    const dialog = new VfDialog(root);
    dialog.open();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(dialog.isOpen).toBe(false);
  });

  it('does not close on Escape when data-dismissible is false', () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    root.dataset.dismissible = 'false';
    const dialog = new VfDialog(root);
    dialog.open();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(dialog.isOpen).toBe(true);
  });

  it('passes the data-dialog-result value through on close', () => {
    document.body.innerHTML = dialogTemplate();
    const root = document.querySelector('.vf-dialog');
    const spy = vi.fn();
    root.addEventListener('vf-dialog:close', spy);
    const dialog = new VfDialog(root);
    dialog.open();

    document.getElementById('last-focusable').click();

    expect(spy.mock.calls[0][0].detail.result).toBe('true');
    expect(dialog.isOpen).toBe(false);
  });

  it('traps Tab focus between the first and last focusable elements', () => {
    document.body.innerHTML = dialogTemplate();
    const dialog = new VfDialog(document.querySelector('.vf-dialog'));
    dialog.open();

    const last = dialog.panel.querySelector('#last-focusable');
    last.focus();
    dialog.panel.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    );

    const first = dialog.panel.querySelector('#first-focusable');
    expect(document.activeElement).toBe(first);
  });

  it('initDialogs enhances every [data-component="dialog"] within a root', () => {
    document.body.innerHTML = dialogTemplate();
    const [dialog] = initDialogs(document);

    expect(dialog).toBeInstanceOf(VfDialog);
  });
});
