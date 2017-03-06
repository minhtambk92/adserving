/* eslint-disable import/prefer-default-export */

import {
  GET_ADS_SERVERS,
  CREATE_ADS_SERVER,
  UPDATE_ADS_SERVER,
  DELETE_ADS_SERVER,
} from '../../constants';

import queryGetAdsServers from './getAdsServers.graphql';

export function getAdsServers(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().adsServers.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(queryGetAdsServers, variables.where);

    dispatch({
      type: GET_ADS_SERVERS,
      payload: {
        adsServers: data.adsServers,
      },
    });
  };
}

export function createAdsServer({ name, value, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($adsServer: AdsServerInputTypeWithoutId!) {
        createdAdsServer(adsServer: $adsServer) {
          id
          name
          value
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      adsServer: {
        name,
        value,
        status,
        userId,
      },
    });

    dispatch({
      type: CREATE_ADS_SERVER,
      payload: {
        adsServer: data.createdAdsServer,
      },
    });
  };
}

export function updateAdsServer({ id, name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($adsServer: AdsServerInputType!) {
        updatedAdsServer(adsServer: $adsServer) {
          id
          name
          value
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      adsServer: {
        id,
        name,
        value,
        status,
      },
    });

    dispatch({
      type: UPDATE_ADS_SERVER,
      payload: {
        adsServer: data.updatedAdsServer,
      },
    });
  };
}

export function deleteAdsServer(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedAdsServer(id: "${id}") {
          id
          name
          value
          status
          userId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ADS_SERVER,
      payload: {
        adsServer: data.deletedAdsServer,
      },
    });
  };
}
