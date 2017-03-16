/* eslint-disable import/prefer-default-export */

import {
  GET_ADS_SERVERS,
  GET_ADS_SERVERS_ERROR,
  CREATE_ADS_SERVER,
  CREATE_ADS_SERVER_ERROR,
  UPDATE_ADS_SERVER,
  UPDATE_ADS_SERVER_ERROR,
  DELETE_ADS_SERVER,
  DELETE_ADS_SERVER_ERROR,
} from '../../constants';

import queryGetAdsServers from './getAdsServers.graphql';
import mutationCreatedAdsServer from './createdAdsServer.graphql';
import mutationUpdatedAdsServer from './updatedAdsServer.graphql';
import mutationDeletedAdsServer from './deletedAdsServer.graphql';

export function getAdsServers(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: GET_ADS_SERVERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createAdsServer({ name, value, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationCreatedAdsServer, {
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
    } catch (error) {
      dispatch({
        type: CREATE_ADS_SERVER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateAdsServer({ id, name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationUpdatedAdsServer, {
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
    } catch (error) {
      dispatch({
        type: UPDATE_ADS_SERVER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteAdsServer(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedAdsServer, { id });

      dispatch({
        type: DELETE_ADS_SERVER,
        payload: {
          adsServer: data.deletedAdsServer,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_ADS_SERVER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
