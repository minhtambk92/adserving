/* eslint-disable import/prefer-default-export */

import {
  GET_BANNER_HTML_TYPES,
  GET_BANNER_HTML_TYPE,
  CREATE_BANNER_HTML_TYPE,
  UPDATE_BANNER_HTML_TYPE,
  DELETE_BANNER_HTML_TYPE,
} from '../constants';

export function getBannerHtmlType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        bannerHtmlTypes(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          weight
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.bannerHtmlTypes.shift(),
      },
    });
  };
}

export function getBannerHtmlTypes(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        bannerHtmlTypes{
          id
          name
          value
          weight
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().bannerHtmlTypes.filters;

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
      type: GET_BANNER_HTML_TYPES,
      payload: {
        bannerHtmlTypes: data.bannerHtmlTypes,
      },
    });
  };
}

export function createBannerHtmlType({ name, value, weight, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($bannerHtmlType: BannerHtmlTypeInputTypeWithoutId!) {
        createdBannerHtmlType(bannerHtmlType: $bannerHtmlType) {
          id
          name
          value
          weight
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      bannerHtmlType: {
        name,
        value,
        weight,
        status,
        userId,
      },
    });

    dispatch({
      type: CREATE_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.createdBannerHtmlType,
      },
    });
  };
}

export function updateBannerHtmlType({ id, name, value, weight, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($bannerHtmlType: BannerHtmlTypeInputType!) {
        updatedBannerHtmlType(bannerHtmlType: $bannerHtmlType) {
          id
          name
          value
          weight
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      bannerHtmlType: {
        id,
        name,
        value,
        weight,
        status,
        userId,
      },
    });

    dispatch({
      type: UPDATE_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.updatedBannerHtmlType,
      },
    });
  };
}

export function deleteBannerHtmlType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedBannerHtmlType(id: "${id}") {
          id
          name
          value
          weight
          status
          userId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.deletedBannerHtmlType,
      },
    });
  };
}
