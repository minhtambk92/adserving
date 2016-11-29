/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_CHANNEL_ACTIVE_TAB,
} from '../../constants';

export function setPageChannelActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_CHANNEL_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}
