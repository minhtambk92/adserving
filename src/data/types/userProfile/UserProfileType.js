/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { UserProfile } from '../models';

const UserProfileType = new ObjectType({
  name: 'UserProfileType',
  fields: () => Object.assign(attributeFields(UserProfile, {
    // Additional options
    only: ['displayName', 'picture', 'gender', 'location', 'website'],
  }), {
    // Additional fields
  }),
});

export default UserProfileType;
