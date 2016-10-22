import {
 CREATE_PLACEMENT_BANNER_ZONE,
} from '../constants';

export default function placementBannerZones(state = {}, action) {
  switch (action.type) {
    case CREATE_PLACEMENT_BANNER_ZONE: {
      return {
        ...state,
        list: action.payload.placementBannerZone,
      };
    }
    default: {
      return state;
    }
  }
}
