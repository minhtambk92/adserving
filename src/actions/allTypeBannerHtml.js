/* eslint-disable import/prefer-default-export */

import {
  GET_ALL_TYPE_BANNER_HTML,
  GET_TYPE_BANNER_HTML,
  CREATE_TYPE_BANNER_HTML,
  UPDATE_TYPE_BANNER_HTML,
  DELETE_TYPE_BANNER_HTML,
} from '../constants';

export function getTypeBannerHtml(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        allTypeBannerHtml(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          weight
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_TYPE_BANNER_HTML,
      payload: {
        typeBannerHtml: data.allTypeBannerHtml.shift(),
      },
    });
  };
}

export function getAllTypeBannerHtml(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        allTypeBannerHtml(where: $where, order: $order, limit: $limit) {
          id
          name
          value
          weight
          status
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().allTypeBannerHtml.filters;

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
      type: GET_ALL_TYPE_BANNER_HTML,
      payload: {
        allTypeBannerHtml: data.allTypeBannerHtml,
      },
    });
  };
}

export function createTypeBannerHtml({ name, value, weight, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($typeBannerHtml: TypeBannerHtmlInputTypeWithoutId!) {
        createdTypeBannerHtml(typeBannerHtml: $typeBannerHtml) {
          id
          name
          value
          weight
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      typeBannerHtml: {
        name,
        value,
        weight,
        status,
      },
    });

    dispatch({
      type: CREATE_TYPE_BANNER_HTML,
      payload: {
        typeBannerHtml: data.createdTypeBannerHtml,
      },
    });
  };
}

export function updateTypeBannerHtml({ id, name, value, weight, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($typeBannerHtml: TypeBannerHtmlInputType!) {
        updatedTypeBannerHtml(typeBannerHtml: $typeBannerHtml) {
          id
          name
          value
          weight
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      typeBannerHtml: {
        id,
        name,
        value,
        weight,
        status,
      },
    });

    dispatch({
      type: UPDATE_TYPE_BANNER_HTML,
      payload: {
        typeBannerHtml: data.updatedTypeBannerHtml,
      },
    });
  };
}

export function deleteTypeBannerHtml(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedTypeBannerHtml(id: "${id}") {
          id
          name
          value
          weight
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_TYPE_BANNER_HTML,
      payload: {
        typeBannerHtml: data.deletedTypeBannerHtml,
      },
    });
  };
}
