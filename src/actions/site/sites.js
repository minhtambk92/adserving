/**
 * Created by Manhhailua on 10/11/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  GET_SITE,
  GET_SITE_ERROR,
  GET_SITES,
  GET_SITES_ERROR,
  CREATE_SITE,
  CREATE_SITE_ERROR,
  UPDATE_SITE,
  UPDATE_SITE_ERROR,
  DELETE_SITE,
  DELETE_SITE_ERROR,
  CHECK_SITE_BY_DOMAIN,
  CHECK_SITE_BY_DOMAIN_ERROR,
} from '../../constants';

import queryGetSite from './getSite.graphql';
import queryGetSites from './getSites.graphql';
import mutationCreatedSite from './createdSite.graphql';
import mutationUpdatedSite from './updatedSite.graphql';
import mutationDeletedSite from './deletedSite.graphql';
import queryCheckSitesByDomain from './checkSitesByDomain.graphql';

export function getSite(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetSite, variables: { id },
      });

      dispatch({
        type: GET_SITE,
        payload: {
          site: data.sites[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getSites(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
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

      const { data } = await client.query({
        query: queryGetSites, variables: variables.where,
      });

      dispatch({
        type: GET_SITES,
        payload: {
          sites: data.sites,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_SITES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function checkSitesByDomain(domain) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryCheckSitesByDomain, variables: { domain },
      });
      dispatch({
        type: CHECK_SITE_BY_DOMAIN,
        payload: {
          sites: data.sites,
        },
      });
    } catch (error) {
      dispatch({
        type: CHECK_SITE_BY_DOMAIN_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createSite({ domain, name, email, description, status }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({ mutation: mutationCreatedSite,
        variables: {
          site: {
            domain,
            name,
            email,
            description,
            status,
          },
        } });

      dispatch({
        type: CREATE_SITE,
        payload: {
          site: data.createdSite,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_SITE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateSite({ id, domain, name, email, description, status }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedSite,
        variables: {
          site: {
            id,
            domain,
            name,
            email,
            description,
            status,
          },
        },
      });

      dispatch({
        type: UPDATE_SITE,
        payload: {
          site: data.updatedSite,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SITE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteSite(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedSite, variables: { id },
      });

      dispatch({
        type: DELETE_SITE,
        payload: {
          site: data.deletedSite,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_SITE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
