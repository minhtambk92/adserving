import {
  GET_ADVERTISERS,
  CREATE_ADVERTISER,
  GET_ADVERTISER,
  UPDATE_ADVERTISER,
  DELETE_ADVERTISER,
  GET_ADVERTISERS_ERROR,
  GET_ADVERTISER_ERROR,
  UPDATE_ADVERTISER_ERROR,
  CREATE_ADVERTISER_ERROR,
  DELETE_ADVERTISER_ERROR,
} from '../../constants';

import queryGetAdvertisers from './getAdvertisers.graphql';
import queryGetAdvertiser from './getAdvertiser.graphql';
import mutationUpdatedAdvertiser from './updatedAdvertiser.graphql';
import mutationCreatedAdvertiser from './createdAdvertiser.graphql';
import mutationDeleteAdvertiser from './deletedAdvertiser.graphql';

export function getAdvertiser(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.networkInterface.query({
        query: queryGetAdvertiser,
        variables: { id },
      });

      dispatch({
        type: GET_ADVERTISER,
        payload: {
          advertiser: data.advertisers[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ADVERTISER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getAdvertisers() {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.networkInterface.query({
        query: queryGetAdvertisers,
        variables: {},
      });

      dispatch({
        type: GET_ADVERTISERS,
        payload: {
          advertisers: data.advertisers,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ADVERTISERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createAdvertiser({
  email,
  name,
  contact,
  isEmailReport,
  isEmailStatus,
  reportInterval,
  description,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedAdvertiser,
        variables: {
          advertiser: {
            email,
            name,
            contact,
            isEmailReport,
            isEmailStatus,
            reportInterval,
            description,
            status,
          },
        },
      });

      dispatch({
        type: CREATE_ADVERTISER,
        payload: {
          advertiser: data.createdAdvertiser,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_ADVERTISER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateAdvertiser({
  id,
  email,
  name,
  contact,
  isEmailReport,
  isEmailStatus,
  reportInterval,
  description,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedAdvertiser,
        variables: {
          advertiser: {
            id,
            email,
            name,
            contact,
            isEmailReport,
            isEmailStatus,
            reportInterval,
            description,
            status,
          },
        },
      });

      dispatch({
        type: UPDATE_ADVERTISER,
        payload: {
          advertiser: data.updatedAdvertiser,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ADVERTISER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteAdvertiser(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeleteAdvertiser,
        variables: { id },
      });

      dispatch({
        type: DELETE_ADVERTISER,
        payload: {
          advertiser: data.deletedAdvertiser,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_ADVERTISER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
