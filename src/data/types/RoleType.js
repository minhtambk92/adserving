/**
 * Created by Manhhailua on 10/8/16.
 */

import {
  GraphQLObjectType as ObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { Role } from '../models';
import roleBelongsToManyUsers from '../queries/userBelongsToManyRoles';

const RoleType = new ObjectType({
  name: 'Role',
  fields: Object.assign(attributeFields(Role, {
    // Additional options
  }), {
    // Additional fields
    users: roleBelongsToManyUsers(),
  }),
});

export default RoleType;
