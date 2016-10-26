import { combineReducers } from 'redux';
import {
  GET_PLACEMENT,
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
  GET_PLACEMENTS_FILTERS,
  SET_PLACEMENTS_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_PLACEMENTS_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_PLACEMENTS_FILTERS: {
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
    case GET_PLACEMENTS: {
      return action.payload.placements;
    }
    case CREATE_PLACEMENT: {
      return [
        action.payload.placement,
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
    case GET_PLACEMENT: {
      return action.payload.placement;
    }
    case UPDATE_PLACEMENT: {
      return action.payload.placement;
    }
    case DELETE_PLACEMENT: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const placements = combineReducers({
  filters,
  list,
  editing,
});
export default placements;
