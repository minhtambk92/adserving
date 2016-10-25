import {
  GET_ADVERTISERS,
  CREATE_ADVERTISER,
  GET_ADVERTISER,
  UPDATE_ADVERTISER,
  DELETE_ADVERTISER,
  UPDATE_ADVERTISER_INCLUDE_CAMPAIGN,
} from '../constants';

export function getAdvertiser(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        advertisers(where: {id: "${id}"}, limit: 1) {
          id
          email
          name
          contact
          description
          campaigns {
            id
            name
            startTime
            endTime
            views
            viewPerSession
            timeResetViewCount
            weight
            description
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
        advertiser: data.advertisers.shift(),
      },
    });
  };
}

export function getAdvertisers() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        advertisers {
          id
          email
          name
          contact
          description
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

export function createAdvertiser({ email, name, contact, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($advertiser: AdvertiserInputTypeWithoutId!) {
        createdAdvertiser(advertiser: $advertiser) {
          id
          email
          name
          contact
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      advertiser: {
        email,
        name,
        contact,
        description,

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

export function updateAdvertiser({ id, email, name, contact, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($advertiser: AdvertiserInputType!) {
        updatedAdvertiser(advertiser: $advertiser) {
          id
          email
          name
          contact
          description
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
        description,
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

export function updateAdvertiserIncludeCampaign({ id, email, name, contact, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($advertiser: AdvertiserInputType!) {
        updatedAdvertiser(advertiser: $advertiser) {
          id
          email
          name
          contact
          description
            campaigns {
              id
              name
              startTime
              endTime
              views
              viewPerSession
              timeResetViewCount
              weight
              description
              createdAt
              updatedAt
            }
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
        description,
      },
    });

    dispatch({
      type: UPDATE_ADVERTISER_INCLUDE_CAMPAIGN,
      payload: {
        advertiser: data.updatedAdvertiser,
      },
    });
  };
}

export function deleteAdvertiser(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedAdvertiser(id: "${id}") {
          id
          email
          name
          contact
          description
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
