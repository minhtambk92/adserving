/**
 * Created by Quynd on 11/28/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  SET_STATUS_UPDATE_PROFILE_USER,
  SET_STATUS_UPDATE_PROFILE_USER_ERROR,
  SET_PAGE_PROFILE_ACTIVE_TAB,
  SET_PAGE_PROFILE_ACTIVE_TAB_ERROR,
} from '../../constants';

export function setStatusUpdateProfileUser(statusUpdateSettingProfile) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_PROFILE_USER,
        payload: {
          statusUpdateSettingProfile,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_PROFILE_USER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setPageProfileActiveTab(tabName) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PAGE_PROFILE_ACTIVE_TAB,
        payload: {
          tabName,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_PAGE_PROFILE_ACTIVE_TAB_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

