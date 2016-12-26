import { combineReducers } from 'redux';
import {
  SET_STATUS_CREATE_CHANNEL_OPTION_BROWSER,
  SET_STATUS_EDIT_CHANNEL_OPTION_BROWSER
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

export default combineReducers({
  browserCreate,
  browserEdit,
});
