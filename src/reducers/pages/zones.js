import { combineReducers } from 'redux';
import {
  SET_PAGE_ZONE_ACTIVE_TAB,
  SET_CURRENT_SHARE,
  SET_STATUS_SHARE_FORM_EDIT,
  SET_STATUS_SHARE_FORM_CREATE,
} from '../../constants';

function activeTab(state = 'editZone', action) {
  switch (action.type) {
    case SET_PAGE_ZONE_ACTIVE_TAB: {
      return action.payload.tabName;
    }
    default: {
      return state;
    }

  }
}

function currentShare(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_SHARE: {
      return action.payload.currentShare;
    }
    default: {
      return state;
    }

  }
}

function statusEdit(state = false, action) {
  switch (action.type) {
    case SET_STATUS_SHARE_FORM_EDIT: {
      return action.payload.statusEdit;
    }
    default: {
      return state;
    }

  }
}

function statusCreate(state = false, action) {
  switch (action.type) {
    case SET_STATUS_SHARE_FORM_CREATE: {
      return action.payload.statusCreate;
    }
    default: {
      return state;
    }

  }
}

export default combineReducers({
  activeTab,
  currentShare,
  statusEdit,
  statusCreate,
});
