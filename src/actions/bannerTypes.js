/* eslint-disable import/prefer-default-export */

import {
  GET_BANNER_TYPES,
  GET_BANNER_TYPE,
  CREATE_BANNER_TYPE,
  UPDATE_BANNER_TYPE,
  DELETE_BANNER_TYPE,
} from '../constants';

export function getBannerType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        bannerTypes(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          isUpload
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_BANNER_TYPE,
      payload: {
        bannerType: data.bannerTypes.shift(),
      },
    });
  };
}

export function getBannerTypes(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        bannerTypes {
          id
          name
          value
          isUpload
          status
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().bannerTypes.filters;

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
      type: GET_BANNER_TYPES,
      payload: {
        bannerTypes: data.bannerTypes,
      },
    });
  };
}

export function createBannerType({ name, value, isUpload, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($bannerType: BannerTypeInputTypeWithoutId!) {
        createdBannerType(bannerType: $bannerType) {
          id
          name
          value
          isUpload
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      bannerType: {
        name,
        value,
        isUpload,
        status,
      },
    });

    dispatch({
      type: CREATE_BANNER_TYPE,
      payload: {
        bannerType: data.createdBannerType,
      },
    });
  };
}

export function updateBannerType({ id, name, value, isUpload, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($bannerType: BannerTypeInputType!) {
        updatedBannerType(bannerType: $bannerType) {
          id
          name
          value
          isUpload
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      bannerType: {
        id,
        name,
        value,
        isUpload,
        status,
      },
    });

    dispatch({
      type: UPDATE_BANNER_TYPE,
      payload: {
        bannerType: data.updatedBannerType,
      },
    });
  };
}

export function deleteBannerType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedBannerType(id: "${id}") {
          id
          name
          value
          isUpload
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_BANNER_TYPE,
      payload: {
        bannerType: data.deletedBannerType,
      },
    });
  };
}
