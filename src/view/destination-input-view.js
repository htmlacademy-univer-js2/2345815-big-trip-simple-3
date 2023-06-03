import ComponentView, {html} from './component-view.js';

export default class DestinationInputView extends ComponentView {
  #options = null;

  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');

    /**
     * @type {HTMLInputElement}
     */
    this.inputView = this.querySelector('.event__input--destination');
    this.datalistView = this.querySelector('datalist');

    /**
     * @param {Event & { target: HTMLInputElement}} event
     */
    const onInputChange = (event) => {
      const value = event.target.value;
      const isValueExist = this.#options.find((option) => (option[1] === value));

      if (isValueExist) {
        this.dispatchEvent(
          new CustomEvent('destination-change', { detail: value })
        );
      }
    };

    this.inputView.addEventListener('change', onInputChange);
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label
        class="event__label  event__type-output"
        for="event-destination-1"
      ></label>
      <input
        class="event__input event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value=""
        list="destination-list-1"
      >
      <datalist id="destination-list-1"></datalist>
    `;
  }

  /**
   * @param {string} label
   */
  setLabel(label) {
    const view = this.querySelector('.event__type-output');

    view.textContent = label;

    return this;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    this.inputView.value = value;

    return this;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new Option(...state));

    this.datalistView.replaceChildren(...views);
    this.#options = states;

    return this;
  }
}

customElements.define(String(DestinationInputView), DestinationInputView);