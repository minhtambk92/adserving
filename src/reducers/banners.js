import { combineReducers } from 'redux';
import {
  GET_BANNER, GET_BANNERS, CREATE_BANNER, UPDATE_BANNER,
  DELETE_BANNER, GET_BANNERS_FILTERS, SET_BANNERS_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_BANNERS_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_BANNERS_FILTERS: {
      const newState = Object.assign({}, state);
      const criteriaValue = Object.values(action.payload).pop();
      const criteriaKey = Object.keys(action.payload).pop();

      switch (criteriaValue) {
        case 'null': {
          delete newState[criteriaKey];
          return { ...newState };
        }
        case 'true': {
          return {
            ...state,
            ...{ [criteriaKey]: true },
          };
        }
        case 'false': {
          return {
            ...state,
            ...{ [criteriaKey]: false },
          };
        }
        default: {
          return {
            ...state,
            ...action.payload,
          };
        }
      }
    }
    default: {
      return state;
    }
  }
}
function list(state = [], action) {
  switch (action.type) {
    case GET_BANNERS: {
      return action.payload.banners;
    }
    case CREATE_BANNER: {
      return [
        action.payload.banner,
        ...state,
      ];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_BANNER: {
      return action.payload.banner;
    }
    case UPDATE_BANNER: {
      return action.payload.banner;
    }
    case DELETE_BANNER: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const banners = combineReducers({
  filters,
  list,
  editing,
});

export default banners;
