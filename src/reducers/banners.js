import { GET_BANNER, GET_BANNERS, CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER } from '../constants';

export default function banners(state = {}, action) {
  switch (action.type) {
    case GET_BANNER:
    {
      return {
        ...state,
        current: action.payload.banner,
      };
    }

    case GET_BANNERS:
    {
      return {
        ...state,
        latest: action.payload.banners,
      };
    }

    case CREATE_BANNER:
    {
      state.latest.unshift(action.payload.banner);
      return { ...state };
    }

    case UPDATE_BANNER:
    {
      return {
        ...state,
        current: action.payload.banner,
      };
    }

    case DELETE_BANNER:
    {
      return {
        ...state,
        current: null,
      };
    }

    default:
    {
      return state;
    }
  }
}
