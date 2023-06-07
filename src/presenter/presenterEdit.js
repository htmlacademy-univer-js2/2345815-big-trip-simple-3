import Mode from '../enum/mode.js';
import InitiatePresenter from './initiatePresenter.js';
import ViewPoint from '../view/viewPoint.js';

/**
 * @template {appModel} Model
 * @template {EditorView} View
 * @extends {InitiatePresenter<Model,View>}
 */
export default class PresenterEditor extends InitiatePresenter {
  /**
   * @override
   */
  saveActivePoint() {
    const {activePoint} = this.model;

    return this.model.pointsModel.update(activePoint.id, activePoint);
  }

  /**
   * @override
   */
  onModelMode() {
    this.point = this.model.activePoint;

    this.view.close(false);

    if (this.model.getMode() === Mode.EDIT) {
      const pointView = ViewPoint.findById(this.model.activePoint.id);

      this.updateView();
      this.view.target(pointView).open();
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setDeleting(true);

    try {
      await this.deleteActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setDeleting(false);
  }

  deleteActivePoint() {
    return this.model.pointsModel.remove(this.model.activePoint.id);
  }
}
