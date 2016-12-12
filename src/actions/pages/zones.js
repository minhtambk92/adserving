/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_ZONE_ACTIVE_TAB,
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
