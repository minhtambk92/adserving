import { combineReducers } from 'redux';
import {
  GET_OPTION,
  GET_OPTIONS,
  CREATE_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_OPTIONS: {
      return action.payload.options;
    }
    case CREATE_OPTION: {
      return [action.payload.option, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_OPTION: {
      return action.payload.option;
    }
    case UPDATE_OPTION: {
      return action.payload.option;
    }
    case DELETE_OPTION: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const options = combineReducers({
  list,
  editing,
});

export default options;
