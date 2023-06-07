import {escape} from 'he';

import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';

import Presenter from './presenter.js';
import viewDate from '../view/view-date.js';

viewDate.configure({
  'enableTime': true,
  'time_24hr': true,
  'dateFormat': 'd/m/y H:i',
  'locale': {firstDayOfWeek: 1}
});

/**
 * @template {appModel} Model
 * @template {CreateView} View
 * @extends {Presenter<Model,View>}
 */
export default class InitiatePresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.pointTypeSelectView.addEventListener('change', this.onPointTypeSelectViewChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onDestinationSelectViewChange.bind(this));
    this.view.datePickerView.addEventListener('change', this.onDatePickerViewChange.bind(this));
    this.view.priceInputView.addEventListener('change', this.onPriceInputViewChange.bind(this));
    this.view.offerSelectView.addEventListener('change', this.onOfferSelectViewChange.bind(this));

    this.model.addEventListener('mode', this.activeModelMode.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));
    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
  }

  buildView() {
    /** @type {PointTypeOptionState[]} */
    const pointTypeSelectOptions = Object.values(PointType).map((value) => {
      const key = PointType.findKey(value);
      const label = PointLabel[key];

      return [label, value];
    });

    /** @type {DestinationOptionState[]} */
    const destinationSelectOptions = this.model.destinationsModel.listAll()
      .map((destination) => ['', escape(destination.name)]);

    /** @type {CalendarOptions} */
    const startDateOptions = {
      onChange: [(selectedDates) => {
        const [minDate] = selectedDates;

        this.view.datePickerView.configure({}, {minDate});
      }]
    };

    /** @type {CalendarOptions} */
    const endDateOptions = {
      onValueUpdate: [() => {
        const [startDate, endDate = startDate] = this.view.datePickerView.getDates();

        this.view.datePickerView.setDates(startDate, endDate, false);
      }]
    };

    this.view.pointTypeSelectView.setOptions(pointTypeSelectOptions);
    this.view.destinationSelectView.setOptions(destinationSelectOptions);
    this.view.datePickerView.configure(startDateOptions, endDateOptions);
  }

  updateTypeSelectView() {
    this.view.pointTypeSelectView.setValue(this.model.activePoint.type);
  }

  updateDestinationSelectView() {
    const {type, destinationId} = this.model.activePoint;
    const label = PointLabel[PointType.findKey(type)];
    const destination = this.model.destinationsModel.findById(destinationId);

    this.view.destinationSelectView
      .setLabel(label)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDates(startDate, endDate);
  }

  updatePriceInput() {
    this.view.priceInputView.setValue(String(this.model.activePoint.basePrice));
  }

  updateOfferSelectView(check = false) {
    const type = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroupsModel.findById(type).items;

    /** @type {OfferOptionState[]} */
    const options = availableOffers.map((offer) => [
      escape(offer.id),
      escape(offer.title),
      escape(String(offer.price)),
      check && this.model.activePoint.offerIds.includes(offer.id)
    ]);

    this.view.offerSelectView
      .display(Boolean(availableOffers.length))
      .setOptions(options);
  }

  updateDestinationView() {
    const name = this.view.destinationSelectView.getValue();
    const destination = this.model.destinationsModel.findBy('name', name);

    /** @type {DestinationPictureState[]} */
    const pictureOptions = destination.pictures.map(({src, description }) => [
      escape(src),
      escape(description)
    ]);

    this.view.destinationView
      .setDescription(destination.description)
      .setPictures(pictureOptions);
  }

  updateView() {
    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInput();
    this.updateOfferSelectView(true);
    this.updateDestinationView();

    return this;
  }

  saveActivePoint() {
    return this.model.pointsModel.add(this.model.activePoint);
  }

  onPointTypeSelectViewChange() {
    const type = this.view.pointTypeSelectView.getValue();
    const typeLabel = PointLabel[PointType.findKey(type)];

    this.model.activePoint.type = type;

    this.view.destinationSelectView.setLabel(typeLabel);
    this.updateOfferSelectView();
  }

  onDestinationSelectViewChange() {
    const name = this.view.destinationSelectView.getValue();
    const destination = this.model.destinationsModel.findBy('name', name);

    this.model.activePoint.destinationId = destination.id;

    this.updateDestinationView();
  }

  onDatePickerViewChange() {
    const [startDate, endDate] = this.view.datePickerView.getDates();

    this.model.activePoint.startDate = startDate;
    this.model.activePoint.endDate = endDate;
  }

  onPriceInputViewChange() {
    const price = this.view.priceInputView.getValue();

    this.model.activePoint.basePrice = Number(price);
  }

  onOfferSelectViewChange() {
    const offerIds = this.view.offerSelectView.getSelectedValues();

    this.model.activePoint.offerIds = offerIds;
  }

  activeModelMode() {
    this.view.close(false);

    if (this.model.getMode() === Mode.CREATE) {
      this.updateView();
      this.view.open();
    }
  }

  onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  /**
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.close();
  }

  /**
   * @param {SubmitEvent} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.view.setSaving(true);

    try {
      await this.saveActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setSaving(false);
  }
}
