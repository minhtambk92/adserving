import {
  GET_TRACKS,
  CREATE_TRACK,
  GET_TRACK_BY_BANNER_ID,
  UPDATE_TRACK,
  DELETE_TRACK,
} from '../constants/';


export function getTrackByBannerId(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        tracks(where: {bannerId: "${id}"}) {
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_TRACK_BY_BANNER_ID,
      payload: {
        tracks: data.tracks,
      },
    });
  };
}

export function getTracks(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        tracks{
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
          }
      }`;
    const variables = Object.assign({}, args);
    const filters = await getState().tracks.filters;

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
      type: GET_TRACKS,
      payload: {
        tracks: data.tracks,
      },
    });
  };
}

export function createTrack({
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($track: TrackInputTypeWithoutId!) {
        createdTrack(track: $track) {
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      track: {
        clickUrl,
        impressionUrl,
        bannerId,
      },
    });

    dispatch({
      type: CREATE_TRACK,
      payload: {
        track: data.createdTrack,
      },
    });
  };
}

export function updateTrack({
  id,
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($track: TrackInputType!) {
        updatedTrack(track: $track) {
          id
          clickUrl
          impressionUrl
          bannerId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      track: {
        id,
        clickUrl,
        impressionUrl,
        bannerId,
      },
    });

    dispatch({
      type: UPDATE_TRACK,
      payload: {
        track: data.updatedTrack,
      },
    });
  };
}

export function deleteTrack(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedTrack(id: "${id}") {
          id
          clickUrl
          impressionUrl
          bannerId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_TRACK,
      payload: {
        track: data.deletedTrack,
      },
    });
  };
}
