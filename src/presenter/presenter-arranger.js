import ArrangeType from '../enum/arrange-type.js';
import LabelArrange from '../enum/label-arrange.js';
import DisableArrange from '../enum/disable-arrange.js';
import Presenter from './presenter.js';
import ArrangeCompare from '../enum/arrange-compare.js';
import Mode from '../enum/mode.js';

/**
 * @template {appModel} Model
 * @template {SortView} View
 * @extends {Presenter<Model,View>}
 */
export default class PresenterArrange extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.onViewChange.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'filter'],
      this.onPointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {SortOptionState[]} */
    const options = Object.keys(ArrangeType).map(
      (key) => [LabelArrange[key], ArrangeType[key]]
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(Object.values(DisableArrange));

    this.updateViewValue();
    this.updateViewDisplay();
  }

  updateViewValue() {
    const compare = this.model.pointsModel.getSort();
    const type = ArrangeType[ArrangeCompare.findKey(compare)];

    this.view.setValue(type);
  }

  updateViewDisplay() {
    const {length} = this.model.pointsModel.list();

    this.view.display(Boolean(length));
  }

  onViewChange() {
    const value = this.view.getValue();
    const compare = ArrangeCompare[ArrangeType.findKey(value)];

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setSort(compare);
  }

  /**
   * @param {CustomEvent} event
   */
  onPointsModelChange(event) {
    if (event.type === 'filter') {
      this.model.pointsModel.setSort(ArrangeCompare.DAY, false);

      this.updateViewValue();
    }

    this.updateViewDisplay();
  }
}
