/* eslint-disable import/prefer-default-export */

import {
  SET_CURRENT_PAGE_RESOURCE,
  SET_CURRENT_PAGE_RESOURCE_ERROR,
  SET_STATUS_UPDATE_ROLE,
  SET_STATUS_UPDATE_ROLE_ERROR,
  SET_STATUS_CREATE_ROLE,
  SET_STATUS_CREATE_ROLE_ERROR,
  SET_STATUS_UPDATE_USER,
  SET_STATUS_UPDATE_USER_ERROR,
  SET_STATUS_CREATE_USER,
  SET_STATUS_CREATE_USER_ERROR,
  SET_STATUS_UPDATE_PROFILE,
  SET_STATUS_UPDATE_PROFILE_ERROR,
  SET_STATUS_UPDATE_OPTION,
  SET_STATUS_UPDATE_OPTION_ERROR,
  SET_STATUS_CREATE_OPTION,
  SET_STATUS_CREATE_OPTION_ERROR,
  SET_STATUS_UPDATE_PERMISSION,
  SET_STATUS_UPDATE_PERMISSION_ERROR,
  SET_STATUS_CREATE_PERMISSION,
  SET_STATUS_CREATE_PERMISSION_ERROR,
  SET_STATUS_CREATE_BANNER_HTML_TYPE,
  SET_STATUS_CREATE_BANNER_HTML_TYPE_ERROR,
  SET_STATUS_UPDATE_BANNER_HTML_TYPE,
  SET_STATUS_UPDATE_BANNER_HTML_TYPE_ERROR,
  SET_STATUS_CREATE_BANNER_TYPE,
  SET_STATUS_CREATE_BANNER_TYPE_ERROR,
  SET_STATUS_UPDATE_BANNER_TYPE,
  SET_STATUS_UPDATE_BANNER_TYPE_ERROR,
  SET_STATUS_UPDATE_ADS_SERVER,
  SET_STATUS_UPDATE_ADS_SERVER_ERROR,
  SET_STATUS_CREATE_ADS_SERVER,
  SET_STATUS_CREATE_ADS_SERVER_ERROR,
  SET_STATUS_UPDATE_ZONE_TYPE,
  SET_STATUS_UPDATE_ZONE_TYPE_ERROR,
  SET_STATUS_CREATE_ZONE_TYPE,
  SET_STATUS_CREATE_ZONE_TYPE_ERROR,
  SET_STATUS_CREATE_ZONE_SIZE_TYPE,
  SET_STATUS_CREATE_ZONE_SIZE_TYPE_ERROR,
  SET_STATUS_UPDATE_ZONE_SIZE_TYPE,
  SET_STATUS_UPDATE_ZONE_SIZE_TYPE_ERROR,
  SET_STATUS_CREATE_CHARACTER_SET,
  SET_STATUS_CREATE_CHARACTER_SET_ERROR,
  SET_STATUS_UPDATE_CHARACTER_SET,
  SET_STATUS_UPDATE_CHARACTER_SET_ERROR,
  SET_STATUS_CREATE_OPTION_CHANNEL_TYPE,
  SET_STATUS_CREATE_OPTION_CHANNEL_TYPE_ERROR,
  SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE_ERROR,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_ERROR,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_ERROR,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
} from '../../constants';

export function setCurrentPageResource(currentPage) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CURRENT_PAGE_RESOURCE,
        payload: {
          currentPage,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_CURRENT_PAGE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateRole(statusUpdateRole) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_ROLE,
        payload: {
          statusUpdateRole,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_ROLE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateRole(statusCreateRole) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_ROLE,
        payload: {
          statusCreateRole,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_ROLE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateUser(statusUpdateUser) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_USER,
        payload: {
          statusUpdateUser,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_USER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateUser(statusCreateUser) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_USER,
        payload: {
          statusCreateUser,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_USER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateOption(statusUpdateOption) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION,
        payload: {
          statusUpdateOption,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateOption(statusCreateOption) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_OPTION,
        payload: {
          statusCreateOption,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdatePermission(statusUpdatePermission) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_PERMISSION,
        payload: {
          statusUpdatePermission,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_PERMISSION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreatePermission(statusCreatePermission) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_PERMISSION,
        payload: {
          statusCreatePermission,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_PERMISSION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateProfile(statusUpdateProfile) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_PROFILE,
        payload: {
          statusUpdateProfile,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_PROFILE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateBannerHtmlType(statusUpdateBannerHtmlType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_BANNER_HTML_TYPE,
        payload: {
          statusUpdateBannerHtmlType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_BANNER_HTML_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateBannerHtmlType(statusCreateBannerHtmlType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_BANNER_HTML_TYPE,
        payload: {
          statusCreateBannerHtmlType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_BANNER_HTML_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateBannerType(statusUpdateBannerType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_BANNER_TYPE,
        payload: {
          statusUpdateBannerType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_BANNER_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateBannerType(statusCreateBannerType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_BANNER_TYPE,
        payload: {
          statusCreateBannerType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_BANNER_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateAdsServer(statusUpdateAdsServer) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_ADS_SERVER,
        payload: {
          statusUpdateAdsServer,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_ADS_SERVER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateAdsServer(statusCreateAdsServer) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_ADS_SERVER,
        payload: {
          statusCreateAdsServer,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_ADS_SERVER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateZoneType(statusUpdateZoneType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_ZONE_TYPE,
        payload: {
          statusUpdateZoneType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_ZONE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateZoneType(statusCreateZoneType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_ZONE_TYPE,
        payload: {
          statusCreateZoneType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_ZONE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateZoneSizeType(statusUpdateZoneSizeType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_ZONE_SIZE_TYPE,
        payload: {
          statusUpdateZoneSizeType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_ZONE_SIZE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateZoneSizeType(statusCreateZoneSizeType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_ZONE_SIZE_TYPE,
        payload: {
          statusCreateZoneSizeType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_ZONE_SIZE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateCharacterSet(statusUpdateCharacterSet) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_CHARACTER_SET,
        payload: {
          statusUpdateCharacterSet,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_CHARACTER_SET_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateCharacterSet(statusCreateCharacterSet) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_CHARACTER_SET,
        payload: {
          statusCreateCharacterSet,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_CHARACTER_SET_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateOptionChannelType(statusUpdateOptionChannelType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE,
        payload: {
          statusUpdateOptionChannelType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateOptionChannelType(statusCreateOptionChannelType) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_CHANNEL_TYPE,
        payload: {
          statusCreateOptionChannelType,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_CHANNEL_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateOptionChannelValue(statusUpdateOptionChannelValue) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE,
        payload: {
          statusUpdateOptionChannelValue,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateOptionChannelValue(statusCreateOptionChannelValue) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_CHANNEL_VALUE,
        payload: {
          statusCreateOptionChannelValue,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusUpdateOptionChannelValueProperty(statusUpdateOptionChannelValueProperty) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
        payload: {
          statusUpdateOptionChannelValueProperty,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setStatusCreateOptionChannelValueProperty(statusCreateOptionChannelValueProperty) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
        payload: {
          statusCreateOptionChannelValueProperty,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_STATUS_CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

