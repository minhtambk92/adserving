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
} from '../constants';

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
    const query = `
      query {
        zones(where: {id: "${id}"}, limit: 1) {
          id
          siteId
          name
          description
          zoneType {
            id
            name
            value
            isSize
            status
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
          characterSetId
          supportThirdParty
          isCustomSize
          isIncludeDescription
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
            placements {
              id
              name
              width
              height
              startTime
              endTime
              weight
              description
              campaignId
              status
              createdAt
              updatedAt
            }
          }
        createdAt
        updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

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
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
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
          characterSetId
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
            placements {
              id
              name
              width
              height
              startTime
              endTime
              weight
              description
              campaignId
              status
              createdAt
              updatedAt
            }
          }
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
      type: GET_ZONES,
      payload: {
        zones: data.zones,
      },
    });
  };
}

export function createZone({
  siteId, name, zoneTypeId,
  zoneSizeTypeId,
  html, css,
  slot, width, height,
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
    const mutation = `
      mutation ($zone: ZoneInputTypeWithoutId!) {
        createdZone(zone: $zone) {
          id
          siteId
          name
          zoneTypeId
          zoneSizeTypeId
          html
          css
          slot
          width
          height
          isCustomSize
          targetIFrame
          isShowBannerAgain
          source
          isShowCampaignAgain
          isShowTextBanner
          characterSetId
          supportThirdParty
          isIncludeDescription
          status
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
  id, siteId, name, zoneTypeId, zoneSizeTypeId,
  html, css, slot, width, height,
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
    const mutation = `
      mutation ($zone: ZoneInputType!) {
        updatedZone(zone: $zone) {
          id
          siteId
          name
          description
          zoneTypeId
          zoneSizeTypeId
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
          characterSetId
          supportThirdParty
          isIncludeDescription
          isCustomSize
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedZone(id: "${id}") {
          id
          siteId
          name
          description
          zoneTypeId
          zoneSizeTypeId
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
          characterSetId
          supportThirdParty
          isIncludeDescription
          isCustomSize
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ZONE,
      payload: {
        zone: data.deletedZone,
      },
    });
  };
}
