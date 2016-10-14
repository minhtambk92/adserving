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
} from '../constants';

export function getZone(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zones(where: {id: "${id}"}, limit: 1) {
          id
          userId
          siteId
          name
          description
          type
          html
          css
          slot
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

export function getZones() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zones {
          id
          userId
          siteId
          name
          description
          type
          html
          css
          slot
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ZONES,
      payload: {
        zones: data.zones,
      },
    });
  };
}

export function createZone({ siteId, name, description, type, html, css, slot }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zone: ZoneInputWithoutId!) {
        createdZone(zone: $zone) {
          id
          userId
          siteId
          name
          description
          type
          html
          css
          slot
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      zone: {
        userId: '567daf97-d24d-4b7c-9b44-153534efc101',
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
      type: CREATE_ZONE,
      payload: {
        zone: data.createdZone,
      },
    });
  };
}

export function updateZone({ id, userId, siteId, name, description, type, html, css, slot }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zone: ZoneInput!) {
        updatedZone(zone: $zone) {
          id
          userId
          siteId
          name
          description
          type
          html
          css
          slot
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      zone: {
        id,
        userId: userId || '567daf97-d24d-4b7c-9b44-153534efc101',
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
          userId
          siteId
          name
          description
          type
          html
          css
          slot
          createdAt
          updatedAt
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
