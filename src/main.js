import PredicateArrange from './enum/PredicateArrange.js';
import ArrangeCompare from './enum/arrangeCompare.js';

import StorageInfo from './store/storageInfo.js';

import ModalData from './model/modelData.js';
import ModelInfo from './model/modelInfo.js';
import appModel from './model/appModal.js';

import PointAdapter from './adapter/pointAdapter.js';
import AdapterDestination from './adapter/adapterDestination.js';
import OfferGroups from './adapter/offerGroups.js';

import FilterView from './view/viewFilter.js';
import SortView from './view/viewSorter.js';
import ListView from './view/viewList.js';
import CreateView from './view/createView.js';
import EditorView from './view/editorView.js';

import PresenterFilter from './presenter/presenterFilter.js';
import PresenterArrange from './presenter/presenterArranger.js';
import PresenterList from './presenter/presenterList.js';
import PresenterEditor from './presenter/presenterEdit.js';
import PresenterPlace from './presenter/presenterPlace.js';
import PresenterCreatorButton from './presenter/presenterCreatorButton.js';
import InitiatePresenter from './presenter/initiatePresenter.js';


const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${ BASE_URL }/offers`;
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
