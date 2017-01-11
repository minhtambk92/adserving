import { combineReducers } from 'redux';
import {
  GET_BANNER_TYPES,
  GET_BANNER_TYPE,
  CREATE_BANNER_TYPE,
  UPDATE_BANNER_TYPE,
  DELETE_BANNER_TYPE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_BANNER_TYPES: {
      return action.payload.bannerTypes;
    }
    case CREATE_BANNER_TYPE: {
      return [action.payload.bannerType, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_BANNER_TYPE: {
      return action.payload.bannerType;
    }
    case UPDATE_BANNER_TYPE: {
      return action.payload.bannerType;
    }
    case DELETE_BANNER_TYPE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const bannerTypes = combineReducers({
  list,
  editing,
});

export default bannerTypes;
