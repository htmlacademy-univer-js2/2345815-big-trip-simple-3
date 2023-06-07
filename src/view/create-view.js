import SaveLabelButton from '../enum/save-label-buttom.js';
import View, {html} from './view.js';
import ViewTypeSelector from './viewTypeSelecter.js';
import viewSelector from './view-selector.js';
import viewDate from './view-date.js';
import ViewPrice from './view-price.js';
import ViewOfferSelected from './view-offer-selector.js';
import DestinationView from './destinationView.js';
import ViewLoader from './view-loader.js';
import KeyInput from '../enum/key-input.js';

/**
 * @implements {EventListenerObject}
 */
export default class CreateView extends View {
  constructor() {
    super();

    /** @type {ViewTypeSelector} */
    this.pointTypeSelectView = this.querySelector(String(ViewTypeSelector));

    /** @type {viewSelector} */
    this.destinationSelectView = this.querySelector(String(viewSelector));

    /** @type {ViewPrice} */
    this.priceInputView = this.querySelector(String(ViewPrice));

    /** @type {viewDate} */
    this.datePickerView = this.querySelector(String(viewDate));

    /** @type {ViewOfferSelected} */
    this.offerSelectView = this.querySelector(String(ViewOfferSelected));

    /** @type {DestinationView} */
    this.destinationView = this.querySelector(String(DestinationView));

    /** @type {HTMLButtonElement} */
    this.submitButtonView = this.querySelector('.event__save-btn');

    /** @type {Element} */
    this.targetView = null;

    this.loaderView = new ViewLoader();

    this.formView = this.querySelector('form');

    this.classList.add('trip-events__item', 'trip-events__item--reveal-alternate');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    if (flag) {
      this.targetView.prepend(this);
    } else {
      this.remove();
    }

    return this;
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${ViewTypeSelector}
          ${viewSelector}
          ${viewDate}
          ${ViewPrice}
          ${this.createButtonsTemplate()}
        </header>
        <section class="event__details">
          ${ViewOfferSelected}
          ${DestinationView}
        </section>
      </form>
    `;
  }

  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveLabelButton.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
    `;
  }

  /**
   * @param {boolean} flag
   */
  setLoading(flag) {
    this.loaderView.display(flag);

    [...this.formView].forEach((/** @type {HTMLInputElement} */ inputView) => {
      inputView.disabled = flag;
    });
  }

  /**
   * @param {boolean} flag
   */
  setSaving(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__save-btn');

    buttonView.textContent = flag ? SaveLabelButton.PRESSED : SaveLabelButton.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;

    return this;
  }

  open() {
    this.display(true);

    document.addEventListener('keydown', this);

    return this;
  }

  close(notify = true) {
    this.datePickerView.close();

    this.display(false);

    document.removeEventListener('keydown', this);

    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (KeyInput.EXIT.includes(event.key)) {
      this.close();
    }
  }
}

customElements.define(String(CreateView), CreateView);
