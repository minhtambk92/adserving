import { combineReducers } from 'redux';
import {
  GET_OPTION_CHANNEL_VALUES,
  CREATE_OPTION_CHANNEL_VALUE,
  UPDATE_OPTION_CHANNEL_VALUE,
  DELETE_OPTION_CHANNEL_VALUE,
  SET_OPTION_CHANNEL_VALUE_FILTER,
  GET_OPTION_CHANNEL_VALUE_FILTER,
  GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_OPTION_CHANNEL_VALUE_FILTER: {
      return {
        ...state,
      };
    }
    case SET_OPTION_CHANNEL_VALUE_FILTER: {
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
    case GET_OPTION_CHANNEL_VALUES: {
      return action.payload.optionChannelValues;
    }
    case GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES: {
      return action.payload.optionChannelValues;
    }
    case CREATE_OPTION_CHANNEL_VALUE: {
      return [action.payload.optionChannelValue, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_OPTION_CHANNEL_VALUE: {
      return action.payload.optionChannelValue;
    }
    case DELETE_OPTION_CHANNEL_VALUE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const optionChannelValues = combineReducers({
  list,
  filters,
  editing,
});

export default optionChannelValues;
