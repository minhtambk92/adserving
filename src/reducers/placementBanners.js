import {
  CREATE_PLACEMENT_BANNER, REMOVE_PLACEMENT_BANNER, DELETE_BANNER, GET_PLACEMENT_BY_BANNER_ID,
} from '../constants';

export default function placementBanners(state = {}, action) {
  switch (action.type) {
    case CREATE_PLACEMENT_BANNER: {
      return {
        ...state,
        list: action.payload.placementBanner,
      };
    }
    case GET_PLACEMENT_BY_BANNER_ID: {
      return {
        ...state,
        list: action.payload.placementBanners,
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
