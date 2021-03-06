/**
 * Created by Manhhailua on 10/11/16.
 */

import { combineReducers } from 'redux';
import {
  GET_ZONE,
  GET_ZONES,
  CREATE_ZONE,
  UPDATE_ZONE,
  DELETE_ZONE,
  GET_ZONES_FILTERS,
  SET_ZONES_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_ZONES_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_ZONES_FILTERS: {
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
    case GET_ZONES: {
      return action.payload.zones;
    }
    case CREATE_ZONE: {
      return [
        action.payload.zone,
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
    case GET_ZONE: {
      return action.payload.zone;
    }
    case UPDATE_ZONE: {
      return action.payload.zone;
    }
    case DELETE_ZONE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const zones = combineReducers({
  filters,
  list,
  editing,
});

export default zones;
