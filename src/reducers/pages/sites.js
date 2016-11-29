import { combineReducers } from 'redux';
import {
  SET_PAGE_SITE_ACTIVE_TAB,
} from '../../constants';

function activeTab(state = 'editSite', action) {
  switch (action.type) {
    case SET_PAGE_SITE_ACTIVE_TAB: {
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
