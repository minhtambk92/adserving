/**
 * Created by Manhhailua on 11/28/16.
 */

import { combineReducers } from 'redux';
import {
  GET_PAGE_ADVERTISER_ACTIVE_TAB,
  SET_PAGE_ADVERTISER_ACTIVE_TAB,
} from '../../constants';

function activeTab(state = 'editAdvertiser', action) {
  switch (action.type) {
    case GET_PAGE_ADVERTISER_ACTIVE_TAB: {
      return action.payload.tabName;
    }
    case SET_PAGE_ADVERTISER_ACTIVE_TAB: {
      return action.payload.tabName;
    }
    default: {
      return { ...state };
    }
  }
}

export default combineReducers({
  activeTab,
});
