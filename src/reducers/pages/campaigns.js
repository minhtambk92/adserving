import { combineReducers } from 'redux';
import {
  SET_PAGE_CAMPAIGN_ACTIVE_TAB,
} from '../../constants';

function activeTab(state = 'editCampaign', action) {
  switch (action.type) {
    case SET_PAGE_CAMPAIGN_ACTIVE_TAB: {
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
