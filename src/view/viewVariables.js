/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

/** @typedef {import('./view-filter').default} FilterView */
/** @typedef {import('./view-sorter').default} SortView */
/** @typedef {import('./view-point').default} ViewPoint */
/** @typedef {import('./editor-View').default} EditorView */
/** @typedef {import('./create-view').default} CreateView */
/** @typedef {import('./view-list').default} ListView */

/**
 * @typedef PointState
 * @prop {string} id
 * @prop {number | null} index
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} startDate
 * @prop {string} title
 * @prop {string} type
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {OfferState[]} offers
 */

/**
 * @typedef {[string, string]} FilterOptionState
 * @typedef {[string, string]} SortOptionState
 * @typedef {[label: string, value: string]} PointTypeOptionState
 * @typedef {[title: string, price: number]} OfferState
 * @typedef {[string, string]} DestinationOptionState
 * @typedef {[string, string, string, boolean]} OfferOptionState
 * @typedef {[string, string]} DestinationPictureState
 */
