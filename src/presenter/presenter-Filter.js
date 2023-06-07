import Mode from '../enum/mode.js';
import TypeArrange from '../enum/type-arrange.js';
import ArrangeLabel from '../enum/arrange-label.js';
import PredicateArrange from '../enum/predicate-arrange.js';
import Presenter from './presenter.js';

/**
 * @template {appModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class PresenterFilter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.onViewChange.bind(this));
    this.model.addEventListener('mode', this.activeModelMode.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update'],
      this.onPointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {FilterOptionState[]} */
    const options = Object.keys(TypeArrange).map(
      (key) => [ArrangeLabel[key], TypeArrange[key]]
    );

    this.view.setOptions(options);
    this.updateViewOptionsDisabled();
    this.updateViewValue();
  }

  updateViewValue() {
    const predicate = this.model.pointsModel.getFilter();
    const type = TypeArrange[PredicateArrange.findKey(predicate)];

    this.view.setValue(type);
  }

  updateViewOptionsDisabled() {
    const predicates = Object.values(PredicateArrange);
    const states = predicates.map((predicate) =>
      !this.model.pointsModel.list(predicate).length);

    this.view.setOptionsDisabled(states);
  }

  onViewChange() {
    const value = this.view.getValue();
    const predicate = PredicateArrange[TypeArrange.findKey(value)];

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setFilter(predicate);
  }

  onPointsModelChange() {
    this.updateViewOptionsDisabled();
  }

  activeModelMode() {
    if (this.model.getMode() === Mode.CREATE) {
      this.model.pointsModel.setFilter(PredicateArrange.EVERYTHING);

      this.updateViewValue();
    }
  }
}
