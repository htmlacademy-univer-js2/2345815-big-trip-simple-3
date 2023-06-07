import Mode from '../enum/mode.js';
import Presenter from './presenter.js';

/**
 * @template {appModel} Model
 * @template {HTMLButtonElement} View
 * @extends {Presenter<Model,View>}
 */
export default class PresenterCreatorButton extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.view.addEventListener('click', this.onViewClick.bind(this));
    this.model.addEventListener('mode', this.activeModelMode.bind(this));
  }

  onViewClick() {
    this.model.setMode(Mode.CREATE);
  }

  activeModelMode() {
    this.view.disabled = (this.model.getMode() === Mode.CREATE);
  }
}
