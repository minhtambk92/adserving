import { combineReducers } from 'redux';
import {
  GET_ADVERTISER,
  GET_ADVERTISERS,
  CREATE_ADVERTISER,
  UPDATE_ADVERTISER,
  DELETE_ADVERTISER,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ADVERTISERS: {
      return action.payload.advertisers;
    }
    case CREATE_ADVERTISER: {
      return [action.payload.advertiser, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_ADVERTISER: {
      return action.payload.advertiser;
    }
    case UPDATE_ADVERTISER: {
      return action.payload.advertiser;
    }
    case DELETE_ADVERTISER: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const advertisers = combineReducers({
  list,
  editing,
});

export default advertisers;
