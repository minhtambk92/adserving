/**
 * Created by Quynd on 11/28/16.
 */

import { combineReducers } from 'redux';
import {
  SET_STATUS_UPDATE_PROFILE_USER,
  SET_PAGE_PROFILE_ACTIVE_TAB,
} from '../../constants';

function statusUpdateSettingProfile(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_PROFILE_USER: {
      return action.payload.statusUpdateSettingProfile;
    }
    default: {
      return state;
    }

  }
}

function activeTab(state = 'settings', action) {
  switch (action.type) {
    case SET_PAGE_PROFILE_ACTIVE_TAB: {
      return action.payload.tabName;
    }
    default: {
      return state;
    }

  }
}

export default combineReducers({
  statusUpdateSettingProfile,
  activeTab,
});
