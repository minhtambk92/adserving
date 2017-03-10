import {
  GET_ADVERTISERS,
  CREATE_ADVERTISER,
  GET_ADVERTISER,
  UPDATE_ADVERTISER,
  DELETE_ADVERTISER,
} from '../constants';

export function getAdvertiser(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        advertisers(where: {id: "${id}"}, limit: 1) {
          id
          email
          name
          contact
          isEmailReport
          isEmailStatus
          reportInterval
          description
          status
          campaigns {
            id
            advertiserId
            name
            startTime
            endTime
            views
            viewPerSession
            timeResetViewCount
            weight
            revenueType
            expireValueCPM
            maxCPMPerDay
            description
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

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
    const query = `
      query {
        advertisers {
          id
          email
          name
          contact
          isEmailReport
          isEmailStatus
          reportInterval
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

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
    const mutation = `
      mutation ($advertiser: AdvertiserInputTypeWithoutId!) {
        createdAdvertiser(advertiser: $advertiser) {
          id
          email
          name
          contact
          isEmailReport
          isEmailStatus
          reportInterval
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation ($advertiser: AdvertiserInputType!) {
        updatedAdvertiser(advertiser: $advertiser) {
          id
          email
          name
          contact
          isEmailReport
          isEmailStatus
          reportInterval
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedAdvertiser(id: "${id}") {
          id
          email
          name
          contact
          isEmailReport
          isEmailStatus
          reportInterval
          description
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ADVERTISER,
      payload: {
        advertiser: data.deletedAdvertiser,
      },
    });
  };
}
