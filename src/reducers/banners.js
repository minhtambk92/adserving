import { GET_BANNER, GET_BANNERS, CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER } from '../constants';

export default function banners(state = {}, action) {
  switch (action.type) {
    case GET_BANNER:
      {
        return {
          ...state,
          editing: action.payload.banner,
        };
      }

    case GET_BANNERS:
      {
        return {
          ...state,
          list: action.payload.banners,
        };
      }

    case CREATE_BANNER:
      {
        state.list.unshift(action.payload.banner);
        return { ...state };
      }

    case UPDATE_BANNER:
      {
        return {
          ...state,
          editing: action.payload.banner,
        };
      }

    case DELETE_BANNER:
      {
        return {
          ...state,
          editing: null,
        };
      }

    default:
      {
        return state;
      }
  }
}
