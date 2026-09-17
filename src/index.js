require('./style.css');

class PopoverWidget {
  constructor() {
    this._popovers = new Map(); 
  }

  init() {
    const buttons = document.querySelectorAll('[data-toggle="popover"]');
    
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePopover(btn);
      });
    });
  }

  togglePopover(element) {
    if (this._popovers.has(element)) {
      this.removePopover(element);
      return;
    }

    const title = element.getAttribute('title') || '';
    const content = element.getAttribute('data-content') || '';

    const popoverElement = document.createElement('div');
    popoverElement.className = 'popover';
    
    popoverElement.innerHTML = `
      <h3 class="popover-header">${title}</h3>
      <div class="popover-body">${content}</div>
      <div class="arrow"></div>
    `;

    document.body.appendChild(popoverElement);

    const { left, top, width } = element.getBoundingClientRect();

    const popoverLeft = left + window.scrollX + (width / 2) - (popoverElement.offsetWidth / 2);
    const popoverTop = top + window.scrollY - popoverElement.offsetHeight - 8;

    popoverElement.style.left = `${popoverLeft}px`;
    popoverElement.style.top = `${popoverTop}px`;

    this._popovers.set(element, popoverElement);
  }

  removePopover(element) {
    const popoverElement = this._popovers.get(element);
    if (popoverElement) {
      popoverElement.remove();
      this._popovers.delete(element);
    }
  }
}

module.exports = { PopoverWidget };

if (typeof window !== 'undefined' && typeof jest === 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const popoverWidget = new PopoverWidget();
    popoverWidget.init();
  });
}
