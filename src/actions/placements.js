import {
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  GET_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
  GET_PLACEMENTS_FILTERS,
  SET_PLACEMENTS_FILTERS,
} from '../constants/';

export function getPlacementsFilters() {
  return async(dispatch) => {
    dispatch({
      type: GET_PLACEMENTS_FILTERS,
      payload: {},
    });
  };
}

export function setPlacementsFilters(filter) {
  return async(dispatch) => {
    dispatch({
      type: SET_PLACEMENTS_FILTERS,
      payload: filter,
    });
  };
}

export function getPlacement(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placements(where: {id: "${id}"}, limit: 1) {
          id
          name
          sizeWidth
          sizeHeight
          startTime
          endTime
          weight
          description
          status
          campaignId
          pbzPlacement {
            banners {
              id
              name
              html
              width
              height
              keyword
              weight
              description
              status
              createdAt
              updatedAt
            }
            zones {
              id
              siteId
              name
              description
              type
              html
              css
              slot
              width
              height
              sizeText
              sizeValue
              status
              createdAt
              updatedAt
            }
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_PLACEMENT,
      payload: {
        placement: data.placements.shift(),
      },
    });
  };
}

export function getPlacements(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query($where: JSON, $order: String, $limit: Int) {
        placements(where: $where, order: $order, limit: $limit) {
          id
          name
          sizeWidth
          sizeHeight
          startTime
          endTime
          weight
          description
          campaignId
          status
          createdAt
          updatedAt
          }
      }`;
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
    const { data } = await graphqlRequest(query, variables);

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
  sizeWidth,
  sizeHeight,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
  status,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputTypeWithoutId!) {
        createdPlacement(placement: $placement) {
          id
          name
          sizeWidth
          sizeHeight
          startTime
          endTime
          weight
          description
          campaignId
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        name,
        sizeWidth,
        sizeHeight,
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
  sizeWidth,
  sizeHeight,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
  status,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputType!) {
        updatedPlacement(placement: $placement) {
          id
          name
          sizeWidth
          sizeHeight
          startTime
          endTime
          weight
          description
          campaignId
          status
          pbzPlacement {
            banners {
              id
              name
              html
              width
              height
              keyword
              weight
              description
              status
              createdAt
              updatedAt
            }
            zones {
              id
              siteId
              name
              description
              type
              html
              css
              slot
              width
              height
              sizeText
              sizeValue
              status
              createdAt
              updatedAt
            }
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        id,
        name,
        sizeWidth,
        sizeHeight,
        startTime,
        endTime,
        weight,
        description,
        campaignId,
        status,
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
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedPlacement(id: "${id}") {
          id
          name
          sizeWidth
          sizeHeight
          startTime
          endTime
          weight
          description
          campaignId
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_PLACEMENT,
      payload: {
        placement: data.deletedPlacement,
      },
    });
  };
}
