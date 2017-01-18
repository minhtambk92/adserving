import { combineReducers } from 'redux';
import {
  GET_CHARACTER_SETS,
  GET_CHARACTER_SET,
  CREATE_CHARACTER_SET,
  UPDATE_CHARACTER_SET,
  DELETE_CHARACTER_SET,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_CHARACTER_SETS: {
      return action.payload.characterSets;
    }
    case CREATE_CHARACTER_SET: {
      return [action.payload.characterSet, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTER_SET: {
      return action.payload.characterSet;
    }
    case UPDATE_CHARACTER_SET: {
      return action.payload.characterSet;
    }
    case DELETE_CHARACTER_SET: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const characterSets = combineReducers({
  list,
  editing,
});

export default characterSets;
