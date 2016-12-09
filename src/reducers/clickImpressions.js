import { combineReducers } from 'redux';
import {
  GET_CLICK_IMPRESSIONS,
  GET_CLICK_IMPRESSION_BY_BANNER_ID,
  CREATE_CLICK_IMPRESSION,
  UPDATE_CLICK_IMPRESSION,
  DELETE_CLICK_IMPRESSION,
} from '../constants';


function list(state = [], action) {
  switch (action.type) {
    case GET_CLICK_IMPRESSION_BY_BANNER_ID: {
      return action.payload.clickImpressions;
    }
    case GET_CLICK_IMPRESSIONS: {
      return action.payload.clickImpressions;
    }
    case CREATE_CLICK_IMPRESSION: {
      return [action.payload.clickImpression, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_CLICK_IMPRESSION: {
      return action.payload.clickImpression;
    }
    case DELETE_CLICK_IMPRESSION: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const clickImpressions = combineReducers({
  list,
  editing,
});

export default clickImpressions;
