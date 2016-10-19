import { combineReducers } from 'redux';
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../constants';

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
  list,
  editing,
});

export default users;
