/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { User } from '../models';
import userBelongsToManyRoles from '../queries/userBelongsToManyRoles';

const UserType = new ObjectType({
  name: 'UserType',
  fields: () => Object.assign(attributeFields(User, {
    // Additional options
    exclude: ['password'],
  }), {
    // Additional fields
    roles: userBelongsToManyRoles(),
  }),
});

export default UserType;
