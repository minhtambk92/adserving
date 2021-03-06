/**
 * Created by Manhhailua on 10/14/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE,
  GET_ZONES,
  CREATE_ZONE,
  UPDATE_ZONE,
  DELETE_ZONE,
  GET_ZONES_FILTERS,
  SET_ZONES_FILTERS,
} from '../../constants';

import queryGetZone from './getZone.graphql';
import queryGetZones from './getZones.graphql';
import mutationCreatedZone from './createdZone.graphql';
import mutationUpdatedZone from './updatedZone.graphql';
import mutationDeletedZone from './deletedZone.graphql';

export function getZonesFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_ZONES_FILTERS,
      payload: {},
    });
  };
}

export function setZonesFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_ZONES_FILTERS,
      payload: filter,
    });
  };
}

export function getZone(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetZone, { id });

    dispatch({
      type: GET_ZONE,
      payload: {
        zone: data.zones[0],
      },
    });
  };
}

export function getZones(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
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

    const { data } = await graphqlRequest(queryGetZones, variables.where);

    dispatch({
      type: GET_ZONES,
      payload: {
        zones: data.zones,
      },
    });
  };
}

export function createZone({
  siteId,
  name,
  zoneTypeId,
  zoneSizeTypeId,
  html,
  css,
  slot,
  width,
  height,
  targetIFrame,
  isShowBannerAgain,
  source,
  isShowCampaignAgain,
  isShowTextBanner,
  characterSetId,
  supportThirdParty,
  isIncludeDescription,
  isCustomSize,
  status,
  description,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedZone, {
      zone: {
        siteId,
        name,
        zoneTypeId,
        zoneSizeTypeId,
        html,
        css,
        width,
        height,
        slot,
        targetIFrame,
        isShowBannerAgain,
        source,
        isShowCampaignAgain,
        isShowTextBanner,
        characterSetId,
        supportThirdParty,
        isIncludeDescription,
        isCustomSize,
        status,
        description,
      },
    });

    dispatch({
      type: CREATE_ZONE,
      payload: {
        zone: data.createdZone,
      },
    });
  };
}

export function updateZone({
  id,
  siteId,
  name,
  zoneTypeId,
  zoneSizeTypeId,
  html,
  css,
  slot,
  width,
  height,
  targetIFrame,
  isShowBannerAgain,
  source,
  isShowCampaignAgain,
  isShowTextBanner,
  characterSetId,
  supportThirdParty,
  isIncludeDescription,
  status,
  isCustomSize,
  description,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedZone, {
      zone: {
        id,
        siteId,
        name,
        zoneTypeId,
        zoneSizeTypeId,
        html,
        css,
        slot,
        width,
        height,
        targetIFrame,
        isShowBannerAgain,
        source,
        isShowCampaignAgain,
        isShowTextBanner,
        characterSetId,
        supportThirdParty,
        isIncludeDescription,
        isCustomSize,
        status,
        description,
      },
    });

    dispatch({
      type: UPDATE_ZONE,
      payload: {
        zone: data.updatedZone,
      },
    });
  };
}

export function deleteZone(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedZone, { id });

    dispatch({
      type: DELETE_ZONE,
      payload: {
        zone: data.deletedZone,
      },
    });
  };
}
