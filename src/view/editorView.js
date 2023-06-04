import DeleteLabelButton from '../enum/deleteLabelButton.js';
import SaveLabelButton from '../enum/saveLabelButtom.js';

import {html} from './view.js';
import CreateView from './createView.js';

export default class EditorView extends CreateView {
  constructor() {
    super();

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveLabelButton.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${DeleteLabelButton.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.id = this.targetView?.id;

    (flag ? this.targetView : this).replaceWith(flag ? this : this.targetView);

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__reset-btn');

    buttonView.textContent = flag ? DeleteLabelButton.PRESSED : DeleteLabelButton.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
