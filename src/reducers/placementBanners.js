import {
  CREATE_PLACEMENT_BANNER, REMOVE_PLACEMENT_BANNER, DELETE_BANNER,
} from '../constants';

export default function placementBanners(state = {}, action) {
  switch (action.type) {
    case CREATE_PLACEMENT_BANNER: {
      return {
        ...state,
        list: action.payload.placementBanner,
      };
    }
    case REMOVE_PLACEMENT_BANNER: {
      return null;
    }
    case DELETE_BANNER: {
      return null;
    }
    default: {
      return state;
    }
  }
}
