import { combineReducers } from 'redux';
import {
  SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_CATEGORY,
  SET_STATUS_CREATE_CHANNEL_OPTION_CATEGORY,
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
  SET_STATUS_CREATE_ADS_SERVER,
  SET_STATUS_UPDATE_ADS_SERVER,
  SET_STATUS_CREATE_ZONE_TYPE,
  SET_STATUS_UPDATE_ZONE_TYPE,
  SET_STATUS_CREATE_ZONE_SIZE_TYPE,
  SET_STATUS_UPDATE_ZONE_SIZE_TYPE,
  SET_STATUS_CREATE_CHARACTER_SET,
  SET_STATUS_UPDATE_CHARACTER_SET,
  SET_STATUS_CREATE_OPTION_CHANNEL_TYPE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE,
  SET_STATUS_CREATE_OPTION_CHANNEL_VALUE,
  SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE,
} from '../../constants';


function browserEdit(state = false, action) {
  switch (action.type) {
    case SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER: {
      return action.payload.browserEdit;
    }
    default: {
      return state;
    }

  }
}

function browserCreate(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER: {
      return action.payload.browserCreate;
    }
    default: {
      return state;
    }

  }
}

function categoryEdit(state = false, action) {
  switch (action.type) {
    case SET_STATUS_EDIT_CHANNEL_OPTION_CATEGORY: {
      return action.payload.categoryEdit;
    }
    default: {
      return state;
    }

  }
}

function categoryCreate(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_CHANNEL_OPTION_CATEGORY: {
      return action.payload.categoryCreate;
    }
    default: {
      return state;
    }

  }
}

function currentPage(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_PAGE_RESOURCE: {
      return action.payload.currentPage;
    }
    default: {
      return state;
    }

  }
}

function statusUpdateRole(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_ROLE: {
      return action.payload.statusUpdateRole;
    }
    default: {
      return state;
    }
  }
}

function statusCreateRole(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_ROLE: {
      return action.payload.statusCreateRole;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateUser(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_USER: {
      return action.payload.statusUpdateUser;
    }
    default: {
      return state;
    }
  }
}

function statusCreateUser(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_USER: {
      return action.payload.statusCreateUser;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateProfile(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_PROFILE: {
      return action.payload.statusUpdateProfile;
    }
    default: {
      return state;
    }
  }
}

function statusCreateOption(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_OPTION: {
      return action.payload.statusCreateOption;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateOption(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_OPTION: {
      return action.payload.statusUpdateOption;
    }
    default: {
      return state;
    }
  }
}

function statusCreatePermission(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_PERMISSION: {
      return action.payload.statusCreatePermission;
    }
    default: {
      return state;
    }
  }
}

function statusUpdatePermission(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_PERMISSION: {
      return action.payload.statusUpdatePermission;
    }
    default: {
      return state;
    }
  }
}

function statusCreateBannerHtmlType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_BANNER_HTML_TYPE: {
      return action.payload.statusCreateBannerHtmlType;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateBannerHtmlType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_BANNER_HTML_TYPE: {
      return action.payload.statusUpdateBannerHtmlType;
    }
    default: {
      return state;
    }
  }
}

function statusCreateBannerType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_BANNER_TYPE: {
      return action.payload.statusCreateBannerType;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateBannerType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_BANNER_TYPE: {
      return action.payload.statusUpdateBannerType;
    }
    default: {
      return state;
    }
  }
}

function statusCreateAdsServer(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_ADS_SERVER: {
      return action.payload.statusCreateAdsServer;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateAdsServer(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_ADS_SERVER: {
      return action.payload.statusUpdateAdsServer;
    }
    default: {
      return state;
    }
  }
}

function statusCreateZoneType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_ZONE_TYPE: {
      return action.payload.statusCreateZoneType;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateZoneType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_ZONE_TYPE: {
      return action.payload.statusUpdateZoneType;
    }
    default: {
      return state;
    }
  }
}

function statusCreateZoneSizeType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_ZONE_SIZE_TYPE: {
      return action.payload.statusCreateZoneSizeType;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateZoneSizeType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_ZONE_SIZE_TYPE: {
      return action.payload.statusUpdateZoneSizeType;
    }
    default: {
      return state;
    }
  }
}

function statusCreateCharacterSet(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_CHARACTER_SET: {
      return action.payload.statusCreateCharacterSet;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateCharacterSet(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_CHARACTER_SET: {
      return action.payload.statusUpdateCharacterSet;
    }
    default: {
      return state;
    }
  }
}

function statusCreateOptionChannelType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_OPTION_CHANNEL_TYPE: {
      return action.payload.statusCreateOptionChannelType;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateOptionChannelType(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_OPTION_CHANNEL_TYPE: {
      return action.payload.statusUpdateOptionChannelType;
    }
    default: {
      return state;
    }
  }
}

function statusCreateOptionChannelValue(state = false, action) {
  switch (action.type) {
    case SET_STATUS_CREATE_OPTION_CHANNEL_VALUE: {
      return action.payload.statusCreateOptionChannelValue;
    }
    default: {
      return state;
    }
  }
}

function statusUpdateOptionChannelValue(state = false, action) {
  switch (action.type) {
    case SET_STATUS_UPDATE_OPTION_CHANNEL_VALUE: {
      return action.payload.statusUpdateOptionChannelValue;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  browserCreate,
  browserEdit,
  categoryEdit,
  categoryCreate,
  currentPage,
  statusCreateRole,
  statusUpdateRole,
  statusCreateUser,
  statusUpdateUser,
  statusUpdateProfile,
  statusCreateOption,
  statusUpdateOption,
  statusCreatePermission,
  statusUpdatePermission,
  statusCreateBannerHtmlType,
  statusUpdateBannerHtmlType,
  statusUpdateBannerType,
  statusCreateBannerType,
  statusCreateAdsServer,
  statusUpdateAdsServer,
  statusCreateZoneType,
  statusUpdateZoneType,
  statusCreateZoneSizeType,
  statusUpdateZoneSizeType,
  statusCreateCharacterSet,
  statusUpdateCharacterSet,
  statusCreateOptionChannelType,
  statusUpdateOptionChannelType,
  statusCreateOptionChannelValue,
  statusUpdateOptionChannelValue,
});
