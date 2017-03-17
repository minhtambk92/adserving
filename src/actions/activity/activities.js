/* eslint-disable import/prefer-default-export */

import {
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_ERROR,
  GET_ACTIVITIES_BY_SUBJECT_ID,
  GET_ACTIVITIES_BY_SUBJECT_ID_ERROR,
} from '../../constants';

import queryGetActivitiesBySubjectId from './getActivitiesBySubjectId.graphql';
import queryCreateActivity from './createActivity.graphql';

export function getActivitiesBySubjectId(subjectId) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetActivitiesBySubjectId,
        variables: { subjectId },
      });

      dispatch({
        type: GET_ACTIVITIES_BY_SUBJECT_ID,
        payload: {
          activities: data.activities,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVITIES_BY_SUBJECT_ID_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createActivity({ action, subject, subjectId, other, userId }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: queryCreateActivity,
        variables: {
          activity: {
            action,
            subject,
            subjectId,
            other,
            userId,
          },
        },
      });

      dispatch({
        type: CREATE_ACTIVITY,
        payload: {
          activity: data.createdActivity,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_ACTIVITY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
