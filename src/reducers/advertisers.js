import { combineReducers } from 'redux';
import {
  GET_ADVERTISER,
  GET_ADVERTISER_ERROR,
  GET_ADVERTISERS,
  GET_ADVERTISERS_ERROR,
  CREATE_ADVERTISER,
  CREATE_ADVERTISER_ERROR,
  UPDATE_ADVERTISER,
  UPDATE_ADVERTISER_ERROR,
  DELETE_ADVERTISER,
  DELETE_ADVERTISER_ERROR,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ADVERTISERS: {
      return action.payload.advertisers;
    }
    case GET_ADVERTISERS_ERROR: {
      return state;
    }
    case CREATE_ADVERTISER: {
      return [action.payload.advertiser, ...state];
    }
    case CREATE_ADVERTISER_ERROR: {
      return [...state];
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
    case GET_ADVERTISER_ERROR: {
      return state;
    }
    case UPDATE_ADVERTISER: {
      return action.payload.advertiser;
    }
    case UPDATE_ADVERTISER_ERROR: {
      return { ...state };
    }
    case DELETE_ADVERTISER: {
      return null;
    }
    case DELETE_ADVERTISER_ERROR: {
      return { ...state };
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
