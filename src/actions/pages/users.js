/**
 * Created by Quynd on 11/28/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  SET_STATUS_UPDATE_PROFILE_USER,
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
