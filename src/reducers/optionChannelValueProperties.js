import { combineReducers } from 'redux';
import {
  GET_OPTION_CHANNEL_VALUE_PROPERTIES,
  CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
  UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
  DELETE_OPTION_CHANNEL_VALUE_PROPERTY,
  SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
  GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER: {
      return {
        ...state,
      };
    }
    case SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER: {
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
    case GET_OPTION_CHANNEL_VALUE_PROPERTIES: {
      return action.payload.optionChannelValueProperties;
    }
    case CREATE_OPTION_CHANNEL_VALUE_PROPERTY: {
      return [action.payload.optionChannelValueProperty, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_OPTION_CHANNEL_VALUE_PROPERTY: {
      return action.payload.optionChannelValueProperty;
    }
    case DELETE_OPTION_CHANNEL_VALUE_PROPERTY: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const optionChannelValueProperties = combineReducers({
  list,
  filters,
  editing,
});

export default optionChannelValueProperties;
