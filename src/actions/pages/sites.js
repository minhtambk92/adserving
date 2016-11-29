/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_SITE_ACTIVE_TAB,
} from '../../constants';

export function setPageSiteActiveTab(tabName) {
  return async(dispatch) => {
    dispatch({
      type: SET_PAGE_SITE_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}
