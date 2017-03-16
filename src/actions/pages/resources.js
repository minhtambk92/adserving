/* eslint-disable import/prefer-default-export */

import {
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
  SET_STATUS_UPDATE_ADS_SERVER,
  SET_STATUS_CREATE_ADS_SERVER,
  SET_STATUS_UPDATE_ZONE_TYPE,
  SET_STATUS_CREATE_ZONE_TYPE,
  SET_STATUS_CREATE_ZONE_SIZE_TYPE,
  SET_STATUS_UPDATE_ZONE_SIZE_TYPE,
  SET_STATUS_CREATE_CHARACTER_SET,
  SET_STATUS_UPDATE_CHARACTER_SET,
  SET_STATUS_CREATE_OPTION_CHANNEL_TYPE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
} from '../../constants';

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

export function setStatusUpdateAdsServer(statusUpdateAdsServer) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_ADS_SERVER,
      payload: {
        statusUpdateAdsServer,
      },
    });
  };
}

export function setStatusCreateAdsServer(statusCreateAdsServer) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_ADS_SERVER,
      payload: {
        statusCreateAdsServer,
      },
    });
  };
}

export function setStatusUpdateZoneType(statusUpdateZoneType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_ZONE_TYPE,
      payload: {
        statusUpdateZoneType,
      },
    });
  };
}

export function setStatusCreateZoneType(statusCreateZoneType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_ZONE_TYPE,
      payload: {
        statusCreateZoneType,
      },
    });
  };
}

export function setStatusUpdateZoneSizeType(statusUpdateZoneSizeType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_ZONE_SIZE_TYPE,
      payload: {
        statusUpdateZoneSizeType,
      },
    });
  };
}

export function setStatusCreateZoneSizeType(statusCreateZoneSizeType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_ZONE_SIZE_TYPE,
      payload: {
        statusCreateZoneSizeType,
      },
    });
  };
}

export function setStatusUpdateCharacterSet(statusUpdateCharacterSet) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_CHARACTER_SET,
      payload: {
        statusUpdateCharacterSet,
      },
    });
  };
}

export function setStatusCreateCharacterSet(statusCreateCharacterSet) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_CHARACTER_SET,
      payload: {
        statusCreateCharacterSet,
      },
    });
  };
}

export function setStatusUpdateOptionChannelType(statusUpdateOptionChannelType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE,
      payload: {
        statusUpdateOptionChannelType,
      },
    });
  };
}

export function setStatusCreateOptionChannelType(statusCreateOptionChannelType) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_OPTION_CHANNEL_TYPE,
      payload: {
        statusCreateOptionChannelType,
      },
    });
  };
}

export function setStatusUpdateOptionChannelValue(statusUpdateOptionChannelValue) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE,
      payload: {
        statusUpdateOptionChannelValue,
      },
    });
  };
}

export function setStatusCreateOptionChannelValue(statusCreateOptionChannelValue) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_OPTION_CHANNEL_VALUE,
      payload: {
        statusCreateOptionChannelValue,
      },
    });
  };
}

export function setStatusUpdateOptionChannelValueProperty(statusUpdateOptionChannelValueProperty) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
      payload: {
        statusUpdateOptionChannelValueProperty,
      },
    });
  };
}

export function setStatusCreateOptionChannelValueProperty(statusCreateOptionChannelValueProperty) {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
      payload: {
        statusCreateOptionChannelValueProperty,
      },
    });
  };
}

