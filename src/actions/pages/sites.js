/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_SITE_ACTIVE_TAB,
  SET_PAGE_SITE_ACTIVE_TAB_ERROR,
} from '../../constants';

export function setPageSiteActiveTab(tabName) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PAGE_SITE_ACTIVE_TAB,
        payload: {
          tabName,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_PAGE_SITE_ACTIVE_TAB_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
