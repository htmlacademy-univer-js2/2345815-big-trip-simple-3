<<<<<<< Updated upstream
=======
import PredicateArrange from './enum/predicate-arrange.js';
import ArrangeCompare from './enum/arrange-compare.js';

import StorageInfo from './store/storage-info.js';

import ModalData from './model/model-data.js';
import ModelInfo from './model/model-info.js';
import appModel from './model/app-modal.js';

import PointAdapter from './adapter/point-adapter.js';
import AdapterDestination from './adapter/adapter-destination.js';
import OfferGroups from './adapter/offer-groups.js';

import FilterView from './view/view-filter.js';
import SortView from './view/view-sorter.js';
import ListView from './view/view-list.js';
import CreateView from './view/create-view.js';
import EditorView from './view/editor-View.js';

import PresenterFilter from './presenter/presenter-Filter.js';
import PresenterArrange from './presenter/presenter-arranger.js';
import PresenterList from './presenter/presenter-List.js';
import PresenterEditor from './presenter/presenter-edit.js';
import PresenterPlace from './presenter/presenter-place.js';
import PresenterCreatorButton from './presenter/presenter-creator-button.js';
import InitiatePresenter from './presenter/initiate-presenter.js';


const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic er883jdzbdw';

/** @type {StorageInfo<Point>} */
const pointsStore = new StorageInfo(POINTS_URL, AUTH);

/** @type {StorageInfo<Destination>} */
const destinationsStore = new StorageInfo(DESTINATIONS_URL, AUTH);

/** @type {StorageInfo<OfferGroup>} */
const offerGroupsStore = new StorageInfo(OFFERS_URL, AUTH);


const pointsModel = new ModelInfo(pointsStore, (item) => new PointAdapter(item))
  .setFilter(PredicateArrange.EVERYTHING)
  .setSort(ArrangeCompare.DAY);

const destinationsModel = new ModalData(destinationsStore, (item) => new AdapterDestination(item));

const offerGroupsModel = new ModalData(offerGroupsStore, (item) => new OfferGroups(item));

const applicationModel = new appModel(pointsModel, destinationsModel, offerGroupsModel);


/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {ListView} */
const listView = document.querySelector(String(ListView));

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));


applicationModel.ready().then(() => {
  new PresenterFilter(applicationModel, filterView);
  new PresenterArrange(applicationModel, sortView);
  new PresenterList(applicationModel, listView);
  new PresenterEditor(applicationModel, new EditorView());
  new InitiatePresenter(applicationModel, new CreateView().target(listView));
  new PresenterPlace(applicationModel, placeholderView);
  new PresenterCreatorButton(applicationModel, createButtonView);

}).catch((exception) => {
  placeholderView.textContent = exception;
});
>>>>>>> Stashed changes
