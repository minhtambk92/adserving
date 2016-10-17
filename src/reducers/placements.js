import {
  GET_PLACEMENT,
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
} from '../constants';

export default function placements(state = {}, action) {
  switch (action.type) {
    case GET_PLACEMENT:
    {
      return {
        ...state,
        current: action.payload.placement,
      };
    }

    case GET_PLACEMENTS:
    {
      return {
        ...state,
        latest: action.payload.placements,
      };
    }

    case CREATE_PLACEMENT:
    {
      state.latest.unshift(action.payload.placement);
      return { ...state };
    }

    case UPDATE_PLACEMENT:
    {
      return {
        ...state,
        current: action.payload.placement,
      };
    }

    case DELETE_PLACEMENT:
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
