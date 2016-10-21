/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_SITE,
  GET_SITES,
  CREATE_SITE,
  UPDATE_SITE,
  DELETE_SITE,
  UPDATE_SITE_INCLUDE_ZONE,
} from '../constants';

export default function sites(state = {}, action) {
  switch (action.type) {
    case GET_SITE: {
      return {
        ...state,
        editing: action.payload.site,
      };
    }

    case GET_SITES: {
      return {
        ...state,
        list: action.payload.sites,
      };
    }

    case CREATE_SITE: {
      state.list.unshift(action.payload.site);
      return { ...state };
    }

    case UPDATE_SITE: {
      return {
        ...state,
        editing: action.payload.site,
      };
    }
    case UPDATE_SITE_INCLUDE_ZONE: {
      return {
        ...state,
        editing: action.payload.site,
      };
    }

    case DELETE_SITE: {
      return {
        ...state,
        editing: null,
      };
    }

    default: {
      return state;
    }
  }
}
