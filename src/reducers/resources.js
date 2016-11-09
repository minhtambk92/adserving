/**
 * Created by Manhhailua on 10/11/16.
 */

import { combineReducers } from 'redux';
import {
  GET_RESOURCE,
  GET_RESOURCES,
  CREATE_RESOURCE,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
  GET_RESOURCES_FILTERS,
  SET_RESOURCES_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_RESOURCES_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_RESOURCES_FILTERS: {
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
    case GET_RESOURCES: {
      return action.payload.resources;
    }
    case CREATE_RESOURCE: {
      return [action.payload.resource, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_RESOURCE: {
      return action.payload.resource;
    }
    case UPDATE_RESOURCE: {
      return action.payload.resource;
    }
    case DELETE_RESOURCE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const resources = combineReducers({
  filters,
  list,
  editing,
});

export default resources;
