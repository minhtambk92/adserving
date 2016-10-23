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
  CREATE_ZONE_INCLUDE_SITE,
  GET_ZONES_FILTERS,
  SET_ZONES_FILTERS,
} from '../constants';

export function getZonesFilters() {
  return async(dispatch) => {
    dispatch({
      type: GET_ZONES_FILTERS,
      payload: {},
    });
  };
}

export function setZonesFilters(filter) {
  return async(dispatch) => {
    dispatch({
      type: SET_ZONES_FILTERS,
      payload: filter,
    });
  };
}

export function getZone(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zones(where: {id: "${id}"}, limit: 1) {
          id
          siteId
          name
          description
          type
          html
          css
          slot
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ZONE,
      payload: {
        zone: data.zones.shift(),
      },
    });
  };
}

export function getZones(args = {
  where: {},
  limit: 0,
  order: '',
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        zones(where: $where, order: $order, limit: $limit) {
          id
          siteId
          name
          description
          type
          html
          css
          slot
          status
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const { siteId, type, status } = await getState().zones.filters;

    if (variables.where === {}) {
      if (siteId) variables.where.siteId = siteId;
      if (type) variables.where.type = type;
      if (status) variables.where.siteId = status;
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

export function createZone({ siteId, name, type, html, css, slot, status, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zone: ZoneInputWithoutId!) {
        createdZone(zone: $zone) {
          id
          siteId
          name
          description
          type
          html
          css
          slot
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      zone: {
        siteId,
        name,
        type,
        html,
        css,
        slot,
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

export function createZoneIncludeSite({ siteId, name, description, type, html, css, slot }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zone: ZoneInputWithoutId!) {
        createdZone(zone: $zone) {
          id
          siteId
          name
          description
          type
          html
          css
          slot
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      zone: {
        siteId,
        name,
        description,
        type,
        html,
        css,
        slot,
      },
    });

    dispatch({
      type: CREATE_ZONE_INCLUDE_SITE,
      payload: {
        zone: data.createdZone,
      },
    });
  };
}


export function updateZone({ id, siteId, name, type, html, css, slot, status, description }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zone: ZoneInput!) {
        updatedZone(zone: $zone) {
          id
          siteId
          name
          description
          type
          html
          css
          slot
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
        type,
        html,
        css,
        slot,
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
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedZone(id: "${id}") {
          id
          siteId
          name
          description
          type
          html
          css
          slot
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
