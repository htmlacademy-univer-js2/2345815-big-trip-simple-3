import ModalData from './model-data.js';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends ModalData<Item,ItemAdapter>
 */
export default class ModelInfo extends ModalData {

  /** @type {Predicate<ItemAdapter>} */
  #filter = () => true;

  /** @type {Compare<ItemAdapter>} */
  #sort = () => 0;

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {Predicate<ItemAdapter>} predicate
   */
  setFilter(predicate, notify = true) {
    this.#filter = predicate;

    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }

    return this;
  }

  getSort() {
    return this.#sort;
  }

  /**
   * @param {Compare<ItemAdapter>} compare
   */
  setSort(compare, notify = true) {
    this.#sort = compare;

    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }

    return this;
  }

  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
