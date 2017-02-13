/**
 * Created by Quynd on 11/28/16.
 */

import { combineReducers } from 'redux';
import {
  SET_STATUS_UPDATE_PROFILE_USER,
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

export default combineReducers({
  statusUpdateSettingProfile,
});
