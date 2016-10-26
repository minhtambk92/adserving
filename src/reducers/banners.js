import { combineReducers } from 'redux';
import { GET_BANNER, GET_BANNERS, CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER } from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_BANNERS: {
      return action.payload.banners;
    }
    case CREATE_BANNER: {
      return [
        action.payload.banner,
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
    case GET_BANNER: {
      return action.payload.banner;
    }
    case UPDATE_BANNER: {
      return action.payload.banner;
    }
    case DELETE_BANNER: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const banners = combineReducers({
  list,
  editing,
});

export default banners;
