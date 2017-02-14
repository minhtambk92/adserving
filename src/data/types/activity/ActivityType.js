/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Activity } from '../../models';
import activityBelongsToUser from '../../queries/activity/activityBelongsToUser';

const ActivityType = new ObjectType({
  name: 'ActivityType',
  fields: () => Object.assign(attributeFields(Activity, {
    // Additional options
  }), {
    // Additional fields
    user: activityBelongsToUser(),
  }),
});

export default ActivityType;
