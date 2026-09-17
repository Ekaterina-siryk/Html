const { PopoverWidget } = require('./src/index.js');

describe('PopoverWidget DOM Interaction', () => {
  let button;
  let widget;

  beforeEach(() => {
    document.body.innerHTML = `
      <button 
        type="button" 
        data-toggle="popover" 
        title="Popover title" 
        data-content="Amazing content!"
      >
        Click me
      </button>
    `;
    
    widget = new PopoverWidget();
    widget.init();
    button = document.querySelector('[data-toggle="popover"]');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show popover with correct content on click', () => {
    button.click();

    const popover = document.querySelector('.popover');
    expect(popover).toBeTruthy();

    const header = popover.querySelector('.popover-header');
    const body = popover.querySelector('.popover-body');

    expect(header.textContent).toBe('Popover title');
    expect(body.textContent).toBe('Amazing content!');
  });

  test('should toggle (hide) popover on second click', () => {
    button.click();
    expect(document.querySelector('.popover')).toBeTruthy();

    button.click();
    expect(document.querySelector('.popover')).toBeNull();
  });
});

