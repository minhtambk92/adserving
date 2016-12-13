import { combineReducers } from 'redux';
import {
  SET_PAGE_ZONE_ACTIVE_TAB,
  SET_CURRENT_SHARE,
} from '../../constants';

function activeTab(state = 'editZone', action) {
  switch (action.type) {
    case SET_PAGE_ZONE_ACTIVE_TAB: {
      return action.payload.tabName;
    }
    default: {
      return state;
    }

  }
}

function currentShare(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_SHARE: {
      return action.payload.currentShare;
    }
    default: {
      return state;
    }

  }
}

export default combineReducers({
  activeTab,
  currentShare,
});
