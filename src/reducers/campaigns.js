import { combineReducers } from 'redux';
import {
  GET_CAMPAIGN,
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_CAMPAIGNS: {
      return action.payload.campaigns;
    }
    case CREATE_CAMPAIGN: {
      return [
        action.payload.campaign,
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
    case GET_CAMPAIGN: {
      return action.payload.campaign;
    }
    case UPDATE_CAMPAIGN: {
      return action.payload.campaign;
    }
    case DELETE_CAMPAIGN: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const campaigns = combineReducers({
  list,
  editing,
});

export default campaigns;

