/**
 * Created by Manhhailua on 10/11/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  GET_SITE,
  GET_SITES,
  CREATE_SITE,
  UPDATE_SITE,
  DELETE_SITE,
} from '../constants';

export function getSite(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sites(where: {id: "${id}"}, limit: 1) {
          id
          userId
          domain
          name
          email
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_SITE,
      payload: {
        site: data.sites.shift(),
      },
    });
  };
}

export function getSites() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sites {
          id
          userId
          domain
          name
          email
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_SITES,
      payload: {
        sites: data.sites,
      },
    });
  };
}

export function createSite({ domain, name, email, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($site: SiteInputWithoutId!) {
        createdSite(site: $site) {
          id
          userId
          domain
          name
          email
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      site: {
        userId: '567daf97-d24d-4b7c-9b44-153534efc101',
        domain,
        name,
        email,
        description,
      },
    });

    dispatch({
      type: CREATE_SITE,
      payload: {
        site: data.createdSite,
      },
    });
  };
}

export function updateSite({ id, userId, domain, name, email, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($site: SiteInput!) {
        updatedSite(site: $site) {
          id
          userId
          domain
          name
          email
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      site: {
        id,
        userId: userId || '567daf97-d24d-4b7c-9b44-153534efc101',
        domain,
        name,
        email,
        description,
      },
    });

    dispatch({
      type: UPDATE_SITE,
      payload: {
        site: data.updatedSite,
      },
    });
  };
}

export function deleteSite(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedSite(id: "${id}") {
          id
          userId
          domain
          name
          email
          description
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_SITE,
      payload: {
        site: data.deletedSite,
      },
    });
  };
}
