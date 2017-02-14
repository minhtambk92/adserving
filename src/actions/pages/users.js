/**
 * Created by Quynd on 11/28/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  SET_STATUS_UPDATE_PROFILE_USER,
  SET_PAGE_PROFILE_ACTIVE_TAB,
} from '../../constants';

export function setStatusUpdateProfileUser(statusUpdateSettingProfile) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_PROFILE_USER,
      payload: {
        statusUpdateSettingProfile,
      },
    });
  };
}

export function setPageProfileActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_PROFILE_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}

