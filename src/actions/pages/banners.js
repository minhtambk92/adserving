/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_BANNER_ACTIVE_TAB,
} from '../../constants';

export function setPageBannerActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_BANNER_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}
