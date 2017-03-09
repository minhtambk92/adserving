import {
  GET_BANNERS,
  CREATE_BANNER,
  GET_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  GET_BANNERS_FILTERS,
  SET_BANNERS_FILTERS,
} from '../../constants/';

import queryGetBanner from './getBanner.graphql';
import queryGetBanners from './getBanners.graphql';
import mutationCreatedBanner from './createdBanner.graphql';
import mutationUpdatedBanner from './updatedBanner.graphql';
import mutationDeletedBanner from './deletedBanner.graphql';

export function getBannersFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_BANNERS_FILTERS,
      payload: {},
    });
  };
}

export function setBannersFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_BANNERS_FILTERS,
      payload: filter,
    });
  };
}

export function getBanner(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetBanner, { id });

    dispatch({
      type: GET_BANNER,
      payload: {
        banner: data.banners[0],
      },
    });
  };
}

export function getBanners(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().banners.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }
    const { data } = await graphqlRequest(queryGetBanners, variables.where);

    dispatch({
      type: GET_BANNERS,
      payload: {
        banners: data.banners,
      },
    });
  };
}

export function createBanner({
  name,
  html,
  width,
  height,
  keyword,
  weight,
  description,
  bannerTypeId,
  url,
  target,
  imageUrl,
  isIFrame,
  status,
  adsServerId,
  bannerHtmlTypeId,
  isCountView,
  isFixIE,
  isDefault,
  isRelative,
  adStore,
  impressionsBooked,
  clicksBooked,
  activationDate,
  expirationDate,
  channelId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedBanner, {
      banner: {
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        bannerTypeId,
        url,
        target,
        imageUrl,
        isIFrame,
        status,
        adsServerId,
        bannerHtmlTypeId,
        isCountView,
        isFixIE,
        isDefault,
        isRelative,
        adStore,
        impressionsBooked,
        clicksBooked,
        activationDate,
        expirationDate,
        channelId,
      },
    });

    dispatch({
      type: CREATE_BANNER,
      payload: {
        banner: data.createdBanner,
      },
    });
  };
}

export function updateBanner({
  id,
  name,
  html,
  width,
  height,
  keyword,
  weight,
  description,
  bannerTypeId,
  url,
  target,
  imageUrl,
  isIFrame,
  status,
  adsServerId,
  bannerHtmlTypeId,
  isCountView,
  isFixIE,
  isDefault,
  isRelative,
  adStore,
  impressionsBooked,
  clicksBooked,
  activationDate,
  expirationDate,
  channelId,
  placements,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedBanner, {
      banner: {
        id,
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
        bannerTypeId,
        url,
        target,
        imageUrl,
        isIFrame,
        status,
        adsServerId,
        bannerHtmlTypeId,
        isCountView,
        isFixIE,
        isDefault,
        isRelative,
        adStore,
        impressionsBooked,
        clicksBooked,
        activationDate,
        expirationDate,
        channelId,
        placements,
      },
    });

    dispatch({
      type: UPDATE_BANNER,
      payload: {
        banner: data.updatedBanner,
      },
    });
  };
}

export function deleteBanner(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedBanner, { id });

    dispatch({
      type: DELETE_BANNER,
      payload: {
        banner: data.deletedBanner,
      },
    });
  };
}
