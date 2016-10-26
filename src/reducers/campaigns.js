import { combineReducers } from 'redux';
import {
  GET_CAMPAIGN,
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  GET_CAMPAIGNS_FILTERS,
  SET_CAMPAIGNS_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGNS_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_CAMPAIGNS_FILTERS: {
      const newState = Object.assign({}, state);
      const criteriaValue = Object.values(action.payload).pop();
      const criteriaKey = Object.keys(action.payload).pop();

      switch (criteriaValue) {
        case 'null': {
          delete newState[criteriaKey];
          return { ...newState };
        }
        case 'true': {
          return {
            ...state,
            ...{ [criteriaKey]: true },
          };
        }
        case 'false': {
          return {
            ...state,
            ...{ [criteriaKey]: false },
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
  filters,
  list,
  editing,
});

export default campaigns;

