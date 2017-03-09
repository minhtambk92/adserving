/* eslint-disable import/prefer-default-export */

import {
  CREATE_ACTIVITY,
  GET_ACTIVITIES_BY_SUBJECT_ID,
} from '../../constants';

import queryGetActivitiesBySubjectId from './getActivitiesBySubjectId.graphql';

export function getActivitiesBySubjectId(subjectId) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetActivitiesBySubjectId, { subjectId });

    dispatch({
      type: GET_ACTIVITIES_BY_SUBJECT_ID,
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
