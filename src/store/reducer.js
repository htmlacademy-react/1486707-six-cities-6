import {ActionType} from "./action.js";
import {CityList, SortItems, AuthorizationStatus} from "../const.js";
import {getFilteredPlaceCards} from "../utils.js";

const initialState = {
  selectedCity: CityList[0],
  initialSortItem: SortItems.POPULAR,
  currentSortItem: SortItems.POPULAR,
  initialPlaceCards: [],
  placeCards: [],
  unSortedPlaceCards: [],
  placeCardsNearby: [],
  activeCardId: 0,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      const filteredPlaceCards = getFilteredPlaceCards(state.initialPlaceCards, action.payload);
      return {
        ...state,
        selectedCity: action.payload,
        unSortedPlaceCards: filteredPlaceCards,
        placeCards: filteredPlaceCards,
        currentSortItem: state.initialSortItem
      };

    case ActionType.SET_PLACE_CARDS:
      return {
        ...state,
        placeCards: action.payload
      };

    case ActionType.SET_ACTIVE_CARD_ID:
      return {
        ...state,
        activeCardId: action.payload
      };

    case ActionType.LOAD_PLACE_CARDS:
      return {
        ...state,
        initialPlaceCards: action.payload.initialPlaceCards,
        placeCards: action.payload.placeCards,
        unSortedPlaceCards: action.payload.placeCards,
        isDataLoaded: true
      };

    case ActionType.LOAD_PLACE_CARDS_NEARBY:
      return {
        ...state,
        placeCardsNearby: action.payload
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };

    case ActionType.SET_SORT_ITEM:
      return {
        ...state,
        currentSortItem: action.payload
      };

    default:
      return state;
  }
};

export {reducer};
