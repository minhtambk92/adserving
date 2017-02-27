import { combineReducers } from 'redux';
import {
  GET_BANNER_HTML_TYPES,
  CREATE_BANNER_HTML_TYPE,
  UPDATE_BANNER_HTML_TYPE,
  DELETE_BANNER_HTML_TYPE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_BANNER_HTML_TYPES: {
      return action.payload.bannerHtmlTypes;
    }
    case CREATE_BANNER_HTML_TYPE: {
      return [action.payload.bannerHtmlType, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_BANNER_HTML_TYPE: {
      return action.payload.bannerHtmlType;
    }
    case DELETE_BANNER_HTML_TYPE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const bannerHtmlTypes = combineReducers({
  list,
  editing,
});

export default bannerHtmlTypes;
