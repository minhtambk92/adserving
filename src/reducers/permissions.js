import { combineReducers } from 'redux';
import {
  GET_PERMISSION,
  GET_PERMISSIONS,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_PERMISSIONS: {
      return action.payload.permissions;
    }
    case CREATE_PERMISSION: {
      return [action.payload.permission, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_PERMISSION: {
      return action.payload.permission;
    }
    case UPDATE_PERMISSION: {
      return action.payload.permission;
    }
    case DELETE_PERMISSION: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const permissions = combineReducers({
  list,
  editing,
});

export default permissions;
