/**
 * Created by Manhhailua on 10/11/16.
 */

import { combineReducers } from 'redux';
import {
  GET_ROLE,
  GET_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GET_ROLES_FILTERS,
  SET_ROLES_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_ROLES_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_ROLES_FILTERS: {
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
    case GET_ROLES: {
      return action.payload.roles;
    }
    case CREATE_ROLE: {
      return [action.payload.role, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_ROLE: {
      return action.payload.role;
    }
    case UPDATE_ROLE: {
      return action.payload.role;
    }
    case DELETE_ROLE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const roles = combineReducers({
  filters,
  list,
  editing,
});

export default roles;
