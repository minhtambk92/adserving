/**
 * Created by Manhhailua on 10/11/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  GET_SITES,
  CREATE_SITE,
} from '../constants';

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

const queryCreateSite = `
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
    const { data } = await graphqlRequest(queryCreateSite, {
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
