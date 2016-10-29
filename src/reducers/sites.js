import { combineReducers } from 'redux';
import {
  GET_SITE,
  GET_SITES,
  CREATE_SITE,
  UPDATE_SITE,
  DELETE_SITE,
  CHECK_SITE_BY_DOMAIN,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_SITES: {
      return action.payload.sites;
    }
    case CREATE_SITE: {
      return [
        action.payload.site,
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
    case GET_SITE: {
      return action.payload.site;
    }
    case UPDATE_SITE: {
      return action.payload.site;
    }
    case DELETE_SITE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

function check(state = {}, action) {
  switch (action.type) {
    case CHECK_SITE_BY_DOMAIN: {
      return action.payload.sites;
    }
    default: {
      return state;
    }
  }
}
const sites = combineReducers({
  check,
  list,
  editing,
});

export default sites;
