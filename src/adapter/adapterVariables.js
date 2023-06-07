/** @typedef {import('./adapter').default} Adapter */
/** @typedef {import('./pointAdapter').default} PointAdapter */
/** @typedef {import('./adapterDestination').default} AdapterDestination */
/** @typedef {import('./offerGroups').default} OfferGroups */

/**
 * @typedef Point
 * @prop {number} base_price
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {string} id
 * @prop {number[]} offers
 * @prop {string} type
 * @prop {boolean} is_favorite
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} description
 * @prop {string} name
 * @prop {DestinationPicture[]} pictures
 */

/**
 * @typedef DestinationPicture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {string} type
 * @prop {Offer[]} offers
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */
