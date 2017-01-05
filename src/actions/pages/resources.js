/* eslint-disable import/prefer-default-export */

import {
  SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER,
  SET_STATUS_CREATE_CHANNEL_OPTION_CATEGORY,
  SET_STATUS_EDIT_CHANNEL_OPTION_CATEGORY,
  SET_CURRENT_PAGE_RESOURCE,
  SET_STATUS_UPDATE_ROLE,
  SET_STATUS_CREATE_ROLE,
  SET_STATUS_UPDATE_USER,
  SET_STATUS_CREATE_USER,
  SET_STATUS_UPDATE_PROFILE,
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

export function setStatusChannelOptionCategoryEdit(categoryEdit) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_EDIT_CHANNEL_OPTION_CATEGORY,
      payload: {
        categoryEdit,
      },
    });
  };
}

export function setStatusChannelOptionCategoryCreate(categoryCreate) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_CHANNEL_OPTION_CATEGORY,
      payload: {
        categoryCreate,
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

export function setStatusUpdateRole(statusUpdateRole) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_ROLE,
      payload: {
        statusUpdateRole,
      },
    });
  };
}

export function setStatusCreateRole(statusCreateRole) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_ROLE,
      payload: {
        statusCreateRole,
      },
    });
  };
}

export function setStatusUpdateUser(statusUpdateUser) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_USER,
      payload: {
        statusUpdateUser,
      },
    });
  };
}

export function setStatusCreateUser(statusCreateUser) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_USER,
      payload: {
        statusCreateUser,
      },
    });
  };
}

export function setStatusUpdateProfile(statusUpdateProfile) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_PROFILE,
      payload: {
        statusUpdateProfile,
      },
    });
  };
}

