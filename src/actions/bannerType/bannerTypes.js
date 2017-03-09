/* eslint-disable import/prefer-default-export */

import {
  GET_BANNER_TYPES,
  CREATE_BANNER_TYPE,
  UPDATE_BANNER_TYPE,
  DELETE_BANNER_TYPE,
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
  };
}

export function createBannerType({ name, value, isUpload, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
  };
}

export function updateBannerType({ id, name, value, isUpload, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
  };
}

export function deleteBannerType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedBannerType, { id });

    dispatch({
      type: DELETE_BANNER_TYPE,
      payload: {
        bannerType: data.deletedBannerType,
      },
    });
  };
}
