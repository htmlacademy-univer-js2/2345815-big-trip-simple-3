import View from './view.js';
import ViewPoint from './view-point.js';

export default class ListView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__list');
  }

  /**
   * @param {string} id
   */
  findById(id) {
    return ViewPoint.findById(id, this);
  }

  /**
   * @param {PointState[]} states
   */
  setPoints(states) {
    const views = states.map((state) => new ViewPoint(state));

    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(ListView), ListView);
