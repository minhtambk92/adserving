/* eslint-disable import/prefer-default-export */

import {
  SET_PAGE_ZONE_ACTIVE_TAB,
  SET_PAGE_ZONE_ACTIVE_TAB_ERROR,
  SET_CURRENT_SHARE,
  SET_CURRENT_SHARE_ERROR,
  SET_STATUS_SHARE_FORM_EDIT,
  SET_STATUS_SHARE_FORM_EDIT_ERROR,
  SET_STATUS_SHARE_FORM_CREATE,
  SET_STATUS_SHARE_FORM_CREATE_ERROR,
} from '../../constants';

export function setPageZoneActiveTab(tabName) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PAGE_ZONE_ACTIVE_TAB,
        payload: {
          tabName,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_PAGE_ZONE_ACTIVE_TAB_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setCurrentShare(currentShare) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CURRENT_SHARE,
        payload: {
          currentShare,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_CURRENT_SHARE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusShareFormEdit(statusEdit) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_SHARE_FORM_EDIT,
        payload: {
          statusEdit,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_SHARE_FORM_EDIT_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusShareFormCreate(statusCreate) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_SHARE_FORM_CREATE,
        payload: {
          statusCreate,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_SHARE_FORM_CREATE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
