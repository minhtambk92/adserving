/* eslint-disable import/prefer-default-export */

import {
  GET_ACTIVITIES,
  GET_ACTIVITY,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_BY_USER_ID,
} from '../constants';

export function getActivitiesByUserId(userId) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        activities(where: {userId: "${userId}"}) {
          id
          action
          subject
          subjectId
          other
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ACTIVITIES_BY_USER_ID,
      payload: {
        activities: data.activities,
      },
    });
  };
}

export function getActivity(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        activities(where: {id: "${id}"}, limit: 1) {
          id
          action
          subject
          subjectId
          other
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ACTIVITY,
      payload: {
        activity: data.activities.shift(),
      },
    });
  };
}

export function getActivities(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        activities {
          id
          action
          subject
          subjectId
          other
          userId
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().activities.filters;

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
      type: GET_ACTIVITIES,
      payload: {
        activities: data.activities,
      },
    });
  };
}

export function createActivity({ action, subject, subjectId, other, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($activity: ActivityInputTypeWithoutId!) {
        createdActivity(activity: $activity) {
          id
          action
          subject
          subjectId
          other
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      activity: {
        action,
        subject,
        subjectId,
        other,
        userId,
      },
    });

    dispatch({
      type: CREATE_ACTIVITY,
      payload: {
        activity: data.createdActivity,
      },
    });
  };
}

export function updateActivity({ id, action, subject, subjectId, other, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($activity: activityInputType!) {
        updatedActivity(activity: $activity) {
          id
          action
          subject
          subjectId
          other
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      activity: {
        id,
        action,
        subject,
        subjectId,
        other,
        userId,
      },
    });

    dispatch({
      type: UPDATE_ACTIVITY,
      payload: {
        activity: data.updatedActivity,
      },
    });
  };
}

export function deleteActivity(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedActivity(id: "${id}") {
          id
          action
          subject
          subjectId
          other
          userId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ACTIVITY,
      payload: {
        activity: data.deletedActivity,
      },
    });
  };
}
