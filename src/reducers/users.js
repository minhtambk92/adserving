import { combineReducers } from 'redux';
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_FILTERS,
  SET_USERS_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_USERS_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_USERS_FILTERS: {
      const newState = Object.assign({}, state);

      switch (Object.values(action.payload).pop()) {
        case 'null': {
          delete newState[Object.keys(action.payload).pop()];
          return { ...newState };
        }
        case 'true': {
          return {
            ...state,
            ...{ [Object.keys(action.payload).pop()]: true },
          };
        }
        case 'false': {
          return {
            ...state,
            ...{ [Object.keys(action.payload).pop()]: false },
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
    case GET_USERS: {
      return action.payload.users;
    }
    case CREATE_USER: {
      return [
        action.payload.user,
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
    case GET_USER: {
      return action.payload.user;
    }
    case UPDATE_USER: {
      return action.payload.user;
    }
    case DELETE_USER: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const users = combineReducers({
  filters,
  list,
  editing,
});

export default users;
