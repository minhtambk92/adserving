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
} from '../constants';

export function getSite(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sites(where: {id: "${id}"}, limit: 1) {
          id
          domain
          name
          email
          description
          status
          zones {
            id
            siteId
            name
            description
            zoneType {
              id
              name
              isSize
            }
            zoneSizeType {
              id
              name
              width
              height
            }
            html
            css
            slot
            width
            height
            targetIFrame
            isShowBannerAgain
            source
            isShowCampaignAgain
            isShowTextBanner
            characterSet
            supportThirdParty
            isIncludeDescription
            isCustomSize
            status
            shares {
              id
              name
              html
              css
              outputCss
              width
              height
              weight
              classes
              type
              description
            }
            createdAt
            updatedAt
          }
          channels {
            id
            name
            description
            status
            options {
              id
              name
              logical
              type
              comparison
              value
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          status
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

export function getSites(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        sites(where: $where, order: $order, limit: $limit) {
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

    const variables = Object.assign({}, args);
    const filters = await getState().zones.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(query, variables);

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
