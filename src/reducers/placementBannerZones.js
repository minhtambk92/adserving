import {
 CREATE_PLACEMENT_BANNER_ZONE, REMOVE_PLACEMENT_BANNER_ZONE, DELETE_BANNER, DELETE_ZONE,
} from '../constants';

export default function placementBannerZones(state = {}, action) {
  switch (action.type) {
    case CREATE_PLACEMENT_BANNER_ZONE: {
      return {
        ...state,
        list: action.payload.placementBannerZone,
      };
    }
    case REMOVE_PLACEMENT_BANNER_ZONE: {
      return null;
    }
    case DELETE_BANNER: {
      return null;
    }
    case DELETE_ZONE: {
      return null;
    }
    default: {
      return state;
    }
  }
}
