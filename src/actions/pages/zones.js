/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_ZONE_ACTIVE_TAB,
  SET_CURRENT_SHARE,
  SET_STATUS_SHARE_FORM_EDIT,
  SET_STATUS_SHARE_FORM_CREATE,
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

export function setStatusShareFormEdit(statusEdit) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_SHARE_FORM_EDIT,
      payload: {
        statusEdit,
      },
    });
  };
}

export function setStatusShareFormCreate(statusCreate) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_SHARE_FORM_CREATE,
      payload: {
        statusCreate,
      },
    });
  };
}
