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
  SET_STATUS_UPDATE_OPTION,
  SET_STATUS_CREATE_OPTION,
  SET_STATUS_UPDATE_PERMISSION,
  SET_STATUS_CREATE_PERMISSION,
  SET_STATUS_CREATE_BANNER_HTML_TYPE,
  SET_STATUS_UPDATE_BANNER_HTML_TYPE,
  SET_STATUS_CREATE_BANNER_TYPE,
  SET_STATUS_UPDATE_BANNER_TYPE,
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

export function setStatusUpdateOption(statusUpdateOption) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_OPTION,
      payload: {
        statusUpdateOption,
      },
    });
  };
}

export function setStatusCreateOption(statusCreateOption) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_OPTION,
      payload: {
        statusCreateOption,
      },
    });
  };
}

export function setStatusUpdatePermission(statusUpdatePermission) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_PERMISSION,
      payload: {
        statusUpdatePermission,
      },
    });
  };
}

export function setStatusCreatePermission(statusCreatePermission) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_PERMISSION,
      payload: {
        statusCreatePermission,
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

export function setStatusUpdateBannerHtmlType(statusUpdateBannerHtmlType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_BANNER_HTML_TYPE,
      payload: {
        statusUpdateBannerHtmlType,
      },
    });
  };
}

export function setStatusCreateBannerHtmlType(statusCreateBannerHtmlType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_BANNER_HTML_TYPE,
      payload: {
        statusCreateBannerHtmlType,
      },
    });
  };
}

export function setStatusUpdateBannerType(statusUpdateBannerType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_BANNER_TYPE,
      payload: {
        statusUpdateBannerType,
      },
    });
  };
}

export function setStatusCreateBannerType(statusCreateBannerType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_BANNER_TYPE,
      payload: {
        statusCreateBannerType,
      },
    });
  };
}
