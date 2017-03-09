import {
  GET_ADVERTISERS,
  CREATE_ADVERTISER,
  GET_ADVERTISER,
  UPDATE_ADVERTISER,
  DELETE_ADVERTISER,
} from '../../constants';

import queryGetAdvertisers from './getAdvertisers.graphql';
import queryGetAdvertiser from './getAdvertiser.graphql';
import mutationUpdatedAdvertiser from './updatedAdvertiser.graphql';
import mutationCreatedAdvertiser from './createdAdvertiser.graphql';
import mutationDeleteAdvertiser from './deletedAdvertiser.graphql';

export function getAdvertiser(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetAdvertiser, { id });
    dispatch({
      type: GET_ADVERTISER,
      payload: {
        advertiser: data.advertisers[0],
      },
    });
  };
}

export function getAdvertisers() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetAdvertisers, { });

    dispatch({
      type: GET_ADVERTISERS,
      payload: {
        advertisers: data.advertisers,
      },
    });
  };
}

export function createAdvertiser({
  email, name, contact, isEmailReport,
  isEmailStatus,
  reportInterval, description, status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedAdvertiser, {
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
    });

    dispatch({
      type: CREATE_ADVERTISER,
      payload: {
        advertiser: data.createdAdvertiser,
      },
    });
  };
}

export function updateAdvertiser({
  id, email, name, contact, isEmailReport,
  isEmailStatus,
  reportInterval, description, status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedAdvertiser, {
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
    });

    dispatch({
      type: UPDATE_ADVERTISER,
      payload: {
        advertiser: data.updatedAdvertiser,
      },
    });
  };
}

export function deleteAdvertiser(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeleteAdvertiser, { id });

    dispatch({
      type: DELETE_ADVERTISER,
      payload: {
        advertiser: data.deletedAdvertiser,
      },
    });
  };
}
