/**
 * Created by Manhhailua on 11/28/16.
 */

import { combineReducers } from 'redux';
import {
  SET_PAGE_ADVERTISER_ACTIVE_TAB,
} from '../../constants';

function activeTab(state = 'editAdvertiser', action) {
  switch (action.type) {
    case SET_PAGE_ADVERTISER_ACTIVE_TAB: {
      return action.payload.tabName;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  activeTab,
});
