/* eslint-disable import/prefer-default-export */

import {
  GET_BANNER_HTML_TYPES,
  GET_BANNER_HTML_TYPES_ERROR,
  CREATE_BANNER_HTML_TYPE,
  CREATE_BANNER_HTML_TYPE_ERROR,
  UPDATE_BANNER_HTML_TYPE,
  UPDATE_BANNER_HTML_TYPE_ERROR,
  DELETE_BANNER_HTML_TYPE,
  DELETE_BANNER_HTML_TYPE_ERROR,
} from '../../constants';

import queryGetBannerHtmlTypes from './getBannerHtmlTypes.graphql';
import mutationCreatedBannerHtmlType from './createdBannerHtmlType.graphql';
import mutationUpdatedBannerHtmlType from './updatedBannerHtmlType.graphql';
import mutationDeletedBannerHtmlType from './deletedBannerhtmlType.graphql';

export function getBannerHtmlTypes(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
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

      const { data } = await client.query({
        query: queryGetBannerHtmlTypes, variables: variables.where,
      });

      dispatch({
        type: GET_BANNER_HTML_TYPES,
        payload: {
          bannerHtmlTypes: data.bannerHtmlTypes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_BANNER_HTML_TYPES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createBannerHtmlType({ name, value, weight, status, userId }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedBannerHtmlType,
        variables: {
          bannerHtmlType: {
            name,
            value,
            weight,
            status,
            userId,
          },
        },
      });

      dispatch({
        type: CREATE_BANNER_HTML_TYPE,
        payload: {
          bannerHtmlType: data.createdBannerHtmlType,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_BANNER_HTML_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateBannerHtmlType({ id, name, value, weight, status, userId }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedBannerHtmlType,
        variables: {
          bannerHtmlType: {
            id,
            name,
            value,
            weight,
            status,
            userId,
          },
        },
      });

      dispatch({
        type: UPDATE_BANNER_HTML_TYPE,
        payload: {
          bannerHtmlType: data.updatedBannerHtmlType,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BANNER_HTML_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteBannerHtmlType(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedBannerHtmlType, variables: { id },
      });

      dispatch({
        type: DELETE_BANNER_HTML_TYPE,
        payload: {
          bannerHtmlType: data.deletedBannerHtmlType,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_BANNER_HTML_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
