import animate from './animate.js';

class Panel {
  constructor(panelEl, index, accordion) {
    this.domEl = panelEl;
    this.parentAccordion = accordion;
    this._isOpen = index === 0; // First panel is active
    this.panelId = `acc-${accordion.id}-panel-${index}`;
    this.panelContentId = `acc-${accordion.id}-content-${index}`;
    this.panelHeaderId = `acc-${accordion.id}-header-${index}`;

    this.panelHeader = this.domEl.querySelector('.accordion__header');
    this.panelHeader.id = this.panelHeaderId;
    this.panelHeader.setAttribute('role', 'tab');
    this.panelHeader.setAttribute('aria-controls', this.panelContentId);
    this.panelHeader.tabIndex = '0';

    this.panelContent = this.domEl.querySelector('.accordion__panel-content');
    this.panelContent.id = this.panelContentId;
    this.panelContent.setAttribute('role', 'tabpanel');
    this.panelContent.setAttribute('aria-labelledby', this.panelHeaderId);
    this.panelContent.hidden = !this.isOpen;
    this.panelContent.style.opacity = this.isOpen ? '1' : '0';
    this.panelContent.style.height = this.isOpen
      ? `${this.panelContent.scrollHeight}`
      : `0px`;

    this.handleActivate = this.handleActivate.bind(this);

    this.panelHeader.addEventListener('click', this.handleActivate);

    this.panelHeader.addEventListener('keydown', this.handleActivate);

    this.panelHeader.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
  }

  handleActivate(event) {
    if (this.isOpen) return;
    console.log(this.parentAccordion);
    this.parentAccordion.togglePanels(event, this.panelId);
  }

  async animate(isOpening) {
    const animationSpeed = 200; // milliseconds
    const fullHeight = this.panelContent.scrollHeight;

    await animate((progress) => {
      let newHeight;
      let newOpacity;
      if (isOpening) {
        newHeight = progress * fullHeight;
        newOpacity = progress * 1;
      } else {
        newHeight = (1 - progress) * fullHeight;
        newOpacity = (1 - progress) * 1;
      }

      this.panelContent.style.height = `${newHeight}px`;
      this.panelContent.style.opacity = `${newOpacity}`;
    }, animationSpeed);

    this.parentAccordion.isAnimating = false;
    if (isOpening) {
      this.panelContent.style.height = 'auto';
    } else {
      this.panelContent.hidden = true;
    }
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
    this.animate(this.isOpen).catch((err) => {
      console.error(err);
    });
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(isOpen) {
    this.panelHeader.setAttribute('aria-selected', isOpen);
    this.panelHeader.setAttribute('aria-expanded', isOpen);
    if (isOpen) this.panelContent.removeAttribute('hidden');
    this._isOpen = isOpen;
  }
}

export default Panel;
