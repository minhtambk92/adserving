/**
 * Created by Manhhailua on 11/28/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  // GET_PAGE_ADVERTISER_ACTIVE_TAB,
  SET_PAGE_ADVERTISER_ACTIVE_TAB,
} from '../../constants';

export function getPageAdvertiserActiveTab() {
  return async (dispatch, getState) => {
    console.log(getState()); // eslint-disable-line
  };
}

export function setPageAdvertiserActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_ADVERTISER_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}
