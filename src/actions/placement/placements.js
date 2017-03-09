import {
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  GET_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
  GET_PLACEMENTS_FILTERS,
  SET_PLACEMENTS_FILTERS,
} from '../../constants';

import queryGetPlacements from './getPlacements.graphql';
import queryGetPlacement from './getPlacement.graphql';
import mutationCreatedPlacement from './createdPlacement.graphql';
import mutationUpdatedPlacement from './updatedPlacement.graphql';
import mutationDeletedPlacement from './deletedPlacement.graphql';

export function getPlacementsFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_PLACEMENTS_FILTERS,
      payload: {},
    });
  };
}

export function setPlacementsFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_PLACEMENTS_FILTERS,
      payload: filter,
    });
  };
}

export function getPlacement(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetPlacement, { id });

    dispatch({
      type: GET_PLACEMENT,
      payload: {
        placement: data.placements[0],
      },
    });
  };
}

export function getPlacements(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
    const { data } = await graphqlRequest(queryGetPlacements, variables.where);

    dispatch({
      type: GET_PLACEMENTS,
      payload: {
        placements: data.placements,
      },
    });
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
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedPlacement, {
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
    });

    dispatch({
      type: CREATE_PLACEMENT,
      payload: {
        placement: data.createdPlacement,
      },
    });
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
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedPlacement, {
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
    });

    dispatch({
      type: UPDATE_PLACEMENT,
      payload: {
        placement: data.updatedPlacement,
      },
    });
  };
}

export function deletePlacement(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedPlacement, { id });

    dispatch({
      type: DELETE_PLACEMENT,
      payload: {
        placement: data.deletedPlacement,
      },
    });
  };
}
