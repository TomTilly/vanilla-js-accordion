import Accordion from './accordion.js';

// Initialize accordions
const accordions = Array.from(document.querySelectorAll('.accordion'));
accordions.forEach((accordion) => new Accordion(accordion));
