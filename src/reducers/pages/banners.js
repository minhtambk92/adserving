import { combineReducers } from 'redux';
import {
  SET_PAGE_BANNER_ACTIVE_TAB,
} from '../../constants';

function activeTab(state = 'editBanner', action) {
  switch (action.type) {
    case SET_PAGE_BANNER_ACTIVE_TAB: {
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
