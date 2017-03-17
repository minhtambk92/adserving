import {
  GET_PLACEMENTS,
  GET_PLACEMENTS_ERROR,
  CREATE_PLACEMENT,
  CREATE_PLACEMENT_ERROR,
  GET_PLACEMENT,
  GET_PLACEMENT_ERROR,
  UPDATE_PLACEMENT,
  UPDATE_PLACEMENT_ERROR,
  DELETE_PLACEMENT,
  DELETE_PLACEMENT_ERROR,
  GET_PLACEMENTS_FILTERS,
  GET_PLACEMENTS_FILTERS_ERROR,
  SET_PLACEMENTS_FILTERS,
  SET_PLACEMENTS_FILTERS_ERROR,
} from '../../constants';

import queryGetPlacements from './getPlacements.graphql';
import queryGetPlacement from './getPlacement.graphql';
import mutationCreatedPlacement from './createdPlacement.graphql';
import mutationUpdatedPlacement from './updatedPlacement.graphql';
import mutationDeletedPlacement from './deletedPlacement.graphql';

export function getPlacementsFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_PLACEMENTS_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_PLACEMENTS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setPlacementsFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PLACEMENTS_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_PLACEMENTS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getPlacement(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetPlacement,
        variables: { id },
      });

      dispatch({
        type: GET_PLACEMENT,
        payload: {
          placement: data.placements[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_PLACEMENT_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getPlacements(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().placements.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }
      const { data } = await client.query({
        query: queryGetPlacements, variables: variables.where,
      });

      dispatch({
        type: GET_PLACEMENTS,
        payload: {
          placements: data.placements,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_PLACEMENTS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createPlacement({
  name,
  width,
  height,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedPlacement,
        variables: {
          placement: {
            name,
            width,
            height,
            startTime,
            endTime,
            weight,
            description,
            campaignId,
            status,
          },
        },
      });

      dispatch({
        type: CREATE_PLACEMENT,
        payload: {
          placement: data.createdPlacement,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_PLACEMENT_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
export function updatePlacement({
  id,
  name,
  width,
  height,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
  status,
  banners,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({ mutation: mutationUpdatedPlacement,
        variables: {
          placement: {
            id,
            name,
            width,
            height,
            startTime,
            endTime,
            weight,
            description,
            campaignId,
            status,
            banners,
          },
        } });

      dispatch({
        type: UPDATE_PLACEMENT,
        payload: {
          placement: data.updatedPlacement,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PLACEMENT_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deletePlacement(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedPlacement, variables: { id },
      });

      dispatch({
        type: DELETE_PLACEMENT,
        payload: {
          placement: data.deletedPlacement,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_PLACEMENT_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
