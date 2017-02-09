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
    const query = `
      query {
        placements(where: {id: "${id}"}, limit: 1) {
          id
          name
          width
          height
          startTime
          endTime
          weight
          description
          status
          campaignId
          banners {
            id
            name
            html
            width
            height
            keyword
            weight
            description
            bannerTypeId
            imageUrl
            url
            target
            isIFrame
            status
            adsServerId
            bannerHtmlTypeId
            isCountView
            isFixIE
            isDefault 
            isRelative
            isImpressionsBooked
            isClicksBooked
            adStore
            impressionsBooked
            clicksBooked
            activationDate
            expirationDate
            placements {
              id
              name
            }
            channelId
             tracks {
                id
                clickUrl
                impressionUrl
             }
            createdAt
            updatedAt
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
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placements {
          id
          name
          width
          height
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
    const mutation = `
      mutation ($placement: PlacementInputTypeWithoutId!) {
        createdPlacement(placement: $placement) {
          id
          name
          width
          height
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
    const mutation = `
      mutation ($placement: PlacementInputType!) {
        updatedPlacement(placement: $placement) {
          id
          name
          width
          height
          startTime
          endTime
          weight
          description
          campaignId
          status
          banners {
            id
            name
            html
            width
            height
            keyword
            weight
            description
            bannerTypeId
            imageUrl
            url
            target
            isIFrame
            status
            adsServerId
            bannerHtmlTypeId
            isCountView
            isFixIE
            isDefault 
            isRelative
            isImpressionsBooked
            isClicksBooked
            adStore
            impressionsBooked
            clicksBooked
            activationDate
            expirationDate
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedPlacement(id: "${id}") {
          id
          name
          width
          height
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
