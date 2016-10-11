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
    name
    description
    status
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
    name
    description
    status
  }
}`;

export function createSite({ userId, name, description, status }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryCreateSite, {
      site: {
        userId,
        name,
        description,
        status,
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
