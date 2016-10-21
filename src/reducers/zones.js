/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_ZONE,
  GET_ZONES,
  CREATE_ZONE,
  UPDATE_ZONE,
  DELETE_ZONE,
  CREATE_ZONE_INCLUDE_SITE,
} from '../constants';

export default function zones(state = {}, action) {
  switch (action.type) {
    case GET_ZONE: {
      return {
        ...state,
        editing: action.payload.zone,
      };
    }

    case GET_ZONES: {
      return {
        ...state,
        list: action.payload.zones,
      };
    }

    case CREATE_ZONE: {
      state.list.unshift(action.payload.zone);
      return { ...state };
    }
    case CREATE_ZONE_INCLUDE_SITE: {
      return {
        ...action.payload.zone,
      };
    }
    case UPDATE_ZONE: {
      return {
        ...state,
        editing: action.payload.zone,
      };
    }

    case DELETE_ZONE: {
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
