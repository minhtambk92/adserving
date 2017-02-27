import { combineReducers } from 'redux';
import {
  GET_ADS_SERVERS,
  CREATE_ADS_SERVER,
  UPDATE_ADS_SERVER,
  DELETE_ADS_SERVER,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ADS_SERVERS: {
      return action.payload.adsServers;
    }
    case CREATE_ADS_SERVER: {
      return [action.payload.adsServer, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_ADS_SERVER: {
      return action.payload.adsServer;
    }
    case DELETE_ADS_SERVER: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const adsServers = combineReducers({
  list,
  editing,
});

export default adsServers;
