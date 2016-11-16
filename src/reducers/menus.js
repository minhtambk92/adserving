/**
 * Created by Manhhailua on 10/11/16.
 */

import { combineReducers } from 'redux';
import {
  // Management
  GET_MENU,
  GET_MENUS,
  CREATE_MENU,
  UPDATE_MENU,
  DELETE_MENU,
  // Using
  GET_ASIDE_LEFT_MENU,
  SET_ACTIVE_ITEMS,
} from '../constants';

function asideLeft(state = {}, action) {
  switch (action.type) {
    case GET_ASIDE_LEFT_MENU: {
      return action.payload.menu;
    }
    default: {
      return { ...state };
    }
  }
}

function activeItems(state = [], action) {
  switch (action.type) {
    case SET_ACTIVE_ITEMS: {
      return action.payload.items;
    }
    default: {
      return state;
    }
  }
}

function list(state = [], action) {
  switch (action.type) {
    case GET_MENUS: {
      return action.payload.menus;
    }
    case CREATE_MENU: {
      return [action.payload.menu, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_MENU: {
      return action.payload.menu;
    }
    case UPDATE_MENU: {
      return action.payload.menu;
    }
    case DELETE_MENU: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const menus = combineReducers({
  list,
  editing,
  asideLeft,
  activeItems,
});

export default menus;
