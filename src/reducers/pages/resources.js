import { combineReducers } from 'redux';
import {
  SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_CATEGORY,
  SET_STATUS_CREATE_CHANNEL_OPTION_CATEGORY,
  SET_CURRENT_PAGE_RESOURCE,
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

export default combineReducers({
  browserCreate,
  browserEdit,
  categoryEdit,
  categoryCreate,
  currentPage,
});
