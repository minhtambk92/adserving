/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_SITE,
  GET_SITES,
  CREATE_SITE,
} from '../constants';

export default function sites(state = {}, action) {
  switch (action.type) {
    case GET_SITE: {
      return {
        ...state,
        current: action.payload.site,
      };
    }

    case GET_SITES: {
      return {
        ...state,
        latest: action.payload.sites,
      };
    }

    case CREATE_SITE: {
      state.latest.unshift(action.payload.site);
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
