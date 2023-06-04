import Adapter from './adapter.js';
import OfferAdapter from './offerAdapter.js';

export default class OfferGroups extends Adapter {
  /**
   * @param {OfferGroup} offerGroup
   */
  constructor(offerGroup) {
    super();

    this.id = offerGroup.type;
    this.items = offerGroup.offers.map((offer) => new OfferAdapter(offer));
  }
}
