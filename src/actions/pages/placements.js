/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_PLACEMENT_ACTIVE_TAB,
} from '../../constants';

export function setPagePlacementActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_PLACEMENT_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}
