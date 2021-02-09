import Panel from './panel.js';

class Accordion {
  constructor(el) {
    if (!el) {
      throw new Error('No element passed into Accordion');
    }

    this.domEl = el;
    this.id = Accordion.accordionCount;
    this.domEl.setAttribute('role', 'tablist');
    this.togglePanels = this.togglePanels.bind(this);
    this.panels = Array.from(
      this.domEl.querySelectorAll('.accordion__panel')
    ).map(
      (domPanel, i) => new Panel(domPanel, i, this, this.id, this.togglePanels)
    );
    this._isAnimating = false;
    this.activePanelId = this.panels[0].panelId;

    Accordion.accordionCount += 1;
  }

  get isAnimating() {
    return this._isAnimating;
  }

  set isAnimating(isAnimating) {
    this._isAnimating = isAnimating;
  }

  togglePanels(event, activatedPanelId) {
    if (this.isAnimating) return;

    if (
      event.type === 'click' ||
      (event.type === 'keydown' && event.key === 'Enter')
    ) {
      this.isAnimating = true;
      this.panels
        .find((panel) => panel.panelId === this.activePanelId)
        .togglePanel();
      this.panels
        .find((panel) => panel.panelId === activatedPanelId)
        .togglePanel();
      this.activePanelId = activatedPanelId;
    }
  }

  static accordionCount = 0; // Used to create unique ids for each accordion
}

export default Accordion;
