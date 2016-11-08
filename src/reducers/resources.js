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
      const newState = state;

      if (!Object.values(action.payload).pop()) {
        delete newState[Object.keys(action.payload).pop()];
        return { ...newState };
      }

      return {
        ...newState,
        ...action.payload,
      };
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
