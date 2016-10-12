/**
 * Created by Manhhailua on 10/11/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  GET_SITE,
  GET_SITES,
  CREATE_SITE,
} from '../constants';

const queryGetSite = `
query ($id: String!) {
  sites(where: {id: $id}) {
    id
    userId
    domain
    name
    email
    description
  }
}`;

export function getSite({ id }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetSite, { id });

    dispatch({
      type: GET_SITE,
      payload: {
        site: data.sites.push(),
      },
    });
  };
}

const queryGetSites = `
query {
  sites {
    id
    userId
    domain
    name
    email
    description
  }
}`;

export function getSites() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetSites);

    dispatch({
      type: GET_SITES,
      payload: {
        sites: data.sites,
      },
    });
  };
}

const mutationCreateSite = `
mutation ($site: SiteInputWithoutId!) {
  createdSite(site: $site) {
    id
    userId
    domain
    name
    email
    description
  }
}`;

export function createSite({ domain, name, email, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreateSite, {
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
