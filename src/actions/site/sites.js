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
  CHECK_SITE_BY_DOMAIN,
} from '../../constants';

import queryGetSite from './getSite.graphql';
import queryGetSites from './getSites.graphql';

export function getSite(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetSite, { id });

    dispatch({
      type: GET_SITE,
      payload: {
        site: data.sites[0],
      },
    });
  };
}

export function getSites(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().sites.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(queryGetSites, variables.where);

    dispatch({
      type: GET_SITES,
      payload: {
        sites: data.sites,
      },
    });
  };
}

export function checkSitesByDomain(domain) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sites(where: {domain: "${domain}"}) {
          id
          domain
          name
          email
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);
    dispatch({
      type: CHECK_SITE_BY_DOMAIN,
      payload: {
        sites: data.sites,
      },
    });
  };
}

export function createSite({ domain, name, email, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($site: SiteInputTypeWithoutId!) {
        createdSite(site: $site) {
          id
          domain
          name
          email
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      site: {
        domain,
        name,
        email,
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

export function updateSite({ id, domain, name, email, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($site: SiteInputType!) {
        updatedSite(site: $site) {
          id
          domain
          name
          email
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      site: {
        id,
        domain,
        name,
        email,
        description,
        status,
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
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedSite(id: "${id}") {
          id
          domain
          name
          email
          description
          status
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
