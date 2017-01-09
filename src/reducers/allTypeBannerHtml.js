import { combineReducers } from 'redux';
import {
  GET_ALL_TYPE_BANNER_HTML,
  GET_TYPE_BANNER_HTML,
  CREATE_TYPE_BANNER_HTML,
  UPDATE_TYPE_BANNER_HTML,
  DELETE_TYPE_BANNER_HTML,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ALL_TYPE_BANNER_HTML: {
      return action.payload.allTypeBannerHtml;
    }
    case CREATE_TYPE_BANNER_HTML: {
      return [action.payload.typeBannerHtml, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_TYPE_BANNER_HTML: {
      return action.payload.typeBannerHtml;
    }
    case UPDATE_TYPE_BANNER_HTML: {
      return action.payload.typeBannerHtml;
    }
    case DELETE_TYPE_BANNER_HTML: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const allTypeBannerHtml = combineReducers({
  list,
  editing,
});

export default allTypeBannerHtml;
