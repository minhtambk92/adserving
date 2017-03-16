/* eslint-disable import/prefer-default-export */

import {
  GET_BANNER_TYPES,
  GET_BANNER_TYPES_ERROR,
  CREATE_BANNER_TYPE,
  CREATE_BANNER_TYPE_ERROR,
  UPDATE_BANNER_TYPE,
  UPDATE_BANNER_TYPE_ERROR,
  DELETE_BANNER_TYPE,
  DELETE_BANNER_TYPE_ERROR,
} from '../../constants';

import queryGetBannerTypes from './getBannerTypes.graphql';
import mutationCreatedBannerType from './createBannerType.graphql';
import mutationUpdatedBannerType from './updatedBannerType.graphql';
import mutationDeletedBannerType from './deletedBanner.graphql';

export function getBannerTypes(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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

      const { data } = await graphqlRequest(queryGetBannerTypes, variables.where);

      dispatch({
        type: GET_BANNER_TYPES,
        payload: {
          bannerTypes: data.bannerTypes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_BANNER_TYPES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createBannerType({ name, value, isUpload, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationCreatedBannerType, {
        bannerType: {
          name,
          value,
          isUpload,
          status,
          userId,
        },
      });

      dispatch({
        type: CREATE_BANNER_TYPE,
        payload: {
          bannerType: data.createdBannerType,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_BANNER_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateBannerType({ id, name, value, isUpload, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationUpdatedBannerType, {
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
    } catch (error) {
      dispatch({
        type: UPDATE_BANNER_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteBannerType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedBannerType, { id });

      dispatch({
        type: DELETE_BANNER_TYPE,
        payload: {
          bannerType: data.deletedBannerType,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_BANNER_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
