import animate from './animate.js';

class Accordion {
  constructor(el) {
    if (!el) {
      throw new Error('No element passed into Accordion');
    }

    this.accordion = el;
    this.accordionId = Accordion.accordionCount;
    this.accordion.setAttribute('role', 'tablist');
    this.panels = el.querySelectorAll('.accordion__panel');
    [this.activePanel] = this.panels;
    this.state = {
      isAnimating: false,
    };

    this.panels.forEach((panel, i) => {
      const isOpenByDefault = i === 0;
      const panelHeader = panel.querySelector('.accordion__header');
      const panelContent = panel.querySelector('.accordion__panel-content');
      const panelHeaderId = `acc-${this.accordionId}-header-${i}`;
      const panelContentId = `acc-${this.accordionId}-content-${i}`;

      panelHeader.id = panelHeaderId;
      panelHeader.setAttribute('role', 'tab');
      panelHeader.setAttribute(
        'aria-controls',
        `acc-${this.accordionId}-panel-${i}`
      );
      panelHeader.setAttribute('aria-selected', isOpenByDefault);
      panelHeader.setAttribute('aria-expanded', isOpenByDefault);
      panelHeader.tabIndex = '0';

      panelContent.id = panelContentId;
      panelContent.setAttribute('role', 'tabpanel');
      panelContent.setAttribute('aria-hidden', !isOpenByDefault);
      panelContent.hidden = !isOpenByDefault;
      panelContent.setAttribute('aria-labelledby', panelHeaderId);
      panelContent.style.opacity = isOpenByDefault ? '1' : '0';
      panelContent.style.height = isOpenByDefault
        ? `${panelContent.scrollHeight}`
        : `0px`;

      panelHeader.addEventListener('click', (e) => {
        if (panel === this.activePanel || this.state.isAnimating) return;
        this.state.isAnimating = true;
        this.togglePanel(this.activePanel); // close active panel
        this.togglePanel(panel); // open clicked panel
        this.activePanel = panel;
      });

      panelHeader.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (panel === this.activePanel || this.state.isAnimating) return;
          this.state.isAnimating = true;
          this.togglePanel(this.activePanel); // close active panel
          this.togglePanel(panel); // open clicked panel
          this.activePanel = panel;
        }
      });

      panelHeader.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    });

    Accordion.accordionCount += 1;
  }

  static accordionCount = 0; // Used to create unique ids for each accordion

  togglePanel(panel) {
    // const animationSpeed = 200; // milliseconds
    const animationSpeed = 200; // milliseconds
    const panelHeader = panel.querySelector('.accordion__header');
    const panelContent = panel.querySelector('.accordion__panel-content');
    const newValue = !(panelHeader.getAttribute('aria-selected') === 'true');
    if (newValue) panelContent.removeAttribute('hidden');
    const fullHeight = panelContent.scrollHeight;

    panelHeader.setAttribute('aria-selected', newValue);
    panelHeader.setAttribute('aria-expanded', newValue);
    panelContent.setAttribute('aria-hidden', !newValue);

    if (newValue) {
      // Animate panel open
      animate(function draw(progress) {
        const newHeight = progress * fullHeight;
        const newOpacity = progress * 1;
        panelContent.style.height = `${newHeight}px`;
        panelContent.style.opacity = `${newOpacity}`;
      }, animationSpeed)
        .then(() => {
          this.state.isAnimating = false;
          panelContent.style.height = 'auto';
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Animate panel closed
      animate(function draw(progress) {
        const newHeight = (1 - progress) * fullHeight;
        const newOpacity = (1 - progress) * 1;
        panelContent.style.height = `${newHeight}px`;
        panelContent.style.opacity = `${newOpacity}`;
      }, animationSpeed)
        .then(() => {
          this.state.isAnimating = false;
          panelContent.hidden = true;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}

export default Accordion;
