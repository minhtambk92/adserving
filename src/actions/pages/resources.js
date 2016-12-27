/* eslint-disable import/prefer-default-export */

import {
  SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER,
  SET_CURRENT_PAGE_RESOURCE,
} from '../../constants';

export function setStatusChannelOptionBrowserEdit(browserEdit) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER,
      payload: {
        browserEdit,
      },
    });
  };
}

export function setStatusChannelOptionBrowserCreate(browserCreate) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER,
      payload: {
        browserCreate,
      },
    });
  };
}

export function setCurrentPageResource(currentPage) {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENT_PAGE_RESOURCE,
      payload: {
        currentPage,
      },
    });
  };
}

