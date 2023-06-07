/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

<<<<<<< HEAD
/** @typedef {import('./view-filter').default} FilterView */
/** @typedef {import('./view-sorter').default} SortView */
/** @typedef {import('./view-point').default} ViewPoint */
/** @typedef {import('./editor-View').default} EditorView */
/** @typedef {import('./create-view').default} CreateView */
/** @typedef {import('./view-list').default} ListView */
=======
/** @typedef {import('./viewFilter').default} FilterView */
/** @typedef {import('./viewSorter').default} SortView */
/** @typedef {import('./viewPoint').default} ViewPoint */
/** @typedef {import('./editorView').default} EditorView */
/** @typedef {import('./createView').default} CreateView */
/** @typedef {import('./viewList').default} ListView */
>>>>>>> ee2cbc9db11cb4e299f8b8ac31253319a1c4b13b

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
