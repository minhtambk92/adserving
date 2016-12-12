import { combineReducers } from 'redux';
import {
  SET_PAGE_ZONE_ACTIVE_TAB,
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

export default combineReducers({
  activeTab,
});
