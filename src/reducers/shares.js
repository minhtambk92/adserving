import { combineReducers } from 'redux';
import {
  CREATE_SHARE,
  UPDATE_SHARE,
  DELETE_SHARE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case CREATE_SHARE: {
      return [
        action.payload.share,
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
    case UPDATE_SHARE: {
      return action.payload.share;
    }
    case DELETE_SHARE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const shares = combineReducers({
  list,
  editing,
});

export default shares;
