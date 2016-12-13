/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_ZONE_ACTIVE_TAB,
  SET_CURRENT_SHARE,
} from '../../constants';

export function setPageZoneActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_ZONE_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}

export function setCurrentShare(currentShare) {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENT_SHARE,
      payload: {
        currentShare,
      },
    });
  };
}
