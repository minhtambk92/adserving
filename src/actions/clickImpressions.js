import {
  GET_CLICK_IMPRESSIONS,
  CREATE_CLICK_IMPRESSION,
  GET_CLICK_IMPRESSION_BY_BANNER_ID,
  UPDATE_CLICK_IMPRESSION,
  DELETE_CLICK_IMPRESSION,
} from '../constants/';


export function getClickImpressionByBannerId(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        clickImpressions(where: {bannerId: "${id}"}) {
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_CLICK_IMPRESSION_BY_BANNER_ID,
      payload: {
        clickImpressions: data.clickImpressions,
      },
    });
  };
}

export function getClickImpressions(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query($where: JSON, $order: String, $limit: Int) {
        clickImpressions(where: $where, order: $order, limit: $limit) {
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
          }
      }`;
    const variables = Object.assign({}, args);
    const filters = await getState().clickImpressions.filters;

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
      type: GET_CLICK_IMPRESSIONS,
      payload: {
        clickImpressions: data.clickImpressions,
      },
    });
  };
}

export function createClickImpression({
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($clickImpression: ClickImpressionInputTypeWithoutId!) {
        createdClickImpression(clickImpression: $clickImpression) {
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      clickImpression: {
        clickUrl,
        impressionUrl,
        bannerId,
      },
    });

    dispatch({
      type: CREATE_CLICK_IMPRESSION,
      payload: {
        clickImpression: data.createdClickImpression,
      },
    });
  };
}

export function updateClickImpression({
  id,
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($clickImpression: ClickImpressionInputType!) {
        updatedClickImpression(clickImpression: $clickImpression) {
          id
          clickUrl
          impressionUrl
          bannerId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      clickImpression: {
        id,
        clickUrl,
        impressionUrl,
        bannerId,
      },
    });

    dispatch({
      type: UPDATE_CLICK_IMPRESSION,
      payload: {
        clickImpression: data.updatedClickImpression,
      },
    });
  };
}

export function deleteClickImpression(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedClickImpression(id: "${id}") {
          id
          clickUrl
          impressionUrl
          bannerId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_CLICK_IMPRESSION,
      payload: {
        clickImpression: data.deletedClickImpression,
      },
    });
  };
}
