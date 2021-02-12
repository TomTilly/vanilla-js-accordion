import Panel from './panel.js';

class Accordion {
  constructor(el) {
    if (!el) {
      throw new Error('No element passed into Accordion');
    }

    el.setAttribute('role', 'tablist');
    this.togglePanels = this.togglePanels.bind(this);
    this.id = Accordion.accordionCount;
    this.panels = Array.from(el.querySelectorAll('.accordion__panel')).map(
      (domPanel, i) => new Panel(domPanel, i, this, this.id)
    );
    this.activePanelId = this.panels[0].panelId;
    this.isAnimating = false;

    Accordion.accordionCount += 1;
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
